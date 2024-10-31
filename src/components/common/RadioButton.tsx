// src/components/RadioButton.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import RoundedBox from './RoundedBox';

interface RadioButtonProps {
  isSelected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  isSelected = false,
  onPress,
  children,
}) => {
  return (
      <RoundedBox
        preset="squarecard"
        shadow={false}
        outline={isSelected ? 'active-solid' : 'inactive-dashed'}
        isButton={true}
        onPress={onPress}
      >
        {children}
      </RoundedBox>
  );
};

export default RadioButton;
