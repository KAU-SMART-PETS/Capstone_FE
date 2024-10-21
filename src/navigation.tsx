// src/navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@types';

import Example from '@screens/Example';
import Example2 from '@screens/Example2';
import TestingPage from '@screens/TestingPage';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TestingPage"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* example */}
        <Stack.Screen name="Example" component={Example} />
        <Stack.Screen name="Example2" component={Example2} />
        <Stack.Screen name="TestingPage" component={TestingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { RootStackParamList } from '@types';

// import Example from '@screens/Example';
// import Example2 from '@screens/Example2';
// import TestingPage from '@screens/TestingPage';

// const Stack = createStackNavigator<RootStackParamList>();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="TestingPage"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         {/* example */}
//         <Stack.Screen name="Example" component={Example} />
//         <Stack.Screen name="Example2" component={Example2} />
//         <Stack.Screen name="TestingPage" component={TestingPage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
