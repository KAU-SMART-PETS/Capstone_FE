// src/navigation.tsx
import React, { useState, forwardRef } from 'react'; // forwardRef 추가
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-smooth-bootsplash';
import Splash from './screens/home/Splash';
import { typedObjectEntries, routeComponents } from '@constants/routes';

const Stack = createStackNavigator<RootStackParamList>();

// AppNavigator를 forwardRef로 수정하여 ref를 전달받도록 변경
const AppNavigator = forwardRef((_, ref) => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashVisible(false); // Splash 화면 종료
  };

  return (
    <NavigationContainer
      ref={ref} // NavigationContainer에 ref 연결
      onReady={() => RNBootSplash.hide({ fade: true, duration: 350 })}
    >
      {isSplashVisible && <Splash duration={450} onFinish={handleSplashFinish} />}
      {!isSplashVisible && (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {typedObjectEntries(routeComponents).map(([name, Component]) => (
            <Stack.Screen
              key={name as string}
              name={name}
              component={Component}
            />
          ))}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
});

export default AppNavigator;
