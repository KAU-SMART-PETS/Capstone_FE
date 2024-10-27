// TestingPage.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@types';
// import { fetchWeeklyData } from '@api/weeklyDataApi';
// import {AsyncStorage} from 'react-native';

type TestingPageNavigationProp = StackNavigationProp<RootStackParamList, 'TestingPage'>;

const TestingPage : React.FC<RootStackParamList> = () => {
  const navigation = useNavigation<TestingPageNavigationProp>();

  // console.log("테스트 페이지가 실행되었음.")
  
  console.log()
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-2xl text-center mb-4 text-orange">Main Screen</Text>
      <Text className="text-lg font-bold mb-4 text-blue">메인 페이지</Text>
      {/* Button to navigate to Example screen */}
      <TouchableOpacity
        className="w-40 h-12 bg-lightgrey rounded-md justify-center items-center mb-4"
        onPress={() => navigation.navigate('BoxExample')}
      >
        <Text className="text-black">Go to BoxExample</Text>
      </TouchableOpacity>
      {/* Button to navigate to Example2 screen */}
      <TouchableOpacity
        className="w-40 h-12 bg-secondary rounded-md justify-center items-center"
        onPress={() => navigation.navigate('BadgeExample')}
      >
        <Text className="text-black">Go to BadgeExample</Text>
      </TouchableOpacity>
      {/* Button to navigate to ModalExample screen */}
      <TouchableOpacity
        className="w-40 h-12 bg-darkgrey rounded-md justify-center items-center"
        onPress={() => navigation.navigate('ModalExample')}
      >
        <Text className="text-white">Go to Modal Example</Text>
        </TouchableOpacity>
      {/* Button to navigate to TextInputExample screen */}
      <TouchableOpacity
        className="w-40 h-12 bg-pink rounded-md justify-center items-center"
        onPress={() => navigation.navigate('TextInputExample')}
      >
        <Text className="text-white">Go to TextInputExample Example</Text>
        </TouchableOpacity>
    </View>
  );
};

export default TestingPage;