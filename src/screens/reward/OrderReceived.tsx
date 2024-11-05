import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback, BackHandler } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import Avatar from '@components/common/Avatar';
import StylizedText from '@components/common/StylizedText';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const OrderReceived: React.FC = () => {
  const navigation = useNavigation();
  //TODO : 텍스트 변경
  // Home 페이지로 이동하면서 네비게이션 스택을 초기화하는 함수
  const handleClose = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  // 뒤로가기 버튼 커스텀 동작 설정
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleClose();
        return true; // 기본 뒤로가기 동작 막기
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View className="flex-1 justify-center items-center bg-white">
        {/* 트럭 아이콘과 텍스트 애니메이션 뷰 */}
        <Animated.View
          entering={FadeInUp.duration(500).delay(300)} // 시작을 300ms 지연
          exiting={FadeOut.duration(300)}
          className="items-center"
        >
          <Avatar
            source={require('@image/icon/truck.png')}
            size={40}
          />
          <StylizedText type="header2" styleClass="text-center text-black mt-4">
            사료 샘플이 접수됐어요.{"\n"}곧 만나요!
          </StylizedText>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OrderReceived;
