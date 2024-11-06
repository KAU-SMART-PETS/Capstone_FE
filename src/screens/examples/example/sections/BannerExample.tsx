import React from 'react';
import { View } from 'react-native';
import { BannerSection } from '@components/common/BannerSection';
import dog1 from '@image/placeholder/dog2.jpg';
import WalkingdogIcon from '@image/icon/walkingDogIcon.png'

// 배너 2종류 (단색배경, 사진배경) - 현재는 단색배너만 쓰이는 듯
const SolidBannerExample: React.FC = () => {
  //  단색 배경 배너 
   return (
   <View className="flex-col bg-white">
      <BannerSection
      row1="오늘도 즐겁게"
      row2="산책을 시작해볼까요?"
      sideImg={WalkingdogIcon}
      onPress={() => console.log("Solid Banner Clicked")}
      />
    </View>
   );
};

const PhotoBannerExample: React.FC = () => {
  //  단색 배경 배너 
   return (
   <View className="flex-col bg-white">
      <BannerSection
        row1="환상적인 여정"
        row2="지금 바로 떠나보세요"
        background={dog1}
        type="overlay"
        onPress={() => console.log("Overlay Banner Clicked")}
      />
    </View>
   );
};

const BannerExample: React.FC<RootStackParamList> = () => {
  return (
    <View className="p-2"> 
        <SolidBannerExample />
        <PhotoBannerExample />
    </View>
  );
}

export default BannerExample;