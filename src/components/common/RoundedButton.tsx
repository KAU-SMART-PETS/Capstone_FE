import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import StylizedText from './StylizedText';
import ShadowBox from './ShadowBox';


export type ButtonColor = 'bg-grey' | 'bg-primary' | 'bg-white' | 'bg-black'; // Define preset options
export type TextStyleType = 'header1' | 'header2' | 'body1' | 'body2' | 'caption';

type RoundedTextButtonProps = {
  color?: ButtonColor;
  textColor?: string;
  textType?: TextStyleType;
  content: string; // Content is a string for text button
  borderRadius?: string;
  shadow?: boolean;
  widthOption?: 'full' | 'sm' | 'md' | 'lg';
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
    color = 'bg-primary',
    textColor = 'text-white',
    textType = 'body1',
    content = "텍스트 버튼",
    borderRadius = 'rounded-3xl', // rounded-xl, rounded-2xl, rounded-3xl ... 
    shadow = false,
    widthOption = 'full',
    onPress,
  }) => {
    const widthMap = {
      full: 'w-96',
      sm: 'w-24',  // Example: small width
      md: 'w-36',  // Example: medium width
      lg: 'w-56',  // Example: large width
    };
    const widthClass = widthMap[widthOption] || widthMap.full;
    const Content = (
      <View className={`${color} ${borderRadius} p-3 px-5 ${widthClass} flex items-center justify-center`}>
          <StylizedText type={textType} color={textColor}>
            {content}
          </StylizedText>
      </View>
    );
    return (
      <TouchableOpacity onPress={onPress} className='p-2'>
        {shadow ? (
          <ShadowBox className={borderRadius}>
          {Content}
          </ShadowBox>
        ) : (
          Content
        )}
      </TouchableOpacity>
    );
  };
  
  export const RoundedCircleButton: React.FC<RoundedCircleButtonProps> = ({
    color = 'bg-primary',
    shadow = false,
    children,
    size = 20,
    onPress,
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View className='flex items-center justify-center'>
        {shadow ? (
          <ShadowBox className={`rounded-full`}>
            <View className={`rounded-full ${color} w-[${size}px] h-[${size}px] p-2`}>
              {children}
            </View>
          </ShadowBox>
        ) : (
          <View className={`rounded-full ${color} w-[${size}px] h-[${size}px] p-2`}>
            {children}
          </View>
        )}
        </View>
      </TouchableOpacity>
    );
};
