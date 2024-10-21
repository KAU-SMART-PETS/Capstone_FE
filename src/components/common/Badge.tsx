import React from 'react';
import { View, Text } from 'react-native';

type BadgeProps = {
  text?: string;
  color?: string;
  customStyle?: string;
};

const Badge: React.FC<BadgeProps> = ({ text = 'Badge', color = 'bg-red', customStyle = '' }) => {
  return (
    <View className={`absolute top-2 right-2 px-2 py-1 rounded-lg ${color} ${customStyle}`}>
      <Text className="text-white font-bold text-sm">{text}</Text>
    </View>
  );
};

export default Badge;
