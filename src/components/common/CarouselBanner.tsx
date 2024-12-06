import * as React from "react";
import { Dimensions, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Carousel, { Pagination, ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue, runOnJS } from "react-native-reanimated";

interface CarouselBannerProps {
  banners: Array<{
    imageSource: any; // 로컬 이미지(require) 또는 URL 이미지(string)
    onPressAction: () => void; // 클릭 시 동작
  }>;
}

const CarouselBanner: React.FC<CarouselBannerProps> = ({ banners }) => {
  const width = Dimensions.get("window").width;
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    runOnJS(ref.current?.scrollTo)({ count: index - progress.value, animated: true });
  };

  return (
    <View className="flex-1 bg-transparent items-center justify-center">
      <View>
        <Carousel
          loop
          autoPlay
          autoPlayInterval={2000}
          ref={ref}
          width={width}
          height={width / 2}
          data={banners}
          onProgressChange={progress}
          renderItem={({ index }) => {
            const banner = banners[index]; // 현재 배너 가져오기
            if (!banner) {
              // 방어 코드: undefined 방지
              return <View style={{ width, height: width / 2 }} />;
            }
        
            return (
              <TouchableOpacity
                onPress={banner.onPressAction}
                className="flex-1"
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,1.0)", "rgba(0,0,0,1.0)"]}
                  className="absolute bottom-0 w-full h-full"
                />
                <Image
                  source={
                    typeof banner.imageSource === "string"
                      ? { uri: banner.imageSource }
                      : banner.imageSource
                  }
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          }}
        /> 
      </View>
      <Pagination.Basic
				progress={progress}
				data={banners}
				dotStyle={{
					width: 25,
					height: 5,
					backgroundColor: "#D9D9D9",
          borderRadius: 5,
				}}
				activeDotStyle={{
          width: 25,
					height: 5,
					overflow: "hidden",
					backgroundColor: "#262626",
				}}
				containerStyle={{
					gap: 12,
					marginBottom: 10,
				}}
				horizontal
				onPress={onPressPagination}
			/>
    </View>
  );
};

export default CarouselBanner;
