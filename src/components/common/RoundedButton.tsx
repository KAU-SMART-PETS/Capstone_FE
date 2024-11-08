import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import StylizedText from '@common/StylizedText';
import { ShadowStyle } from '@common/ShadowBox';
import Avatar from '@common/Avatar';
import SquareBox, {SquareCardSize, OutlinePreset, SquareBoxProps} from '@common/SquareBox';

export type ButtonColor = 'bg-transparent' | 'bg-secondary' | 'bg-primary' | 'bg-white' | 'bg-black' | `bg-skyblue`; // Define preset options

// NOTE : RoundedSquareButtonWithAvatar 추가 -> 버튼 + avatar + text (mypage 의 반려동물 추가 버튼)

type RoundedTextButtonProps = {
  icon?: React.ReactNode,
  color?: ButtonColor;
  textColor?: string;
  textType?: string;
  content: string; // Content is a string for text button
  borderRadius?: string;
  shadow?: boolean;
  widthOption?: 'full' |'xxs'| 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  extraStyleClass?: string;
  onPress: () => void; // Function to handle press
};

type RoundedCircleButtonProps = {
  color?: string;
  shadow?: boolean;
  size?: number;
  children: React.ReactNode; // Accepts any React component as children
  onPress: () => void; // Function to handle press
};

export const RoundedTextButton: React.FC<RoundedTextButtonProps> = ({
    icon,
    color = 'bg-primary',
    textColor = 'text-white',
    textType = 'body2',
    content = "텍스트 버튼",
    borderRadius = 'rounded-3xl', // rounded-xl, rounded-2xl, rounded-3xl ... 
    shadow = false,
    widthOption = 'md',
    extraStyleClass,
    onPress,
  }) => {
    const widthMap = {
      full: 'w-96',
      xxs: 'w-10',
      xs: 'w-20',
      sm: 'w-24',  // Example: small width
      md: 'w-32',  // Example: medium width
      lg: 'w-56',  // Example: large width
      xl: 'w-80',
    };
    const widthClass = widthMap[widthOption] || widthMap.full;
    const ContentBox = (
      <View className={`${color} ${borderRadius} mx-auto py-2.5 px-3 ${widthClass} flex flex-row items-center justify-center ${extraStyleClass}`}>
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
        className={`rounded-full ${color} flex items-center justify-center`}>
        {children}
      </TouchableOpacity>
    );
};
  
export const RoundedSquareButton: React.FC<SquareBoxProps> = ({
  children,
  size = 'md', // Default to medium size
  shadow = false,
  onPress,
  outline = 'solid',
  rounded = 'xl', // Default rounded style
  backgroundColor = 'bg-lightgrey',
}) => {
  return (
    <SquareBox
      size={size}
      shadow={shadow}
      outline={outline}
      onPress={onPress}
      rounded={rounded}
      backgroundColor={backgroundColor}
      >
      {children}
    </SquareBox>
  );
};

export const RoundedSquareButtonWithAvatar: React.FC<SquareBoxProps & { avatarSource?: any; avatarSize?: number }> = ({
  children,
  size = 'md',
  shadow = false,
  onPress,
  outline = 'solid',
  rounded = 'xl',
  backgroundColor = 'bg-lightgrey',
  avatarSource,
  avatarSize = 80,
}) => {
  return (
    <SquareBox
      size={size}
      shadow={shadow}
      outline={outline}
      onPress={onPress}
      rounded={rounded}
      backgroundColor={backgroundColor}
    >
      <View className="flex items-center pt-2 pb-2">
        {avatarSource && <Avatar source={avatarSource} size={avatarSize} />}
        {children && (
          <StylizedText type="label" styleClass="mt-2 text-center">
            {children}
          </StylizedText>
        )}
      </View>
    </SquareBox>
  );
};