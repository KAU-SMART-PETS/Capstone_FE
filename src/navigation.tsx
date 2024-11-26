// src/navigation.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-smooth-bootsplash';
import Splash from '@screens/home/Splash';
import { typedObjectEntries, routeComponents, RootStackParamList } from '@constants/routes';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashVisible(false); // Hide the splash screen
  };

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true, duration: 350 })}>
      {isSplashVisible && <Splash duration={2500} onFinish={handleSplashFinish} />}
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
};

export default AppNavigator;
