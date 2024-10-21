import React, { useCallback } from "react";
import { Animated, Easing } from "react-native";
import { SystemBars } from "react-native-bars";
import { useNavigation } from "@react-navigation/native";
import { ColorMap } from "@components/common/ColorMap";
import * as BootSplash from "react-native-smooth-bootsplash";
import bootSplashLogo from "@image/bootsplash/bootsplash_logo.png";

// SplashScreenProps 정의 (duration 추가)
interface SplashScreenProps {
  duration?: number; // 속도 조절을 위한 duration 파라미터 (ms 단위)
}

const Splash: React.FC<SplashScreenProps> = ({ duration = 450 }) => { // 기본값 600ms
  const navigation = useNavigation<any>();

  const [bootSplashIsVisible, setBootSplashIsVisible] = React.useState<boolean>(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = React.useState<boolean>(false);

  // Animated values
  const opacity = React.useRef(new Animated.Value(0)).current; // For brand name opacity
  const translateY = React.useRef(new Animated.Value(100)).current; // For logo bouncing
  const backgroundColor = React.useRef(new Animated.Value(0)).current; // For background color

  const init = useCallback(async () => {
    try {
      await BootSplash.hide();

      // Start the animations
      Animated.parallel([
        Animated.timing(translateY, {
          useNativeDriver: true,
          toValue: -30, // Move up
          duration: duration, // Duration from props
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(opacity, {
          useNativeDriver: true,
          toValue: 1, // Fully visible
          duration: duration, // Duration from props
          delay: 200, // Delay for logo animation
        }),
        Animated.timing(backgroundColor, {
          useNativeDriver: false,
          toValue: 1,
          duration: duration, // Duration from props
        }),
      ]).start(() => {
        // Navigate to TestingPage after the animation finishes
        setTimeout(() => {
          setBootSplashIsVisible(false);
          navigation.navigate('TestingPage');
        }, 300); // Delay before navigating for a smooth transition
      });
    } catch (error) {
      console.error(error);
      setBootSplashIsVisible(false);
      navigation.navigate('TestingPage');
    }
  }, [navigation, opacity, translateY, backgroundColor, duration]);

  React.useEffect(() => {
    if (bootSplashLogoIsLoaded) {
      init(); // Start the splash screen logic when logo is loaded
    }
  }, [bootSplashLogoIsLoaded, init]);

  // Interpolated background color
  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [ColorMap['primary'], ColorMap['white']], // Start with the initial color, transition to white
  });

  return (
    <Animated.View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: interpolatedBackgroundColor }} // Background color change
    >
      <SystemBars barStyle="dark-content" />

      <Animated.Text className="absolute bottom-6 text-2xl my-5 leading-8 text-black text-center" style={{ opacity }}>
        BRAND NAME
      </Animated.Text>

      {bootSplashIsVisible && (
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="absolute inset-0 flex-1 justify-center items-center"
        >
          <Animated.Image
            source={bootSplashLogo}
            fadeDuration={500}
            resizeMode="contain"
            onLoadEnd={() => {
              setBootSplashLogoIsLoaded(true);
              init(); // 로고가 로드되면 즉시 init 함수 호출
            }}
            className="h-[140px] w-[170px]"
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default Splash;