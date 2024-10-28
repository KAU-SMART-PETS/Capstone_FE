import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import KakaoLogo from '@image/icon/logo-kakao.png';
import NaverLogo from '@image/icon/logo-naver.png';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [showWebView, setShowWebView] = useState(false);
  const [loginUrl, setLoginUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const goToMyPage = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MyPage' }],
      })
    );
  };

  const handleLoginPress = (provider) => {
    if (provider === 'kakao') {
      setLoginUrl('http://52.79.140.133:8080/api/v1/oauth2/kakao');
    } else if (provider === 'naver') {
      setLoginUrl('http://52.79.140.133:8080/api/v1/oauth2/naver');
    }
    setShowWebView(true);
  };

  const handleWebViewNavigationStateChange = async (navState) => {
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

          await AsyncStorage.setItem('JSESSIONID', jsessionid);
          console.log('JSESSIONID stored in AsyncStorage');


          setShowWebView(false);

          const storedSessionId = await AsyncStorage.getItem('JSESSIONID');
          console.log('Stored JSESSIONID:', storedSessionId);

          goToMyPage();
        } else {
          console.log('JSESSIONID not found in cookies');
        }
      } catch (error) {
        console.error('Error retrieving cookies:', error);
      }
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>현명하게</Text>
          <Text style={styles.subtitle}>우리 아이</Text>
          <Text style={styles.subtitle}>건강 관리</Text>
          <Text style={styles.description}>우리 아이의</Text>
          <Text style={styles.description}>마음상태 몸상태를 알 수 있는</Text>
          <Text style={styles.description}>가장 정확하고 간편한 방법</Text>
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>10초만에 회원가입</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleLoginPress('kakao')}>
            <Image source={KakaoLogo} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLoginPress('naver')}>
            <Image source={NaverLogo} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* WebView Modal */}
      <Modal visible={showWebView} animationType="slide">
        <View style={{ flex: 1 }}>
          {loading && (
            <ActivityIndicator
              color="blue"
              size="large"
              style={styles.loadingIndicator}
            />
          )}
          <WebView
            source={{ uri: loginUrl }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            javaScriptEnabled={true}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowWebView(false)}
          >
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHalf: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHalf: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 15,
    color: 'white',
  },
  buttonTextContainer: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonImage: {
    width: 50,
    height: 50,
    margin: 5,
  },
});

export default Login;
