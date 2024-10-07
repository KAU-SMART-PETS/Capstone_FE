import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Camera } from 'react-native-vision-camera';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CameraScreen from './screens/CameraScreen';
import MyPageScreen from './screens/MyPageScreen';
import AnalysisScreen from './screens/analysisScreen';
import DiseaseDetailScreen from './screens/DiseaseDetailScreen';
import SelectPartScreen from './screens/SelectPart';
import FindHospital from './screens/FindHospitalScreen';
import RegisterPet from './screens/PetRegisterScreen';
import bluetooth from './screens/bluetoothetest';
import PetInfo from './screens/PetInfoScreen';
import RegisterHealthInformation from './screens/registerHealthInformation';
import EditMyInformation from './screens/editMyInfo';
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      console.log('Camera Permission:', cameraPermission);
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          headerShown: false, // 모든 화면에서 헤더를 숨깁니다
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Analysis" component={AnalysisScreen} />
        <Stack.Screen name="DiseaseDetail" component={DiseaseDetailScreen}/>
        <Stack.Screen name="SelectPart" component={SelectPartScreen} />
        <Stack.Screen name="FindHospital" component={FindHospital}/>
        <Stack.Screen name="RegisterPet" component={RegisterPet}/>
        <Stack.Screen name="bluetooth" component={bluetooth}/>
        <Stack.Screen name="PetInfo" component={PetInfo}/>
        <Stack.Screen name="PetHealthInfo" component={RegisterHealthInformation} />
        <Stack.Screen name="EditMyInfo" component={EditMyInformation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;