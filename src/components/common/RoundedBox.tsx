import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StylizedText from './StylizedText';

type RoundedBoxProps = {
  title: string;
  description?: string; // Optional description
  icon?: React.ReactNode; // Optional icon
  percentage: number;
  badgeText?: string; // Optional badge text
  badgeColor?: string; // Optional badge color
  backgroundColor?: string; // Custom background color
  borderColor?: string; // Custom border color
  shadow?: boolean; // Option for shadow
  onPress: () => void; // Function to call on press
};

const RoundedBox: React.FC<RoundedBoxProps> = ({
  title,
  description,
  icon,
  percentage,
  badgeText,
  badgeColor = 'bg-red-500', // Default badge color
  backgroundColor = 'bg-gray-[#f7f7f7]',
  borderColor = 'border border-gray-200',
  shadow = true,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`relative w-max-[70%] rounded-[25px] border ${borderColor} ${backgroundColor} p-6 mb-4 ${shadow ? 'shadow-md' : ''}`}
    >
      {/* Badge */}
      {badgeText && (
        <View className={`absolute top-[4px] right-[-8px] px-4 py-1 rounded-full ${badgeColor}`}>
          <Text className="text-white text-[9px] font-semibold">{badgeText}</Text>
        </View>
      )}
      
      {/* Title */}
      <StylizedText type="header1">{title}</StylizedText>
      <View>
        {/* Icon */}
        {/* {icon && (
            <View className="flex-row items-center mb-1">
            {icon}
            </View>
        )} */}
        {/* Optional Description */}
        {description && (
            <Text className="text-gray-500 mt-1 text-xs">{description}</Text>
        )}
        {/* Percentage */}
        {/* <View className="flex-row justify-between items-center">
            <View className="flex w-20 flex-col items-end justify-start">
            <Text className="font-normal text-[8px]">Percentage</Text>
            <View className="flex flex-row items-end ml-2">
                <Text className="text-3xl font-bold text-gray-800">{percentage}</Text>
                <Text className="text-sm mb-1 ml-1">%</Text>
            </View>
            </View>
        </View> */}
      </View>
      
    </TouchableOpacity>
  );
};

export default RoundedBox;
