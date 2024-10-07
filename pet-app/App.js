import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/screen/HomeScreen";
import EditProfileScreen from "./components/screen/EditProfileScreen";
import PetRegistrationScreen from "./components/screen/PetRegistrationScreen";
import WalkScreen from "./components/screen/WalkScreen";
import WalkTimerScreen from "./components/screen/WalkTimerScreen";
import TodayWalkRecordScreen from "./components/screen/TodayWalkRecordScreen"; // 추가된 부분
import PetCalenderScreen from "./components/screen/PetCalenderScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProfileEdit" component={EditProfileScreen} />
        <Stack.Screen
          name="PetRegistration"
          component={PetRegistrationScreen}
        />
        <Stack.Screen name="산책하기" component={WalkScreen} />
        <Stack.Screen name="WalkTimerScreen" component={WalkTimerScreen} />
        <Stack.Screen
          name="TodayWalkRecordScreen" // 추가된 부분
          component={TodayWalkRecordScreen} // 추가된 부분
        />
        <Stack.Screen
          name="바둑이의 하루" // 추가된 부분
          component={PetCalenderScreen} // 추가된 부분
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
