import React from 'react';
import { Shadow } from 'react-native-shadow-2';

type ShadowBoxProps = {
  children: React.ReactNode; // Accepts any children components
  distance?: number; // Distance for the shadow
  startColor?: string; // Starting color for the shadow
  endColor?: string; // Ending color for the shadow
  offset?: [number, number]; // Offset for the shadow
  style?: any; // Additional styles for the shadow
};

const ShadowBox: React.FC<ShadowBoxProps> = ({
  children,
  distance = 4.5,
  startColor = 'rgba(0, 0, 0, 0.06)',
  endColor = 'rgba(0, 0, 0, 0)',
  offset = [0, 3],
  style,
}) => {
  return (
    <Shadow
      distance={distance}
      startColor={startColor}
      endColor={endColor}
      offset={offset}
      style={style}
    >
      {children}
    </Shadow>
  );
};

export default ShadowBox;
