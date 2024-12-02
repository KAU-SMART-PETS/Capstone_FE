import React from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import ListCard from '@components/common/ListCard';
import StylizedText from '@components/common/StylizedText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// ProductPurchaseCard 컴포넌트 복사
interface ProductPurchaseCardProps {
  title: string;
  content: string;
  reverse?: boolean;
  avatar: any;
  onPress?: () => void;
}

const ProductPurchaseCard: React.FC<ProductPurchaseCardProps> = ({ title, avatar, content, reverse, onPress }) => (
  <ListCard
    avatar={avatar}
    reverse={reverse}
    onPress={onPress}
    title={<StylizedText type="header7" styleClass="text-black mt-1 ml-0.5">{title}</StylizedText>}
    content={<StylizedText type="body2" styleClass="text-black">{content}</StylizedText>}
  />
);

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenProp>();

  const productCards = [
    {
      id: 'reward-check',
      title: '리워드 확인하기',
      content: '다양한 리워드를\n달성하며 혜택을 받아보세요!',
      avatar: require('../../assets/image/reward.png'),
      onPress: () => navigation.navigate('ChallengeList'),
    },
    {
      id: 'product-buy',
      title: '제품 구매하기',
      content: '누적된 포인트로 제품을 구매해보세요!',
      avatar: require('../../assets/image/bag.png'),
      onPress: () => navigation.navigate('ViewFeedList'),
    },
    {
      id: 'scan-iris',
      title: '홍채 스캔하기',
      content: '반려동물의 홍채를 스캔하여\n건강 상태를 확인해보세요!',
      avatar: require('../../assets/image/scan.png'),
      onPress: () => navigation.navigate('SelectPetToScan'),
    },
    {
      id: 'register-nose',
      title: '비문 등록하기',
      content: '반려동물의 안전을 위한\n비문을 등록해보세요!',
      avatar: require('../../assets/image/nose.png'),
      onPress: () => navigation.navigate('RegisterPetNose'),
    },
    {
      id: 'scan-nose',
      title: '비문 스캔하기',
      content: '반려동물의 비문을 스캔하여\n정보를 확인해보세요!',
      avatar: require('../../assets/image/scan_nose.png'),
      onPress: () => navigation.navigate('ScanNose'),
    },
  ];

  const buttons = [
          //{ id: 'Login', title: 'Login', screen: 'Login' },
          //{ id: 'MyPage', title: 'My Page', screen: 'MyPage' },
          //{ id: 'PetInfo', title: 'Pet Information', screen: 'PetProfile' },
          //{ id: 'RegisterPet', title: 'Register Pet', screen: 'PetRegister' },
          //{ id: 'Bluetooth', title: 'Bluetooth', screen: 'BTView' },
          { id: 'RecordStartPage', title: 'RecordStartPage', screen: 'RecordStartPage' },
          //{ id: 'MapPage', title: 'MapPage', screen: 'MapPage' },
          //{ id: 'WalkWeeklyRecord', title: 'WalkWeeklyRecord', screen: 'WalkWeeklyRecord' },
          // { id: 'TodayWalk', title: 'Today Walk', screen: 'TodayWalk' },
          //{ id: 'WalkStartPage', title: 'WalkStartPage', screen: 'WalkStartPage' },
          //{ id: 'Camera', title: 'Camera', screen: 'CameraView' },
          //{ id : 'SelectPetToScan', title:'ScanEye', screen: 'SelectPetToScan'},
          //{ id : 'RegisterPetNose', title:'RegisterNose', screen: 'RegisterPetNose'},
          //{ id: 'PetHealthInfo', title: 'Pet Health Info', screen: 'Analysis' },
          //{ id: 'ChallengeList', title: 'ChallengeList', screen: 'ChallengeList' },
          //{ id: 'ViewFeedList', title: 'BuyFeeds', screen: 'ViewFeedList' },
          //{ id: 'Offline', title: 'Offline', screen: 'Offline' },

          //{ id: 'Example', title: 'Example Test', screen: 'Example' },
    ];

  return (
    <View className="flex-1 bg-white">
      {/* 상단 알람 아이콘 */}
      <View className="flex-row justify-end items-center px-4 py-2" style={{ paddingTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Image
            source={require('../../assets/image/icon/alarm.png')}
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
      {/* 배너 섹션 */}
      <View className="mt-6 mb-4 px-4">
        <View className="w-full h-40 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
          <Text className="text-lg font-bold text-gray-700">배너</Text>
        </View>
      </View>
        <View className="space-y-4 mt-4 px-4">
          {productCards.map((card) => (
            <ProductPurchaseCard
              key={card.id}
              title={card.title}
              content={card.content}
              onPress={card.onPress}
              avatar={card.avatar}
            />
          ))}
        </View>

        {/* 버튼 섹션 */}
        <View className="w-full items-center mt-8">
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.id}
              className="bg-cyan-600 px-5 py-2 my-2 rounded-lg border border-black"
              onPress={() => navigation.navigate(button.screen)}
            >
              <Text className="text-white text-center">{button.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;