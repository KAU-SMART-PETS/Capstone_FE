import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import { useNavigation, CommonActions, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@types';
import KakaoLogo from '@image/icon/logo-kakao.png';
import NaverLogo from '@image/icon/logo-naver.png';

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const goToMyPage = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'MyPage' },
        ],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>현명하게</Text>
          <Text style={styles.subtitle}>우리 아이</Text>
          <Text style={styles.subtitle}>건강 관리</Text>
          {/* <Text></Text> */}
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
          <TouchableOpacity onPress={goToMyPage}>
            <Image source={KakaoLogo} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={NaverLogo} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
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
