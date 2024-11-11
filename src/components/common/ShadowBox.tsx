// ShadowBox.tsx
import React from 'react';
import { View } from 'react-native';

type ShadowBoxProps = {
  children: React.ReactNode;
  style?: any;
};

export const ShadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 4.5,
};

export const ShadowBox: React.FC<ShadowBoxProps> = ({ children, style }) => {
  return (
    <View style={[style, ShadowStyle]}>
      {children}
    </View>
  );
};
