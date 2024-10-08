import React, { useEffect } from 'react';
// NAVIGATOR

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
// UTILS
import { Camera } from 'react-native-vision-camera';
import RNBootSplash from "react-native-smooth-bootsplash";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// COMPONENTS
import MainTab from './screens/MainTab';
import LoginScreen from './screens/LoginScreen';
import CameraScreen from './screens/CameraScreen';
import DiseaseDetailScreen from './screens/DiseaseDetailScreen';
import SelectPartScreen from './screens/SelectPart';
import FindHospital from './screens/FindHospitalScreen';
import RegisterPet from './screens/PetRegisterScreen';
import bluetooth from './screens/bluetoothetest';
import EditMyInformation from './screens/editMyInfo';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
// import HomeScreen from './screens/HomeScreen';
// import MyPageScreen from './screens/MyPageScreen';
// import AnalysisScreen from './screens/analysisScreen';
// import PetInfo from './screens/PetInfoScreen';
// import RegisterHealthInformation from './screens/registerHealthInformation';

const bottomNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      console.log('Camera Permission:', cameraPermission);
    })();
  }, []);
  
  return (
    <PaperProvider theme={bottomNavTheme}>
    <NavigationContainer> 
      {/* onReady={() => RNBootSplash.hide({fade: true, duration: 600 })} */}
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}  // Your main screen
          options={{ title: 'Home' }}  // Customize HomeScreen header
        />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="DiseaseDetail" component={DiseaseDetailScreen}/>
        <Stack.Screen name="SelectPart" component={SelectPartScreen} />
        <Stack.Screen name="FindHospital" component={FindHospital}/>
        <Stack.Screen name="RegisterPet" component={RegisterPet}/>
        <Stack.Screen name="bluetooth" component={bluetooth}/>
        <Stack.Screen name="EditMyInfo" component={EditMyInformation}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;