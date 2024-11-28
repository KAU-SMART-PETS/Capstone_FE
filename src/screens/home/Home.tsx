import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC<RootStackParamList> = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const buttons = [
    { id: 'Login', title: 'Login', screen: 'Login' },
    { id: 'MyPage', title: 'My Page', screen: 'MyPage' },
    //{ id: 'PetInfo', title: 'Pet Information', screen: 'PetProfile' },
    //{ id: 'RegisterPet', title: 'Register Pet', screen: 'PetRegister' },

    //{ id: 'Bluetooth', title: 'Bluetooth', screen: 'BTView' },

    { id: 'MapPage', title: 'MapPage', screen: 'MapPage' },
    { id: 'WalkRecord', title: 'WalkRecord', screen: 'WalkRecord' },
    { id: 'WalkWeeklyRecord', title: 'WalkWeeklyRecord', screen: 'WalkWeeklyRecord' },
    // { id: 'TodayWalk', title: 'Today Walk', screen: 'TodayWalk' },
    //{ id: 'WalkStartPage', title: 'WalkStartPage', screen: 'WalkStartPage' },
  
    { id: 'Camera', title: 'Camera', screen: 'CameraView' },
    { id : 'SelectPetToScan', title:'ScanEye', screen: 'SelectPetToScan'},
    { id: 'PetHealthInfo', title: 'Pet Health Info', screen: 'Analysis' },

    { id: 'ChallengeList', title: 'ChallengeList', screen: 'ChallengeList' },
    { id: 'ViewFeedList', title: 'BuyFeeds', screen: 'ViewFeedList' },

    //{ id: 'Example', title: 'Example Test', screen: 'Example' },
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
