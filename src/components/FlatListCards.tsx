import React from 'react';
import { View , ImageSourcePropType } from 'react-native';
import { PillBadge } from './common/Badge';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import StylizedText from '@components/common/StylizedText';
import dog1 from '@image/placeholder/dog2.jpg';
import ListCard from '@components/common/ListCard';
import ColorMap from '@common/ColorMap';
import bagImg from '@image/icon/bag.png';

// TODO : 내일은 해당 항목과 버튼이 연결되도록 작업수행 예정

// NOTE : FlatList 쪽 코드를 패키징 더 개선할 지 고민 (사용 시 짧고 간단한 코드를 쓸 수 있도록)


// 리워드 관련
interface RewardCardProps {
  avatarSource?: ImageSourcePropType | React.ReactNode | string;
  title: string;
  content: string;
  completed: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({ avatarSource, title, content, completed }) => {
  // const iconItem = <MCIcon name="cart-outline" size={28} color="black" />;
  return (
    <ListCard 
      avatar={avatarSource}
      title={<StylizedText type="header7" styleClass="text-black mt-1.5">{title}</StylizedText>}
      content={<StylizedText type="body2" styleClass="text-secondary mb-1.5">{content}</StylizedText>}
      badge={<PillBadge color={completed ? 'bg-primary' : 'bg-secondary'} textColor="text-white" text={completed ? '달성' : '미달성'} />}
    />
  );
};

// 산책데이터 관련
interface WalkDetailsCardProps {
  title: string;
  details: { label: string; value: string }[];
}

export const WalkDetailsCard: React.FC<WalkDetailsCardProps> = ({ title, details }) => (
  <ListCard 
    avatar={dog1}
    label={title}
    // title={<StylizedText type="header6" styleClass="text-black">{title}</StylizedText>}
    content={
      <View className="text-left">
        {details.map((detail, index) => (
          <View key={index} className="flex-row mb-1">
            <StylizedText type="body2" styleClass="w-16">{detail.label}</StylizedText>
            <StylizedText type="body2" styleClass="text-black">{detail.value}</StylizedText>
          </View>
        ))}
      </View>
    }
  />
);

// 동물병원 정보 명함
interface VeterinaryCardProps {
  title: string;
  contact: string;
  address: string;
}

export const VeterinaryCard: React.FC<VeterinaryCardProps> = ({ title, contact, address }) => (
  <ListCard 
    avatar={dog1}
    title={<StylizedText type="header6" styleClass="text-black mt-0.5 mb-0.5">{title}</StylizedText>}
    content={
      <View className="ml-0.5 mb-1">
        <StylizedText type="label" styleClass="text-black">{contact}</StylizedText>
        <StylizedText type="label" styleClass="text-black">{address}</StylizedText>
      </View>
    }
  />
);

// 제목행의 앞에 아이템 하나 집어넣음 (아랫줄의 본문란은 전혀 옆으로 밀리지 X)
// 비문등록 항목버튼
interface RegistrationCardProps {
  title: string;
  content: string;
  iconName: string;
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({ title, content, iconName }) => (
  <ListCard 
    layout='contentOnly'
    title={<StylizedText type="header1" styleClass="text-black mt-1 ml-1">{title}</StylizedText>}
    content={<StylizedText type="body2" styleClass="text-black">{content}</StylizedText>}
    extra={<MCIcon name={iconName} size={42} color="black" />}
    extraPosition="title-start"
  />
);

// 아이콘 우측에 띄우고 메시지보여주는 버튼
interface ProductPurchaseCardProps {
  title: string;
  content: string;
  reverse?: boolean;
}

const ProductPurchaseCard: React.FC<ProductPurchaseCardProps> = ({ title, content, reverse }) => (
  <ListCard 
    avatar={bagImg}
    reverse={reverse}
    title={<StylizedText type="header7" styleClass="text-black mt-1 ml-1">{title}</StylizedText>}
    content={<StylizedText type="body2" styleClass="text-black">{content}</StylizedText>}
  />
);

// 동물병원 리뷰
interface ReviewCardProps {
  reviewer: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewer, rating, comment }) => {
  return (
    <ListCard 
      title={
        <View className="flex-row justify-between items-start">
          <StylizedText type="header5" styleClass="text-primary mb-1">{reviewer}</StylizedText>
          <View className="flex-row">
            <AntIcon name="staro" size={18} color={ColorMap['yellow']} />
            <StylizedText type="body1" styleClass="ml-2 text-black">{rating.toFixed(1)}</StylizedText>
          </View>
        </View>
      }
      content={<StylizedText type="body2" styleClass="text-black -mt-1 mb-2">{comment}</StylizedText>}
    />
  );
};

const FlatListCards: React.FC = () => {
  return (
    <View className="bg-white pt-10 px-5 scroll">
      <RewardCard title="7일 연속 산책하기" content="7일 연속 30분 이상 산책에 성공해보세요!" 
          completed={true} avatarSource='100'/>
      <RewardCard title="7일 연속 산책하기" content="7일 연속 30분 이상 산책에 성공해보세요!" 
          completed={false} avatarSource={dog1}/>
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
      <ReviewCard reviewer="김똑똑" rating={5.0} comment="수의사 선생님이 아주 친절하세요." />
    </View>
  );
};

export default FlatListCards;
