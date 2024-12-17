import React from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import ListCard from '@common/ListCard';
import StylizedText from '@common/StylizedText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CarouselBanner from '@common/CarouselBanner';
import { Alert } from 'react-native';
import HeaderBar from '@src/components/HeaderBar';
import Fontisto from 'react-native-vector-icons/Fontisto';

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

const HomeCarousel: React.FC = () => {
  const navigation = useNavigation();

  const banners = [
    {
      imageSource: require('@image/banner/walkingBanner.png'),
      onPressAction: () => navigation.navigate('RecordStartPage' as never),
    },
    {
      imageSource: require('@image/banner/feedBanner.png'),
      onPressAction: () => navigation.navigate('ViewFeedList' as never),
    },
    {
      imageSource: require('@image/banner/scanBanner.png'),
      onPressAction: () => navigation.navigate('SelectPetToScan' as never),
    },
    /*
    {
      imageSource: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      onPressAction: () => navigation.navigate('Offline' as never), // 네비게이션 이동
    },
    {
      imageSource: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      onPressAction: () => Linking.openURL('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'), // 웹 링크
    },
    {
      imageSource: require('@assets/image/example1.png'),
      onPressAction: () => Linking.openURL('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'), // 웹 링크
    },
    */
  ];

  return <CarouselBanner banners={banners} />;
};

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenProp>();

  const productCards = [
    {
      id: 'reward-check',
      title: '리워드 확인하기',
      content: '다양한 리워드를\n달성하며 혜택을 받아보세요!',
      avatar: require('@assets/image/reward.png'),
      onPress: () => navigation.navigate('ChallengeList'),
    },
    {
      id: 'product-buy',
      title: '제품 구매하기',
      content: '누적된 포인트로 제품을 구매해보세요!',
      avatar: require('@assets/image/bag.png'),
      onPress: () => navigation.navigate('ViewFeedList'),
    },
    {
      id: 'scan-iris',
      title: '질환 분석하기',
      content: '반려동물의 안구를 스캔하여\n건강 상태를 확인해보세요!',
      avatar: require('@assets/image/scan.png'),
      onPress: () => navigation.navigate('SelectPetToScan', { scanType : 'EYE_SCAN' }),
    },
    {
      id: 'register-nose',
      title: '비문 등록하기',
      content: '반려동물의 안전을 위한\n비문을 등록해보세요!',
      avatar: require('@assets/image/nose.png'),
      onPress: () => navigation.navigate('SelectPetToScan', { scanType : 'NOSE_REGISTER' }),
    },
    {
      id: 'scan-nose',
      title: '비문 조회하기',
      content: '반려동물의 비문을 조회하여\n주인 정보를 확인해보세요!',
      avatar: require('@assets/image/scan_nose.png'),
      onPress: () => navigation.navigate('AlertScan', { scanType : 'NOSE_SCAN', petId: '', petName: '', petType: '' }),
    },
  ];

  const buttons = [
          //{ id: 'Login', title: 'Login', screen: 'Login' },
          //{ id: 'MyPage', title: 'My Page', screen: 'MyPage' },
          //{ id: 'PetInfo', title: 'Pet Information', screen: 'PetProfile' },
          //{ id: 'RegisterPet', title: 'Register Pet', screen: 'PetRegister' },
          //{ id: 'Bluetooth', title: 'Bluetooth', screen: 'BTView' },
          //{ id: 'RecordStartPage', title: 'RecordStartPage', screen: 'RecordStartPage' },
          //{ id: 'MapPage', title: 'MapPage', screen: 'MapPage' },
          //{ id: 'WalkWeeklyRecord', title: 'WalkWeeklyRecord', screen: 'WalkWeeklyRecord' },
          // { id: 'TodayWalk', title: 'Today Walk', screen: 'TodayWalk' },
          //{ id: 'WalkStartPage', title: 'WalkStartPage', screen: 'WalkStartPage' },
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
      <ScrollView className="flex-1">
      {/* 상단 알람 아이콘 */}
      <HeaderBar 
        iconButtons={[{
          icon: <Fontisto name='bell' size={22}/>, 
          onPress: () => navigation.navigate('Notification')
        }]}
      />
      {/* 배너 섹션 */}
        <HomeCarousel />
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