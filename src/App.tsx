// App.tsx
import React, { useEffect, useRef } from 'react';
import { Camera } from 'react-native-vision-camera';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from '@src/navigation'; // 네비게이션을 분리한 파일에서 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@constants/config';

const App = () => {
  // 최초 실행 여부를 추적하기 위한 useRef
  const hasClearedStorage = useRef(false);

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
  }, []);

  global.config = config;

  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
