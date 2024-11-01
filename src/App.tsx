// App.tsx
import React, { useEffect } from 'react';
import { Camera } from 'react-native-vision-camera';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation'; // 네비게이션을 분리한 파일에서 import
import { LogBox } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// 앱의 최상단에서 경고 무시
LogBox.ignoreLogs(['Warning: A props object containing a "key" prop is being spread into JSX']);

const bottomNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent',
  },
};

const App = () => {
  clearAsyncStorage();
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      console.log('Camera Permission:', cameraPermission);
    })();
  }, []);

  return (
    <PaperProvider theme={bottomNavTheme}>
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
