import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import StylizedText from '@common/StylizedText';
import { ShadowStyle } from '@common/ShadowBox';

export type ButtonColor = 'bg-secondary' | 'bg-primary' | 'bg-white' | 'bg-black' | `bg-skyblue`; // Define preset options

type RoundedTextButtonProps = {
  icon?: React.ReactNode,
  color?: ButtonColor;
  textColor?: string;
  textType?: string;
  content: string; // Content is a string for text button
  borderRadius?: string;
  shadow?: boolean;
  widthOption?: 'full' | 'sm' | 'md' | 'lg' | 'xl';
  onPress: () => void; // Function to handle press
};

type RoundedCircleButtonProps = {
  color?: string;
  borderRadius?: string;
  shadow?: boolean;
  size?: number;
  children: React.ReactNode; // Accepts any React component as children
  onPress: () => void; // Function to handle press
};

export const RoundedTextButton: React.FC<RoundedTextButtonProps> = ({
    icon,
    color = 'bg-primary',
    textColor = 'text-white',
    textType = 'body1',
    content = "텍스트 버튼",
    borderRadius = 'rounded-3xl', // rounded-xl, rounded-2xl, rounded-3xl ... 
    shadow = false,
    widthOption = 'md',
    onPress,
  }) => {
    const widthMap = {
      full: 'w-96',
      sm: 'w-24',  // Example: small width
      md: 'w-32',  // Example: medium width
      lg: 'w-56',  // Example: large width
      xl: 'w-80',
    };
    const widthClass = widthMap[widthOption] || widthMap.full;
    const ContentBox = (
      <View className={`${color} ${borderRadius} mx-auto py-2.5 px-3 ${widthClass} flex flex-row items-center justify-center`}>
          {icon ? icon : null}
          <StylizedText type={textType} styleClass={`${textColor} ${icon ? 'ml-1.5' : ''}`}>
            {content}
          </StylizedText>
      </View>
    );
    return (
      <TouchableOpacity onPress={onPress} style={shadow && ShadowStyle} className={`${borderRadius} ${widthClass} my-1`}>
        {ContentBox}
      </TouchableOpacity>
    );
  };
  
  export const RoundedCircleButton: React.FC<RoundedCircleButtonProps> = ({
    color = 'bg-primary',
    shadow = false,
    children,
    size = 22,
    onPress,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[shadow && ShadowStyle, {width: size, height: size}]}
        className={`rounded-full ${color} p-2 flex items-center justify-center`}>
        {children}
      </TouchableOpacity>
    );
};
