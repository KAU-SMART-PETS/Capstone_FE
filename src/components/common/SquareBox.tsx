import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { getBoxOutlnes, OutlinePreset } from '@common/BoxStyles';
import { ShadowStyle } from '@common/ShadowBox';

type SquareCardSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

type BorderRadiusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type { OutlinePreset, SquareCardSize, BorderRadiusSize };

export interface SquareBoxProps {
  children: React.ReactNode;
  size?: SquareCardSize; // Size options for square cards
  shadow?: boolean; // Option for shadow
  onPress?: () => void; // Function to call on press
  outline?: OutlinePreset;
  rounded?: string; // New optional rounded property
  backgroundColor?: string;
}

const sizeStyles = {
  xxs: 'w-10 h-10',
  xs: 'w-16 h-16',
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-36 h-36',
};

const SquareBox: React.FC<SquareBoxProps> = ({
  children,
  size = 'md',
  shadow = false,
  onPress,
  outline = 'solid',
  rounded = 'xl',
  backgroundColor = 'bg-lightgrey',
}) => {
  const outlines = getBoxOutlnes(outline);
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container
      onPress={onPress}
      style={[outlines, shadow && ShadowStyle]}
      className={`rounded-${rounded} ${sizeStyles[size]} flex items-center justify-center ${backgroundColor}`}
    >
      {children}
    </Container>
  );
};

export default SquareBox;
