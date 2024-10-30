import React from 'react';
import { View, Text, Image, ImageBackground, ImageSourcePropType, TouchableOpacity, Dimensions } from 'react-native';
import StylizedText from '@common/StylizedText';
import LinearGradient from 'react-native-linear-gradient';

// const { width: screenWidth } = Dimensions.get('window');

const BANNER_TYPES = {
  SOLID: 'solid',
  OVERLAY: 'overlay',
} as const;

type BannerType = typeof BANNER_TYPES[keyof typeof BANNER_TYPES];

interface BannerProps {
  row1: string;
  row2: string;
  sideImg?: ImageSourcePropType;
  background?: ImageSourcePropType | string;
  type?: BannerType;
  height?: 'h-32' | 'h-36' | 'h-40' | 'h-48';
  onPress?: () => void;
}

export const BannerSection: React.FC<BannerProps> = ({ 
  row1, 
  row2, 
  sideImg, 
  background = 'darkgreen', 
  height = 'h-40',
  type = BANNER_TYPES.SOLID, 
  onPress 
}) => {
  const renderOverlayBanner = () => (
    <ImageBackground 
      source={typeof background === 'string' ? { uri: background } : background} 
      className={`w-full ${height} overflow-hidden flex`}
    >
      <LinearGradient
        className='absolute w-full h-full'
        colors={['rgba(33, 150, 243, 0.5)', 'rgba(3, 169, 244, 0.3)', 'rgba(255, 255, 255, 0.2)']}
      />
      <BannerText height={height} row1={row1} row2={row2} />
    </ImageBackground>
  );

  const renderSolidBanner = () => (
    <View className={`w-full ${height} flex-row justify-between items-center p-4 ${typeof background === 'string' ? `bg-${background}` : ''}`}>
      <BannerText height={height} row1={row1} row2={row2} />
      {sideImg && <Image source={sideImg} className="ml-4" />}
    </View>
  );

  return (
    <TouchableOpacity onPress={onPress} className='flex-1 w-screen'>
      {type === BANNER_TYPES.OVERLAY && background ? renderOverlayBanner() : renderSolidBanner()}
    </TouchableOpacity>
  );
};

const BannerText: React.FC<{ height: string; row1: string; row2: string }> = ({ height, row1, row2 }) => (
  <View className={`${height} justify-center items-start ml-6`}>
    <StylizedText type="header1" styleClass="text-white mb-1">{row1}</StylizedText>
    <StylizedText type="header1" styleClass="text-white">{row2}</StylizedText>
  </View>
);

export default BannerSection;
