import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import bagImg from '../../assets/image/bag.png';
import ListCard from '@components/common/ListCard';
import StylizedText from '@components/common/StylizedText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// ProductPurchaseCard 컴포넌트 복사
interface ProductPurchaseCardProps {
  title: string;
  content: string;
  reverse?: boolean;
  onPress?: () => void;
}

const ProductPurchaseCard: React.FC<ProductPurchaseCardProps> = ({ title, content, reverse, onPress }) => (
  <ListCard
    avatar={bagImg}
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
      content: '다양한 리워드를 달성하며 혜택을 받아보세요!',
      onPress: () => console.log('리워드 확인하기 클릭됨'),
    },
    {
      id: 'product-buy',
      title: '제품 구매하기',
      content: '누적된 포인트로 제품을 구매해보세요!',
      onPress: () => console.log('제품 구매하기 클릭됨'),
    },
    {
      id: 'scan-iris',
      title: '홍채 스캔하기',
      content: '반려동물의 홍채를 스캔하여 건강 상태를 확인해보세요!',
      onPress: () => navigation.navigate('SelectPetToScan'),
    },
    {
      id: 'register-nose',
      title: '비문 등록하기',
      content: '반려동물의 안전을 위한 비문을 등록해주세요!',
      onPress: () => navigation.navigate('RegisterPetNose'),
    },
  ];

  const buttons = [
      { id: 'Login', title: 'Login', screen: 'Login' },
          { id: 'MyPage', title: 'My Page', screen: 'MyPage' },
          //{ id: 'PetInfo', title: 'Pet Information', screen: 'PetProfile' },
          //{ id: 'RegisterPet', title: 'Register Pet', screen: 'PetRegister' },

          //{ id: 'Bluetooth', title: 'Bluetooth', screen: 'BTView' },

          { id: 'MapPage', title: 'MapPage', screen: 'MapPage' },
          { id: 'WalkWeeklyRecord', title: 'WalkWeeklyRecord', screen: 'WalkWeeklyRecord' },
          // { id: 'TodayWalk', title: 'Today Walk', screen: 'TodayWalk' },
          //{ id: 'WalkStartPage', title: 'WalkStartPage', screen: 'WalkStartPage' },

          { id: 'Camera', title: 'Camera', screen: 'CameraView' },
          { id : 'SelectPetToScan', title:'ScanEye', screen: 'SelectPetToScan'},
          { id : 'RegisterPetNose', title:'RegisterNose', screen: 'RegisterPetNose'},
          { id: 'PetHealthInfo', title: 'Pet Health Info', screen: 'Analysis' },

          { id: 'ChallengeList', title: 'ChallengeList', screen: 'ChallengeList' },
          { id: 'ViewFeedList', title: 'BuyFeeds', screen: 'ViewFeedList' },

          //{ id: 'Example', title: 'Example Test', screen: 'Example' },
    ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* ProductPurchaseCard 블록 */}
      <View className="space-y-4 mt-4 px-4">
        {productCards.map((card) => (
          <ProductPurchaseCard
            key={card.id}
            title={card.title}
            content={card.content}
            onPress={card.onPress}
          />
        ))}
      </View>

      <View className="w-full items-center mt-8">
        <Text className="text-2xl text-center mb-4">Main Screen</Text>
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
  );
};

export default HomeScreen;