// src/navigation.tsx
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@types';

import RNBootSplash from 'react-native-smooth-bootsplash';
import Splash from '@screens/home/Splash';

import Example1 from '@screens/Example1';
import Example2 from '@screens/Example2';
import ModalExample from '@screens/ModalExample';
import TestingPage from '@screens/TestingPage';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashVisible(false); // Hide the splash screen
  };
  console.log(isSplashVisible);
  return (
    <>
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true, duration: 350})}>
    {isSplashVisible && <Splash duration={450} onFinish={handleSplashFinish} />}
    {!isSplashVisible && (
      <Stack.Navigator
        initialRouteName="TestingPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TestingPage" component={TestingPage} />
        <Stack.Screen name="Example1" component={Example1} />
        <Stack.Screen name="Example2" component={Example2} />
        <Stack.Screen name="ModalExample" component={ModalExample} />
      </Stack.Navigator>
    )}
    </NavigationContainer>
    </>
  );
};

export default AppNavigator;
