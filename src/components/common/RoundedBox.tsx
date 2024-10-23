import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DesignPreset, RoundedFrameProps, RoundedBoxProps, TagBadgeProps } from '@types';
import ShadowBox from './ShadowBox';
import { TagBadge } from './Badge';

export type TagBadgeProps = {
  color?: string;
  content?: string;
};

export type DesignPreset = 'A' | 'B' | 'C' | 'D'; 
// 파일 하단에 각 옵션에 따른 스타일 설명

export type RoundedFrameProps = {
  children: React.ReactNode; // Accepts any children components
  preset?: DesignPreset; // Optional design preset
  shadow?: boolean; // Option for shadow
};

export type RoundedBoxProps = {
  children: React.ReactNode;
  preset?: DesignPreset; // Preset options
  badgeText?: string;
  badgeColor?: string;
  shadow?: boolean; // Option for shadow
  isButton?: boolean; // Default is not a button
  onPress?: () => void; // Function to call on press
  onSelect?: (isSelected: boolean) => void; // Callback to return selection state
  borderActivate?: boolean; // Option to activate border styling
};

export const RoundedFrame: React.FC<RoundedFrameProps> = ({
  children,
  preset = 'A',
  shadow = true,
}) => {
  const styles = getStyles(preset);

  return (
    <View>
      {shadow ? (
        <ShadowBox className={`${styles.borderStyle} w-full`}>
          <View className={`${styles.containerLayout} ${styles.backgroundColor} ${styles.borderStyle}`}>
            {children}
          </View>
        </ShadowBox>
      ) : (
        <View className={`${styles.containerLayout} ${styles.backgroundColor} ${styles.borderStyle}`}>
          {children}
        </View>
      )}
    </View>
  );
};



export const RoundedBox: React.FC<RoundedBoxProps> = ({
  children,
  preset = 'A',
  badgeText,
  badgeColor,
  shadow = true,
  onPress,
  isButton = false,
  onSelect,
  borderActivate = false, // Default is false
}) => {
  const [isActive, setIsActive] = useState(false);

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

  // Border 색상 및 스타일 설정
  const borderColor = borderActivate ? (isActive ? 'border-primary' : 'border-gray-400') : '';
  const borderLines = borderActivate ? (isActive ? 'border-solid' : 'border-dashed') : '';

  const Content = (
    <RoundedFrame
      preset={preset}
      shadow={shadow}
      className={`transition-all duration-300 ${borderColor} ${borderLines}`} // Transition 설정
    >
      {badgeText && <TagBadge content={badgeText} color={badgeColor} />}
      {children}
    </RoundedFrame>
  );

  return isButton ? (
    <TouchableOpacity onPress={handlePress}>
      {Content}
    </TouchableOpacity>
  ) : (
    <View>{Content}</View>
  );
};



const getStyles = (preset: DesignPreset) => {
  switch (preset) {
    case 'A': // 둥근박스1 - 하얗고 둥근박스 + 그림자
      return {
        backgroundColor: 'bg-white',
        borderStyle: 'border border-gray-200 rounded-3xl',
        containerLayout: 'py-6 px-2',
      };
    case 'B':  // 둥근박스2 - 옅은 회색, 그림자+테두리 없음
      return {
        backgroundColor: 'bg-whitegrey',
        borderStyle: 'rounded-3xl',
        containerLayout: 'p-4',
      };
    case 'C': // 둥근박스3 - 테두리 있음. 정사각형, 가운데 정렬
      return {
        backgroundColor: 'bg-white',
        borderStyle: 'border border-3',
        containerLayout: 'py-4 px-3 flex items-center justify-center',
      };
    case 'D': // 둥근박스4 (모달창-중앙) - 하얀박스, 가운데 정렬, 
      return {
      backgroundColor: 'bg-white',
      borderStyle: 'rounded-2xl',
      containerLayout: 'w-80 mx-auto px-12 py-12 flex items-center justify-center',
    };
    case 'E': // 둥근박스5 (모달창-하단) - 하얀박스, 아래쪽 고정, 위쪽만 둥글게
      return {
      backgroundColor: 'bg-white',
      borderStyle: 'rounded-[30px] rounded-b-none',
      containerLayout: 'w-full h-80 mx-auto px-6 py-12 flex items-center justify-center',
    };
    default:
      return {
        backgroundColor: 'bg-white',
        borderStyle: 'border border-gray-200',
        containerLayout: 'py-6 px-2',
      };
  }
};

export default RoundedBox;
