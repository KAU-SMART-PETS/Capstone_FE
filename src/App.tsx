// App.tsx
import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation'; // 네비게이션을 분리한 파일에서 import
import NetInfo from '@react-native-community/netinfo'; // 네트워크 상태 확인 라이브러리
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './utils/constants/config';

const App = () => {
  const hasClearedStorage = useRef(false);
  const navigationRef = useRef(null); // 네비게이션 참조 객체 생성

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All AsyncStorage data has been cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // clearAsyncStorage가 한번만 실행되도록 제어
    if (!hasClearedStorage.current) {
      clearAsyncStorage();
      hasClearedStorage.current = true; // 호출 완료 표시
    }

    // 카메라 권한 요청
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      console.log('Camera Permission:', cameraPermission);
    })();

    // 네트워크 상태 변경 이벤트 리스너 추가
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        navigationRef.current?.navigate('Offline'); // Offline 페이지로 이동
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
  }, []);

  global.config = config;

  return (
    <PaperProvider>
      <AppNavigator ref={navigationRef} />{/* navigationRef를 전달 */}
    </PaperProvider>
  );
};

export default App;
