import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { CommonActions, NavigationProp } from '@react-navigation/native';

export const handleLoginPress = (
  provider: 'kakao' | 'naver',
  setLoginUrl: React.Dispatch<React.SetStateAction<string>>,
  setShowWebView: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const loginUrl = `${config.API_SERVER_URL}/api/v1/oauth2/${provider}`
  setLoginUrl(loginUrl);
  setShowWebView(true);
};

export const handleWebViewNavigationStateChange = async (
  navState: any,
  setShowWebView: React.Dispatch<React.SetStateAction<boolean>>,
  navigation: NavigationProp<any>
) => {
  const { url } = navState;
  console.log('Navigated to URL:', url);

  if (url.includes(`${config.API_SERVER_URL}`)) {
    console.log('Login successful, extracting JSESSIONID...');

    try {
      const cookies = await CookieManager.get(`${config.API_SERVER_URL}`);
      console.log('Retrieved cookies:', cookies);

      const jsessionid = cookies.JSESSIONID?.value || cookies.JSESSIONID;
      console.log('Extracted JSESSIONID:', jsessionid);

      if (jsessionid) {
        await AsyncStorage.setItem('JSESSIONID', jsessionid.toString());
        console.log('JSESSIONID stored in AsyncStorage');

        setShowWebView(false);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainTab' }],
          })
        );
      } else {
        console.log('JSESSIONID not found in cookies');
      }
    } catch (error) {
      console.error('Error retrieving cookies:', error);
    }
  }
};

export const handleLogout = async (navigation: NavigationProp<any>) => {
  try {
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      console.log('JSESSIONID not found');
      return;
    }

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/oauth2/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionid}`,
      },
    });

    if (response.ok) {
      console.log(response);
      await AsyncStorage.removeItem('JSESSIONID');
      await AsyncStorage.removeItem('USER_DATA');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } else {
      console.log('Failed to logout:', response.status);
      Alert.alert('오류', '로그아웃에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error logging out:', error);
    Alert.alert('오류', '로그아웃 중 오류가 발생했습니다.');
  }
};