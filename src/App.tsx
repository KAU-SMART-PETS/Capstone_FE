// App.tsx
import React from 'react';
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
  return (
    <PaperProvider theme={bottomNavTheme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
