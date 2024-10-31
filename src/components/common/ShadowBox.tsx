import React from 'react';
import { View } from 'react-native';

type ShadowBoxProps = {
  children: React.ReactNode; 
  style?: any;
}
const defaultShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 4.5,
}

const ShadowBox: React.FC<ShadowBoxProps> = ({
  children,
  style,
}) => {
  return (
      <View style={[style, defaultShadow]}>
        {children}
      </View>
  );
};

export default ShadowBox;

// type ShadowBoxProps = {
//   children: React.ReactNode; // Accepts any children components
//   distance?: number; // Distance for the shadow
//   startColor?: string; // Starting color for the shadow
//   endColor?: string; // Ending color for the shadow
//   offset?: [number, number]; // Offset for the shadow
//   style?: any; // Additional styles for the shadow
// };
// const ShadowBox: React.FC<ShadowBoxProps> = ({
//   children,
//   distance = 6,
//   startColor = 'rgba(0, 0, 0, 0.03)',
//   endColor = 'rgba(0, 0, 0, 0)',
//   offset = [0, 4],
//   style,
// }) => {
//   return (
//     <Shadow
//       distance={distance}
//       startColor={startColor}
//       endColor={endColor}
//       offset={offset}
//       style={style}
//     >
//       {children}
//     </Shadow>
//   );
// };
