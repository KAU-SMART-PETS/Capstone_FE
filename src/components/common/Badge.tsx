import React from 'react';
import { View } from 'react-native';
import StylizedText from './StylizedText';

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
    <View className={`self-start px-4 py-1 rounded-full ${color}`}>
      <StylizedText type="label" color={textColor}>{text}</StylizedText>
    </View>
  );
};

export const TagBadge : React.FC<BadgeProps> = ({ text = 'TagBadge', color = 'bg-red', textColor = 'text-white'}) => {
  // 박스 한쪽 끝에 걸쳐서 붙여놓는 뱃지
  return (
    <View className={`rounded-full absolute top-[4px] right-[-8px] px-2 py-1 ${color} z-10`}>
      <StylizedText type="label" color={textColor}>{text}</StylizedText>
    </View>
  );
};

export const Badge: React.FC<BadgeProps> = ({
  text = 'Badge',
  color = 'bg-green',
  textColor = 'text-black',
}) => {
  return (
    <View className={`self-start px-4 py-1 rounded-sm ${color} m-2`}>
      <StylizedText type="label" color={textColor}>{text}</StylizedText>
    </View>
  );
};