import React from 'react';
import RoundedBox, { OutlinePreset } from './RoundedBox';

interface RadioButtonProps {
  isSelected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  inactiveOutlineStyle?: 'dashed' | 'solid'; // 새로운 속성 추가
}

const RadioButton: React.FC<RadioButtonProps> = ({
  isSelected = false,
  onPress,
  children,
  inactiveOutlineStyle = 'dashed', // 기본값 설정
}) => {
  const outlineStyle: OutlinePreset = isSelected ? 'active-solid' : `inactive-${inactiveOutlineStyle}`; // 비활성화 스타일에 따라 설정

  return (
    <RoundedBox
      preset="squarecard"
      shadow={false}
      outline={outlineStyle}
      isButton={true}
      onPress={onPress}
    >
      {children}
    </RoundedBox>
  );
};

export default RadioButton;
