import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import KakaoLogo from '@image/icon/logo-kakao.png';
import NaverLogo from '@image/icon/logo-naver.png';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { handleLoginPress, handleWebViewNavigationStateChange } from '@screens/API/LoginApi';
import StylizedText from '@components/common/StylizedText';

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [loginUrl, setLoginUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.subtitleContainer}>
        <StylizedText type="header1" styleClass="text-white">
          {'현명하게\n우리 아이\n건강 관리'}
        </StylizedText>
          <StylizedText type="body1" color="white" styleClass="text-white">
            {'우리 아이의 \n마음상태 몸상태를 알 수 있는 \n가장 정확하고 간편한 방법'}
          </StylizedText>
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <View style={styles.buttonTextContainer}>
          <StylizedText type="body1" styleClass="text-black">
            10초만에 회원가입
          </StylizedText>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleLoginPress('kakao', setLoginUrl, setShowWebView)}>
            <Image source={KakaoLogo} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLoginPress('naver', setLoginUrl, setShowWebView)}>
            <Image source={NaverLogo} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>

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
  buttonTextContainer: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonImage: {
    width: 50,
    height: 50,
    margin: 5,
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
  }
});

export default Login;
