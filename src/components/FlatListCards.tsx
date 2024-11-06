import React from 'react';
import { View , ImageSourcePropType } from 'react-native';
import { PillBadge, RatingBadge } from '@common/Badge';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StylizedText from '@components/common/StylizedText';
import ListCard from '@components/common/ListCard';
import bagImg from '@image/icon/bag.png';
import dog1 from '@image/placeholder/dog.jpg';

// 리워드 관련
interface RewardCardProps {
  avatarSource?: ImageSourcePropType | React.ReactNode | string;
  title: string;
  content: string;
  completed: ()=> void;
  onPress?: ()=> void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ avatarSource, title, content, completed, onPress }) => {
  return (
    <ListCard 
      avatar={avatarSource}
      onPress={onPress}
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
  onPress?: ()=> void;
}

export const WalkDetailsCard: React.FC<WalkDetailsCardProps> = ({ title, details, onPress }) => (
  <ListCard 
    avatar={dog1}
    label={title}
    onPress={onPress}
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
  onPress?: ()=> void;
}

export const VeterinaryCard: React.FC<VeterinaryCardProps> = ({ title, contact, address, onPress }) => (
  <ListCard 
    avatar={dog1}
    title={<StylizedText type="header6" styleClass="text-black mt-0.5 mb-0.5">{title}</StylizedText>}
    onPress={onPress}   
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
  onPress?: ()=> void;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({ title, content, iconName, onPress }) => {
  const titleRow = (
    <View className='flex-row flex items-center'>
      <MCIcon name={iconName} size={42} color="black" />
      <StylizedText type="header1" styleClass="text-black mt-1.5 ml-1">{title}</StylizedText>
    </View>
  );
  return(
  <ListCard 
    layout='contentOnly'
    onPress={onPress} 
    title={titleRow}
    content={<StylizedText type="body2" styleClass="text-black">{content}</StylizedText>}
  />);
};

// 아이콘 우측에 띄우고 메시지보여주는 버튼
interface ProductPurchaseCardProps {
  title: string;
  content: string;
  reverse?: ()=> void;
  onPress?: ()=> void;
}

export const ProductPurchaseCard: React.FC<ProductPurchaseCardProps> = ({ title, content, reverse, onPress }) => (
  <ListCard 
    avatar={bagImg}
    reverse={reverse}
    onPress={onPress}
    title={<StylizedText type="header7" styleClass="text-black mt-1 ml-0.5">{title}</StylizedText>}
    content={<StylizedText type="body2" styleClass="text-black">{content}</StylizedText>}
  />
);

// 동물병원 리뷰
interface ReviewCardProps {
  reviewer: string;
  rating: number;
  comment: string;
  onPress?: ()=> void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ reviewer, rating, comment, onPress }) => {
  const ratingBadge = (<RatingBadge rating={rating} />);
  return (
    <ListCard 
      preset='flatcard-fit'
      layout='contentOnly'
      onPress={onPress}
      title={
        <StylizedText type="header5" styleClass="text-primary">{reviewer}</StylizedText>
      }
      badge={ratingBadge}
      content={<StylizedText type="body2" styleClass="text-black -mt-1 mb-2">{comment}</StylizedText>}
    />
  );
};
