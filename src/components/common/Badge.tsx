import React from 'react';
import { View } from 'react-native';
import StylizedText from '@common/StylizedText';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ColorMap from '@common/ColorMap';

type BadgeProps = {
  text?: string;
  color?: string;
  textColor?: string;
  customStyle?: string;
};

export const PillBadge: React.FC<BadgeProps> = ({
  text = 'PillBadge',
  color = 'bg-gray-200',
  textColor = 'text-gray-800',
}) => {
  return (
    <View className='flex-wrap'>
      <View className={`self-start px-2.5 py-1 rounded-full ${color}`}>
        <StylizedText type="label" styleClass={textColor}>{text}</StylizedText>
      </View>
    </View>
  );
};

export const TagBadge : React.FC<BadgeProps> = ({ text = 'TagBadge', color = 'bg-red', textColor = 'text-white'}) => {
  // 박스 한쪽 끝에 걸쳐서 붙여놓는 뱃지
  return (
    <View className={`rounded-full absolute top-[8px] right-[-8px] px-3 py-1 ${color} z-10`}>
      <StylizedText type="label1" styleClass={textColor}>{text}</StylizedText>
    </View>
  );
};

export const Badge: React.FC<BadgeProps> = ({
  text = 'Badge',
  color = 'bg-green',
  textColor = 'text-black',
}) => {
  return (
    <View className='flex-wrap'>
      <View className={`self-start px-4 py-1 rounded-sm ${color} m-2`}>
        <StylizedText type="label" styleClass={textColor}>{text}</StylizedText>
      </View>
    </View>
  );
};

type RatingBadgeProps = {
  rating: number;
  starSize?: number; // Size of the star icon
  textSize?: 'body1' | 'body2' | 'label' | 'header5'; // Size of the rating text
};

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating = 2.0,
  starSize = 16,
  textSize = 'body1',
}) => {
  return (
    <View className='flex-wrap'>
      <View className="flex-row items-center px-3 py-1">
        <AntIcon name="staro" size={starSize} color={ColorMap['warning']} />
        <StylizedText type={textSize} styleClass="ml-2 text-black">
          {rating.toFixed(1)}
        </StylizedText>
      </View>
    </View>
  );
};