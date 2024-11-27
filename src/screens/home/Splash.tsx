import React, { useEffect, useRef } from "react";
import { View, Platform } from "react-native";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Lottie 파일 import
import LottieSplashAndroid from "@assets/lottie/BootSplash_Android.json";
import LottieSplashIOS from "@assets/lottie/BootSplash_iOS.json";

// SplashScreenProps 정의
interface SplashScreenProps {
  duration?: number; // 속도 조절을 위한 duration 파라미터 (ms 단위)
  onFinish: () => void; // 애니메이션이 끝났을 때 호출될 콜백
}

const Splash: React.FC<SplashScreenProps> = ({ duration = 5000, onFinish }) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // 애니메이션이 끝난 뒤 부모 컴포넌트의 onFinish 호출
    const timeout = setTimeout(() => {
      onFinish(); // 애니메이션 종료 후 콜백 호출
    }, duration + 300); // 애니메이션 시간(duration) + 300ms 지연
    return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 정리
  }, [duration, onFinish]);

  // 플랫폼별 Lottie 파일 선택
  const lottieSource = Platform.OS === "ios" ? LottieSplashIOS : LottieSplashAndroid;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* LottieView 애니메이션 */}
        <LottieView
          ref={animationRef}
          source={lottieSource} // 플랫폼에 따라 다른 파일 사용
          autoPlay
          loop={false} // 반복 금지
          style={{ width: "100%", height: "100%" }} // 애니메이션 크기
          resizeMode="cover" // 크기 조정 모드 (cover, contain, center 등)
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
