import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC<RootStackParamList> = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const buttons = [
    { id : 'TestingPage', title:'Testing Page', screen: 'TestingPage'},
    { id: 'WalkStartPage', title: 'WalkStartPage', screen: 'WalkStartPage' },
    { id: 'Login', title: 'Login', screen: 'Login' },
    { id: 'Camera', title: 'Camera', screen: 'CameraView' },
    { id: 'MyPage', title: 'My Page', screen: 'MyPage' },
    { id: 'RegisterPet', title: 'Register Pet', screen: 'PetRegister' },
    { id: 'Bluetooth', title: 'Bluetooth', screen: 'BTView' },
    { id: 'PetInfo', title: 'Pet Information', screen: 'PetProfile' },
    { id: 'PetHealthInfo', title: 'Pet Health Info', screen: 'Analysis' },
    { id: 'WeeklySummary', title: 'Weekly Summary', screen: 'WeeklySummary' },
    // { id: 'TodayWalk', title: 'Today Walk', screen: 'TodayWalk' },
    //{ id: 'Example', title: 'Example Test', screen: 'Example' },
    { id: 'ChallengeList', title: 'ChallengeList', screen: 'ChallengeList' },
    { id: 'ViewFeedList', title: 'BuyFeeds', screen: 'ViewFeedList' },
    { id: 'MapPage', title: 'MapPage', screen: 'MapPage' },
  ];

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl text-center mb-4">Main Screen</Text>
      {buttons.map((button) => (
          <TouchableOpacity
            key={button.id}
            className="bg-cyan-600 px-5 py-2 my-2 rounded-lg border border-black"
            onPress={() => navigation.navigate(button.screen)} // Type assertion here
          >
            <Text className="text-white text-center">{button.title}</Text>
          </TouchableOpacity>
      ))}
    </View>
  );
};

export default Home;
