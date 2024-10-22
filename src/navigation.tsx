// src/navigation.tsx
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@types';

import RNBootSplash from 'react-native-smooth-bootsplash';
import Splash from '@screens/home/Splash';

import BoxExample from '@screens/BoxExample';
import BadgeExample from '@screens/BadgeExample';
import ModalExample from '@screens/ModalExample';
import TextInputExample from '@screens/TextInputExample';
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
        <Stack.Screen name="BoxExample" component={BoxExample} />
        <Stack.Screen name="BadgeExample" component={BadgeExample} />
        <Stack.Screen name="ModalExample" component={ModalExample} />
        <Stack.Screen name="TextInputExample" component={TextInputExample} />
      </Stack.Navigator>
    )}
    </NavigationContainer>
    </>
  );
};

export default AppNavigator;
