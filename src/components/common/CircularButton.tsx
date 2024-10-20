import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CircularButtonProps = {
  label: string;
  onPress: () => void;
  backgroundColor?: string; // Tailwind color class for background
  borderColor?: string; // Border color
};

const CircularButton: React.FC<CircularButtonProps> = ({
  label,
  onPress,
  backgroundColor = 'bg-primary', // default primary color
  borderColor = 'border-gray-300',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-full ${backgroundColor} ${borderColor} border p-4 shadow-md`}
    >
      <Text className="text-white text-lg font-bold text-center">{label}</Text>
    </TouchableOpacity>
  );
};

export default CircularButton;
