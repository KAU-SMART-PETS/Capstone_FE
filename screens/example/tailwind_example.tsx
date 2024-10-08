import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

const TailwindExample = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-400 to-blue-700">
      <View className="p-4 bg-white rounded-lg shadow-lg w-80">
        <Image
          source={{ uri: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg' }}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <Text className="text-2xl font-semibold text-center text-gray-800">
          Welcome to Tailwind
        </Text>
        <Text className="text-sm text-center text-gray-500 my-2">
          A beautiful UI with React Native and Tailwind CSS
        </Text>
        <Pressable className="mt-4 p-2 bg-blue-500 rounded-lg shadow-md opacity-90 active:opacity-70">
          <Text className="text-center text-white text-lg font-bold">Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TailwindExample;
