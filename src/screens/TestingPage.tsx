// TestingPage.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@types';

type TestingPageNavigationProp = StackNavigationProp<RootStackParamList>;

const TestingPage : React.FC<RootStackParamList> = () => {
  const navigation = useNavigation<TestingPageNavigationProp>();

  console.log("테스트 페이지가 실행되었음.")
  
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-2xl text-center mb-4">Main Screen</Text>
      <Text className="text-lg font-bold mb-4">메인 페이지</Text>

      {/* Button to navigate to Example screen */}
      <TouchableOpacity
        className="w-40 h-12 bg-blue-500 rounded-md justify-center items-center mb-4"
        onPress={() => navigation.navigate('Example')}
      >
        <Text className="text-white">Go to Example</Text>
      </TouchableOpacity>

      {/* Button to navigate to Example2 screen */}
      <TouchableOpacity
        className="w-40 h-12 bg-green-500 rounded-md justify-center items-center"
        onPress={() => navigation.navigate('Example2')}
      >
        <Text className="text-white">Go to Example2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestingPage;