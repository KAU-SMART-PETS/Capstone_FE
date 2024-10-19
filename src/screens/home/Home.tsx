import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

const Home: React.FC<Props> = ({ navigation }) => {

  const buttons = [
    { id: 'Login', title: 'Login', screen: 'Login' },
    { id: 'Camera', title: 'Camera', screen: 'CameraView' },
    { id: 'MyPage', title: 'My Page', screen: 'MyPage' },
    { id: 'RegisterPet', title: 'Register Pet', screen: 'PetRegister' },
    { id: 'Bluetooth', title: 'Bluetooth', screen: 'BTView' },
    { id: 'PetInfo', title: 'Pet Information', screen: 'PetProfile' },
    { id: 'PetHealthInfo', title: 'Pet Health Info', screen: 'Analysis' },
    { id: 'WeeklySummary', title: 'Weekly Summary', screen: 'WeeklySummary' },
    { id: 'Example', title: 'Testing', screen: 'Example' },
  ];

  return (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <Text className="text-2xl text-center mb-4">Main Screen</Text>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.id}
          className="bg-green-500 p-3 m-2 rounded"
          onPress={() => navigation.navigate(button.screen as keyof RootStackParamList)} // Type assertion here
        >
          <Text className="text-white text-center">{button.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Camera: undefined;
  MyPage: undefined;
  RegisterPet: undefined;
  SelectPart: undefined;
  Bluetooth: undefined;
  PetInfo: undefined;
  PetHealthInfo: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default Home;
