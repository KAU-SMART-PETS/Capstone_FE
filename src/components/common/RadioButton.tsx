import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import SquareBox, {SquareCardSize, OutlinePreset} from '@common/SquareBox';
import StylizedText from '@common/StylizedText';

interface RadioButtonProps {
  isSelected?: boolean;
  onPress?: () => void;
  children?: React.ReactNode; // squarecard일 때는 children 사용
  label?: string; // 텍스트형 라디오 버튼일 때 라벨 사용
  variant?: 'box' | 'text'; // 버튼 스타일 선택
  boxsize?: SquareCardSize;
  inactiveOutlineStyle?: 'dashed' | 'solid'; // 새로운 속성 추가
}

const RadioButton: React.FC<RadioButtonProps> = ({
  isSelected = false,
  onPress,
  children,
  label,
  variant = 'box', // 기본 스타일을 squarecard로 설정
  boxsize = 'md',
  inactiveOutlineStyle = 'dashed',
}) => {
  const outlineStyle: OutlinePreset = isSelected ? 'active-solid' : `inactive-${inactiveOutlineStyle}`;

  if (variant === 'box') {
    // box 스타일의 라디오 버튼
    return ( 
      <View className='m-2'>
        <SquareBox
          shadow={false}
          size={boxsize}
          outline={outlineStyle}
          onPress={onPress}
        >
          {children}
        </SquareBox>
      </View>
    );
  }
  // 텍스트형 라디오 버튼 (일반적인 모양 = 원형버튼 + 레이블)
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="flex-row items-center">
      <View
        className={`w-3.5 h-3.5 mr-2 border-2 ${
          isSelected ? 'border-primary bg-transparent' : 'border-secondary'
        } rounded-full`}
      />
      <StylizedText type='header2' styleClass={`${isSelected ? 'text-primary' : 'text-black/60'}`}>{label}</StylizedText>
    </TouchableOpacity>
  );
};

export default RadioButton;
