// loginLogic.ts
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, NavigationProp } from '@react-navigation/native';

export const handleLoginPress = (
  provider: 'kakao' | 'naver',
  setLoginUrl: React.Dispatch<React.SetStateAction<string>>,
  setShowWebView: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const loginUrl = provider === 'kakao'
    ? 'http://52.79.140.133:8080/api/v1/oauth2/kakao'
    : 'http://52.79.140.133:8080/api/v1/oauth2/naver';
  
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

  if (url.includes('http://52.79.140.133:8080/')) {
    console.log('Login successful, extracting JSESSIONID...');

    try {
      const cookies = await CookieManager.get('http://52.79.140.133:8080');
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
