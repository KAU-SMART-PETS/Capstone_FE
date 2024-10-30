import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DesignPreset, RoundedFrameProps, RoundedBoxProps, TagBadgeProps } from '@types';
import ShadowBox from './ShadowBox';
import { TagBadge } from './Badge';

// BalloonBox.tsx

type BalloonBoxProps = {
  children: React.ReactNode;
  shadow?: boolean;
  isButton?: boolean;
  onPress?: () => void;
  borderActivate?: boolean;
  onSelect?: (isSelected: boolean) => void;
};

const BalloonBox: React.FC<BalloonBoxProps> = ({
  children,
  shadow = false,
  isButton = false,
  onPress,
  borderActivate = false,
  onSelect,
  }) => {
  const [isActive, setIsActive] = useState(false);


  const borderColor = borderActivate ? (isActive ? 'border-primary' : 'border-gray-400') : '';
  const borderLines = borderActivate ? (isActive ? 'border-solid' : 'border-dashed') : '';

  const Content = (
    <View
      className={`bg-skyblue mt-4 mb-5 px-10 py-10 rounded-2xl relative transition-all duration-300 ${borderColor} ${borderLines}`}
    >
      {/* 말풍선 삼각형 (테일윈드문으로 생성 불가)*/}
      <View
        style={{
          position: 'absolute',
          top: -10,
          left: 20,
          width: 0,
          height: 0,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#D7E8EE', // 말풍선과 동일한 색
        }}
      />
      {/* 내용. 내용간 간격 조절 */}
      <View className="flex space-y-10">{children}</View>
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

export default BalloonBox;