import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RewardCard, WalkDetailsCard, VeterinaryCard, RegistrationCard, ProductPurchaseCard, ReviewCard } from '@components/FlatListCards';
import dog1 from '@image/placeholder/dog2.jpg';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// RootStackParamList 정의
type RootStackParamList = {
  Home: undefined;
  ListCardExample: undefined;
};

// 네비게이션 타입 정의
type ListCardExampleScreenProp = StackNavigationProp<RootStackParamList, 'ListCardExample'>;

const ListCardExample: React.FC = () => {
  const navigation = useNavigation<ListCardExampleScreenProp>();

  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  return (
    <ScrollView className='flex-1 p-5 pb-12 bg-white scroll'>
        <RewardCard 
          title="리워드 카드 타입1" 
          content="avatarSource에 사진 (이미지 자체 또는 require(파일명))" 
          status="수령 완료"
          avatarSource={dog1} 
          onPress={handlePress} 
        />
        
        <RewardCard 
          title="리워드 카드 타입2" 
          content="avatarSource에 아이콘" 
           status="미달성"
          avatarSource={<MCIcon name='cart' size={25} color={'black'}/>} 
          onPress={handlePress} 
        />
        <RewardCard 
          title="7일 연속 산책하기" 
          content="avatarSource에 숫자"
           status="달성"
          avatarSource={'100'} 
          onPress={handlePress} 
        />
        <WalkDetailsCard 
          title="하늘이"
          details={[
            { label: "산책일시", value: "2024.05.18" },
            { label: "산책 시간", value: "00:10:00" },
            { label: "이동 거리", value: "2.00km" }
          ]}
          onPress={handlePress} 
        />
        <VeterinaryCard 
          title="멍멍 동물병원" 
          contact="010-1234-5678" 
          address="경기도 고양시 일산서구" 
          onPress={handlePress} 
        />
        <RegistrationCard 
          title="비문 등록" 
          content="우리 아이 안전을 위한 비문을 등록해주세요." 
          iconName="dog-service" 
          onPress={handlePress} 
        />
        <ProductPurchaseCard 
          title="제품 구매하기" 
          content="누적된 포인트로 제품을 구매해보세요!" 
          reverse={true} 
          onPress={handlePress} 
        />
        <ReviewCard 
          reviewer="김똑똑" 
          rating={2.5} 
          comment="수의사 선생님이 아주 불친절해요." 
        />
    </ScrollView>
  );
};

export default ListCardExample;
