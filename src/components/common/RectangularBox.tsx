import React, {useState} from 'react';
import { View, TouchableOpacity } from 'react-native';
import ShadowBox from './ShadowBox';
import { TagBadge } from './Badge';

export type RectDesignPreset = 'A' | 'B' | 'C' | 'D' | 'F';

export type RectangleBoxProps = {
 children?: React.ReactNode;
 preset?: RectDesignPreset;
 badgeText?: string;
 badgeColor?: string;
 shadow?: boolean;
 isButton?: boolean;
 onPress?: () => void;
 onSelect?: (isSelected: boolean) => void;
 borderActivate?: boolean;
};

export const RectangleBox: React.FC<RectangleBoxProps> = ({
 children,
 preset = 'A',
 badgeText,
 badgeColor,
 shadow = true,
 onPress,
 isButton = false,
 onSelect,
 borderActivate = false,
}) => {
 const [isActive, setIsActive] = useState(false);
 const styles = getStyles(preset);

 const handlePress = () => {
   const newState = !isActive;
   setIsActive(newState);
   if (onSelect) {
     onSelect(newState);
   }
   if (onPress) {
     onPress();
   }
 };

 const borderColor = borderActivate ? (isActive ? 'border-primary' : 'border-gray-400') : '';
 const borderLines = borderActivate ? (isActive ? 'border-solid' : 'border-dashed') : '';

 const Content = (
   <View>
     {shadow ? (
       <ShadowBox className={`${styles.borderStyle} w-full`}>
         <View className={`${styles.containerLayout} ${styles.backgroundColor} ${styles.borderStyle} ${borderColor} ${borderLines}`}>
           {badgeText && <TagBadge content={badgeText} color={badgeColor} />}
           {children}
         </View>
       </ShadowBox>
     ) : (
       <View className={`${styles.containerLayout} ${styles.backgroundColor} ${styles.borderStyle} ${borderColor} ${borderLines}`}>
         {badgeText && <TagBadge content={badgeText} color={badgeColor} />}
         {children}
       </View>
     )}
   </View>
 );

 return isButton ? (
   <TouchableOpacity onPress={handlePress}>
     {Content}
   </TouchableOpacity>
 ) : (
   <View>{Content}</View>
 );
};

const getStyles = (preset: RectDesignPreset) => {
 switch (preset) {
   case 'A': // 직사각형1 - 초록색, 테두리 없음
     return {
       backgroundColor: 'bg-darkgreen',
       containerLayout: 'py-6 px-6',
     };
   default:
     return {
       backgroundColor: 'bg-white',
       borderStyle: 'border border-gray-200',
       containerLayout: 'py-6 px-2',
     };
 }
};

export default RectangleBox;