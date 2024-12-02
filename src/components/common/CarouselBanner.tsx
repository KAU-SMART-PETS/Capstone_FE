import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient'; // 그라데이션 효과
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

interface CarouselBannerProps {
  banners: Array<{
    imageUri: string;
    onPressAction: () => void; // 클릭 시 동작
  }>;
}

const CarouselBanner: React.FC<CarouselBannerProps> = ({ banners }) => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0); // 활성화된 페이지
  const carouselRef = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      index, // 해당 인덱스로 이동
      animated: true,
    });
    setActiveIndex(index); // 클릭한 인덱스를 상태로 업데이트
  };

  return (
    <View className="flex-1 bg-transparent items-center justify-center">
      <View>
        <Carousel
          ref={carouselRef} // ref 연결
          loop
          width={width}
          height={200}
          autoPlay
          autoPlayInterval={3000}
          scrollAnimationDuration={1000}
          data={banners}
          onSnapToItem={(index) => setActiveIndex(index)} // 현재 페이지 인덱스 업데이트
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item.onPressAction}
              className="flex-1"
            >
              <LinearGradient
                colors={['rgba(0,0,0,1.0)', 'rgba(0,0,0,1.0)']}
                className="absolute bottom-0 w-full h-full"
              />
              <Image
                source={{ uri: item.imageUri }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* 페이지네이션 */}
      <View className="flex-row space-x-2 mb-4">
        {banners.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPressPagination(index)} // 버튼 클릭 시 상태 변경
          >
            <View
              className={`w-8 h-[5px] rounded ${
                index === activeIndex ? 'bg-black/80' : 'bg-black/20'
              }`}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CarouselBanner;
