import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StylizedText from './StylizedText';
import ShadowBox from './ShadowBox';
import { DesignPreset, RoundedFrameProps, RoundedBoxProps,
        TagBadgeProps, RoundedTextButtonProps, RoundedCircleButtonProps} from '@types';

export const RoundedFrame: React.FC<RoundedFrameProps> = ({
  children,
  preset = 'A',
  shadow = true,
}) => {
  const styles = getStyles(preset);

  return (
    <View>
      {shadow ? (
        <ShadowBox className="rounded-3xl w-full">
          <View className={`${styles.padding} ${styles.backgroundColor} ${styles.borderColor} rounded-3xl`}>
            {children}
          </View>
        </ShadowBox>
      ) : (
        <View className={`${styles.padding} ${styles.backgroundColor} ${styles.borderColor} rounded-3xl`}>
          {children}
        </View>
      )}
    </View>
  );
};

export const TagBadge : React.FC<TagBadgeProps> = ({color = 'bg-red', content = '위험'}) => {
  return (
    <View className={`absolute top-[4px] right-[-8px] px-2 py-1 rounded-full ${color} z-10`}>
      <Text className="text-white text-[9px] font-semibold">{content}</Text>
    </View>
  );
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
    full: 'w-full',
    sm: 'w-24',  // Example: small width
    md: 'w-36',  // Example: medium width
    lg: 'w-58',  // Example: large width
  };
  const widthClass = widthMap[widthOption] || widthMap.full;
  const Content = (
    <View className={`${color} ${borderRadius} p-3 px-5 ${widthClass} flex items-center justify-center`}>
        <StylizedText type={textType} className={textColor}>
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
  const borderStyle = borderActivate ? (isActive ? 'border-solid' : 'border-dashed') : '';

  const Content = (
    <RoundedFrame
      preset={preset}
      shadow={shadow}
      className={`transition-all duration-300 ${borderColor} ${borderStyle}`} // Transition 설정
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
        borderColor: 'border border-gray-200',
        padding: 'py-6 px-2',
      };
    case 'B':  // 둥근박스2 - 옅은 회색, 그림자+테두리 없음
      return {
        backgroundColor: 'bg-grey',
        borderColor: '',
        padding: 'p-4',
      };
    case 'C': // 둥근박스3 - 테두리 있음. 정사각형, 가운데 정렬
      return {
        backgroundColor: 'bg-white',
        borderColor: 'border border-3',
        padding: 'py-4 px-3 flex items-center justify-center',
      };
    default:
      return {
        backgroundColor: 'bg-white',
        borderColor: 'border border-gray-200',
        padding: 'py-6 px-2',
      };
  }
};

export default RoundedBox;
