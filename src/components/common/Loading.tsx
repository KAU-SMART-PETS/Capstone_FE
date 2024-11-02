// CustomLoadingIndicator.tsx

import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const Loading = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 0부터 1까지의 값으로 회전 애니메이션을 무한 반복합니다.
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animationValue]);

  // 시계 모양 칸들의 회전 각도를 설정합니다.
  const rotateInterpolate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // 각 점의 색상과 크기를 설정합니다.
  const renderDot = (index: number) => {
    const activeOpacity = animationValue.interpolate({
      inputRange: [
        index / 8, 
        (index + 1) / 8, 
        (index + 2) / 8
      ],
      outputRange: [0.2, 1, 0.2],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.dot,
          {
            opacity: activeOpacity,
            transform: [{ rotate: `${index * 45}deg` }],
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.loader,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      >
        {Array.from({ length: 8 }).map((_, index) => renderDot(index))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  loader: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    left: 32,
  },
});

export default Loading;
