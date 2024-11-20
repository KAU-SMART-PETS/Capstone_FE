// App.tsx
import React, { useEffect } from 'react';
import { Camera } from 'react-native-vision-camera';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation'; // 네비게이션을 분리한 파일에서 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './utils/constants/config';

const App = () => {
  clearAsyncStorage();
  useEffect(() => {
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

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data has been cleared.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export default App;
