import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { RewardCard, WalkDetailsCard, 
        VeterinaryCard, RegistrationCard, 
        ProductPurchaseCard, ReviewCard} from '@components/FlatListCards';
import dog1 from '@image/placeholder/dog2.jpg';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// TODO : 모양은 됐는데, 이 카드를 눌렀을 때 상세페이지로 이동하도록 onPress 추가해야함

const ListCardExample : React.FC<RootStackParamList> = () => {
    return (
      <ScrollView className='flex-1 p-5 pb-12 bg-white scroll'>
          {/* 리워드 카드는 사진, 아이콘, 숫자 다 넣을 수 있음 (아이콘, 숫자는 하늘색 원형액자 가운데에 배치됨) */}
          <RewardCard title="리워드 카드 타입1" content="avatarSource에 사진 (이미지 자체 또는 require(파일명))" 
              completed={true} avatarSource={dog1}/>
          <RewardCard title="리워드 카드 타입2" content="avatarSource에 아이콘" 
              completed={false} avatarSource={<MCIcon name='cart' size={25} color={'black'}/>}/>
          <RewardCard title="7일 연속 산책하기" content="avatarSource에 숫자"
              completed={true} avatarSource={'100'}/>
          <WalkDetailsCard 
            title="하늘이"
            details={[
              { label: "산책일시", value: "2024.05.18" },
              { label: "산책 시간", value: "00:10:00" },
              { label: "이동 거리", value: "2.00km" }
            ]}
          />
          <VeterinaryCard title="멍멍 동물병원" contact="010-1234-5678" address="경기도 고양시 일산서구" />
          <RegistrationCard title="비문 등록" content="우리 아이 안전을 위한 비문을 등록해주세요." iconName="dog-service" />
          <ProductPurchaseCard title="제품 구매하기" content="누적된 포인트로 제품을 구매해보세요!" reverse={true} />
          <ReviewCard reviewer="김똑똑" rating={2.5} comment="수의사 선생님이 아주 불친절해요." />
      </ScrollView>
    );
  };
  
export default ListCardExample;