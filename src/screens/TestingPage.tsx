// TestingPage.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
      onPress={() => navigation.navigate(destination as string)} // as string을 사용해 destination이 문자열임을 명시
    >
      <Text className={`${textColor}`}>{title}</Text>
    </TouchableOpacity>
  );
};

// 버튼 정보 배열
const buttons = [
  { title: "ICWExample", destination: "ICWExample"},
  { title: "BalloonBoxExample", destination: "BalloonBoxExample"},
  { title: "AchieveCardExample", destination: "AchievementCardExample"},
  { title: "RecordExample", destination: "RecordExample"},
  { title: "ListCardExample", destination: "ListCardExample"},
  // { title: "SummaryExample", destination: "SummaryExample"},
  { title: "RadioButtonExample", destination: "RadioButtonExample"},
  { title: "BoxExample", destination: "BoxExample"},
  { title: "BadgeExample", destination: "BadgeExample"},
  { title: "Modal Example", destination: "ModalExample"},
  { title: "TextInputExample", destination: "TextInputExample"},
  { title: "WalkStartPage", destination: "WalkStartPage"},
  { title: "MapPage", destination: "MapPage"},
];

const TestingPage: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-2xl text-center mb-4 text-orange">Main Screen</Text>
      <Text className="text-lg font-bold mb-4 text-blue">메인 페이지</Text>
      {/* Navigation Buttons 생성 */}
      {buttons.map((button, index) => (
        <NavigationButton
          key={index}
          title={button.title}
          destination={button.destination}
          bgColor='bg-green'
          textColor='text-black'
        />
      ))}
    </View>
  );
};

export default TestingPage;
