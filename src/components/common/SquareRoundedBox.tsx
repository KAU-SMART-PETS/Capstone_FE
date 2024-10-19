import React from 'react';
import { View } from 'react-native';

type SquareRoundedBoxProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  opacity?: number;
  borderColor?: string; // Border color
};

const SquareRoundedBox: React.FC<SquareRoundedBoxProps> = ({
  children,
  backgroundColor = 'bg-white',
  opacity = 100,
  borderColor = 'border-gray-300',
}) => {
  return (
    <View className={`rounded-lg ${backgroundColor} ${borderColor} border p-4 shadow-lg mb-4 opacity-${opacity}`}>
      {children}
    </View>
  );
};

export default SquareRoundedBox;
