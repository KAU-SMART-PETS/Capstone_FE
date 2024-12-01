import React from 'react';
import { View , ImageSourcePropType, Image } from 'react-native';
import { PillBadge, RatingBadge } from '@common/Badge';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StylizedText from '@components/common/StylizedText';
import ListCard from '@components/common/ListCard';
import bagImg from '@image/icon/bag.png';
import dog1 from '@image/placeholder/dog.jpg';
import ModalLayout from './ModalLayout';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { RoundedTextButton, RoundedSquareButton } from './common/RoundedButton';

// 리워드 관련
interface RewardCardProps {
  avatarSource?: ImageSourcePropType | React.ReactNode | string;
  title: string;
  content: string;
  status?: '미달성' | '달성' | '수령 완료';
  onPress?: ()=> void;
}

//NOTE : 뱃지 색상 3가지로 확장하여 추가하였음.
export const RewardCard: React.FC<RewardCardProps & { status: '미달성' | '달성' | '수령 완료' }> = ({
  avatarSource,
  title,
  content,
  status,
  onPress,
}) => {
  // 배지 색상 및 텍스트 설정
  const badgeStyles = {
    '미달성': { color: 'bg-secondary', text: '미달성' },
    '달성': { color: 'bg-primary', text: '달성' },
    '수령 완료': { color: 'bg-darkgreen', text: '수령 완료' },
  };

  const { color, text } = badgeStyles[status];

  return (
    <ListCard
      avatar={avatarSource}
      onPress={onPress}
      title={<StylizedText type="header7" styleClass="text-black mt-1.5">{title}</StylizedText>}
      content={<StylizedText type="body2" styleClass="text-secondary mb-1.5">{content}</StylizedText>}
      badge={<PillBadge color={color} textColor="text-white" text={text} />}
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
  reverse?: boolean;
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

