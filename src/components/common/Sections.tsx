import React from 'react';
import { View, Text, Image, ImageBackground, ImageSourcePropType, TouchableOpacity, Dimensions } from 'react-native';
import StylizedText from '@common/StylizedText';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';

const { width: screenWidth } = Dimensions.get('window');

const BANNER_TYPES = {
  SOLID: 'solid',
  OVERLAY: 'overlay',
} as const;

type BannerType = typeof BANNER_TYPES[keyof typeof BANNER_TYPES];

interface BannerProps {
  row1: string;
  row2: string;
  img?: ImageSourcePropType;
  background?: ImageSourcePropType | string;
  type?: BannerType;
  fullWidth?: boolean;
  onPress?: () => void;
}

export const BannerSection: React.FC<BannerProps> = ({ 
  row1, 
  row2, 
  img, 
  background, 
  type = BANNER_TYPES.OVERLAY, 
  fullWidth = true, 
  onPress 
}) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex-1'>
      {type === BANNER_TYPES.OVERLAY && background ? (
          <ImageBackground 
            source={typeof background === 'string' ? { uri: background } : background} 
            className="w-full h-60 overflow-hidden"
          >
            {/* Material 스타일의 그라데이션 오버레이 */}
            <LinearGradient
              className='absolute w-full h-full'
              colors={['rgba(33, 150, 243, 0.5)', 'rgba(3, 169, 244, 0.3)', 'rgba(255, 255, 255, 0.2)']}
            />
            {/* 텍스트 컨테이너 */}
            <View className="absolute w-full h-full justify-center items-center">
              <Text className="text-white text-2xl font-bold">{row1}</Text>
              <Text className="text-white text-lg">{row2}</Text>
            </View>
          </ImageBackground>
      ) : (
        // 단색 배경 Material 스타일 배너
          <View className="w-full h-full bg-blue-300 flex-row justify-between items-center p-4 rounded-lg">
            <View>
              <StylizedText type="header1" styleClass="text-white mb-1">{row1}</StylizedText>
              <StylizedText type="header1" styleClass="text-white">{row2}</StylizedText>
            </View>
            {img && <Image source={img} className="ml-4" />}
          </View>
      )}
    </TouchableOpacity>
  );
};

export default BannerSection;
