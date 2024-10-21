import React, { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import { SystemBars } from "react-native-bars";
import { ColorMap } from "@components/common/ColorMap";
import bootSplashLogo from "@image/bootsplash/bootsplash_logo.png";

// SplashScreenProps 정의 (duration 추가)
interface SplashScreenProps {
  duration?: number; // 속도 조절을 위한 duration 파라미터 (ms 단위)
  onFinish: () => void; // 애니메이션이 끝났을 때 호출될 콜백
}

const Splash: React.FC<SplashScreenProps> = ({ duration = 450, onFinish }) => {
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState<boolean>(false);

  // Animated values
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(100)).current;
  const backgroundColor = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (bootSplashLogoIsLoaded) {
      Animated.parallel([
        Animated.timing(translateY, {
          useNativeDriver: true,
          toValue: -30, // Move up
          duration: duration,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(opacity, {
          useNativeDriver: true,
          toValue: 1,
          duration: duration,
          delay: 200,
        }),
        Animated.timing(backgroundColor, {
          useNativeDriver: false,
          toValue: 1,
          duration: duration,
        }),
      ]).start(() => {
        setTimeout(() => {
          onFinish(); // 애니메이션 끝나면 부모 컴포넌트의 onFinish 콜백 호출
        }, 300);
      });
    }
  }, [bootSplashLogoIsLoaded, duration, onFinish]);

  // Interpolated background color
  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [ColorMap["primary"], ColorMap["white"]],
  });

  return (
    <Animated.View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: interpolatedBackgroundColor }}
    >
      <SystemBars barStyle="dark-content" />
      <Animated.Text
        className="absolute bottom-6 text-2xl my-5 leading-8 text-black text-center"
        style={{ opacity }}
      >
        BRAND NAME
      </Animated.Text>
      <Animated.View
        style={{ transform: [{ translateY }] }}
        className="absolute inset-0 flex-1 justify-center items-center"
      >
        <Animated.Image
          source={bootSplashLogo}
          fadeDuration={500}
          resizeMode="contain"
          onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
          className="h-[140px] w-[170px]"
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Splash;
