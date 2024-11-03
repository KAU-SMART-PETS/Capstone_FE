import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import ColorMap from './ColorMap';
import StylizedText from './StylizedText';

const CenterContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // absolute center에 위치하게 함.
  return (
    <View className='absolute h-screen w-screen flex items-center justify-center -mt-8'>
      {children}
    </View>
  );
}

export const Spinner: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500, // 회전 속도 설정 (밀리초)
        useNativeDriver: true,
      })
    );

    spinAnimation.start();
    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <CenterContainer>
      <View className='-mt-8'>
        <Animated.View style={[{ transform: [{ rotate: spin }] }]}>
          <ActivityIndicator animating={true} size="large" color={ColorMap['secondary']} />
        </Animated.View>
        <StylizedText type='label3' styleClass='mt-3 text-secondary'>
          잠시만 기다려 주세요
        </StylizedText>
      </View>
    </CenterContainer>
  );
};

export const ProgressDots: React.FC = () => {
  const DOT_COUNT = 8;                // 전체 점의 개수
  const DARK_DOTS = 3;                // 동시에 활성화될 점의 수
  const ANIMATION_DURATION = 100;     // 각 점이 어두워졌다가 밝아지는 시간
  const animatedValues = useRef(Array.from({ length: DOT_COUNT }, () => new Animated.Value(0))).current;
  const activeIndex = useRef(0);      // 현재 활성화된 첫 번째 점의 인덱스

  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < DOT_COUNT; i++) {
        const index = (activeIndex.current + i) % DOT_COUNT;
        
        if (i < DARK_DOTS) {
          animatedValues[index].setValue(1); // 어두운 색 유지
        } else {
          animatedValues[index].setValue(0); // 밝은 색 유지
        }
      }

      activeIndex.current = (activeIndex.current + 1) % DOT_COUNT;
    }, ANIMATION_DURATION * 1.8); // NOTE : 도트스피너 속도 조절하려면 이 지연시간을 줄이면 됨! (곱하는 숫자를 작게)

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 클리어
  }, [animatedValues]);

  const renderDots = () => {
    return Array.from({ length: DOT_COUNT }).map((_, index) => {
      const animatedColor = animatedValues[index].interpolate({
        inputRange: [0, 1],
        outputRange: ['#D1D5DB', '#374151'], // 밝은 색에서 어두운 색으로
      });

      return (
        <Animated.View
          key={index}
          className='absolute w-4 h-8 rounded-3xl'
          style={[
            {
              backgroundColor: animatedColor,
              transform: [
                { rotate: `${(index * 360) / DOT_COUNT}deg` },
                { translateY: 45 }, // 점을 원 밖으로 이동
              ],
            },
          ]}
        />
      );
    });
  };

  return (
    <CenterContainer>
      {renderDots()}
    </CenterContainer>
  );
};
