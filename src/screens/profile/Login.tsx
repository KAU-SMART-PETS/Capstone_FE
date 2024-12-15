import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import KakaoLogo from '@image/icon/logo-kakao.png';
import NaverLogo from '@image/icon/logo-naver.png';
import LoginCat from '@image/login_cat.png';
import LoginDog from '@image/login_dog.png';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { handleLoginPress, handleWebViewNavigationStateChange } from '@api/loginApi';
import StylizedText from '@common/StylizedText';
import ColorMap from '@common/ColorMap';

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [loginUrl, setLoginUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* 상단 영역 */}
      <View style={styles.topHalf}>
        <View style={styles.headerContainer}>
          <StylizedText type="header0" styleClass="text-white mb-4">
            {'현명하게\n우리 아이 건강 관리'}
          </StylizedText>
          <StylizedText type="default" styleClass="text-white">
            {'우리 아이의\n마음 상태 몸 상태를 알 수 있는\n가장 정확하고 간편한 방법 '}
          </StylizedText>
        </View>
        {/* 이미지 중앙 배치 */}
        <View style={styles.imageRow}>
          <Image source={LoginDog} style={styles.animalImage} />
          <Image source={LoginCat} style={styles.animalImage} />
        </View>
      </View>
      {/* 하단 영역 */}
      <View style={styles.bottomHalf}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleLoginPress('kakao', setLoginUrl, setShowWebView)}
            style={styles.loginButtonKakao}>
            <Image source={KakaoLogo} style={styles.buttonImage} />
            <StylizedText type="body2" styleClass="text-black ml-2">
              카카오로 로그인하기
            </StylizedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLoginPress('naver', setLoginUrl, setShowWebView)}
            style={styles.loginButtonNaver}>
            <Image source={NaverLogo} style={styles.buttonImage} />
            <StylizedText type="body2" styleClass="text-white ml-2">
              네이버로 로그인하기
            </StylizedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* 웹뷰 모달 */}
      <Modal visible={showWebView} animationType="slide">
        <View style={{ flex: 1 }}>
          {loading && <ActivityIndicator color="blue" size="large" />}
          <WebView
            source={{ uri: loginUrl }}
            onNavigationStateChange={(navState: WebViewNavigation) =>
              handleWebViewNavigationStateChange(navState, setShowWebView, navigation)
            }
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            javaScriptEnabled={true}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorMap['primary'],
  },
  topHalf: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 160, // 텍스트와 이미지를 조정하는 공간
  },
  headerContainer: {
    paddingHorizontal: 30,
    paddingBottom: 90,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -160,
  },
  animalImage: {
    width: 140,
    height: 140,
    marginHorizontal: 50,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  buttonContainer: {
    width: '80%',
  },
  loginButtonKakao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE500',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 10,
  },
  loginButtonNaver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#03C75A',
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default Login;
