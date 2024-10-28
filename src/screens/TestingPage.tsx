// TestingPage.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@types';

type TestingPageNavigationProp = StackNavigationProp<RootStackParamList, 'TestingPage'>;

interface NavigationButtonProps {
  title: string;
  destination: keyof RootStackParamList;
  bgColor: string;
  textColor: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ title, destination, bgColor, textColor }) => {
  const navigation = useNavigation<TestingPageNavigationProp>();

  return (
    <TouchableOpacity
      className={`w-40 h-12 ${bgColor} rounded-md justify-center items-center mb-4`}
      onPress={() => navigation.navigate(destination)}
    >
      <Text className={`${textColor}`}>{title}</Text>
    </TouchableOpacity>
  );
};

const TestingPage: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-2xl text-center mb-4 text-orange">Main Screen</Text>
      <Text className="text-lg font-bold mb-4 text-blue">메인 페이지</Text>
      {/* Navigation Buttons */}
      <NavigationButton title="CardExample" destination="CardExample" bgColor="bg-safe" textColor="text-black" />
      <NavigationButton title="ListCardExample" destination="ListCardExample" bgColor="bg-safe" textColor="text-black" />
      <NavigationButton title="SummaryExample" destination="SummaryExample" bgColor="bg-safe" textColor="text-black" />
      <NavigationButton title="RadioButtonExample" destination="RadioButtonExample" bgColor="bg-warning" textColor="text-black" />
      <NavigationButton title="BoxExample" destination="BoxExample" bgColor="bg-lightgrey" textColor="text-black" />
      <NavigationButton title="BadgeExample" destination="BadgeExample" bgColor="bg-secondary" textColor="text-black" />
      <NavigationButton title="Modal Example" destination="ModalExample" bgColor="bg-silver" textColor="text-white" />
      <NavigationButton title="TextInputExample" destination="TextInputExample" bgColor="bg-pink" textColor="text-white" />
    </View>
  );
};

export default TestingPage;
