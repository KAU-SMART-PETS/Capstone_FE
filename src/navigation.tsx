// src/navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@types';

// Home & Layout
import MainTab from '@components/layout/MainTab';
import Home from '@screens/home/Home';
import Splash from '@screens/home/Splash';

// Profile
import Login from '@screens/profile/Login';
import EditProfile from '@screens/profile/EditProfile';
import MyPage from '@screens/profile/MyPage';
import PetRegister from '@screens/profile/PetRegister';
import PetProfile from '@screens/profile/PetProfile';
// Health
import Analysis from '@screens/health/Analysis';
import HospitalList from '@screens/health/HospitalList';
import CameraView from '@screens/health/CameraView';
import RegisterHealthInfo from '@screens/health/RegisterHealthInfo';
import DiseaseDetail from '@screens/health/DiseaseDetail';
import SelectPart from '@screens/health/SelectPart';

// Walk
import WeeklySummary from '@screens/walk/WeeklySummary';

// Bluetooth
import BTView from '@screens/bluetooth/BTView';

import Example from '@screens/example';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* home & layout */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Home" component={Home} />
        {/* profile */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="PetRegister" component={PetRegister} />
        <Stack.Screen name="PetProfile" component={PetProfile} />
        {/* health */}
        <Stack.Screen name="Analysis" component={Analysis} />
        <Stack.Screen name="DiseaseDetail" component={DiseaseDetail} />
        <Stack.Screen name="RegisterHealthInfo" component={RegisterHealthInfo} />
        <Stack.Screen name="CameraView" component={CameraView} />
        <Stack.Screen name="HospitalList" component={HospitalList} />
        <Stack.Screen name="SelectPart" component={SelectPart} />
        {/* bluetooth */}
        <Stack.Screen name="BTView" component={BTView} />
        {/* walk */}
        <Stack.Screen name="WeeklySummary" component={WeeklySummary} />
        {/* example */}
        <Stack.Screen name="Example" component={Example} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
