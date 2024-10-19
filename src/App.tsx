// App.tsx
import React, { useEffect } from 'react';
import { Camera } from 'react-native-vision-camera';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation'; // 네비게이션을 분리한 파일에서 import
import { LogBox } from 'react-native';

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

export default App;
