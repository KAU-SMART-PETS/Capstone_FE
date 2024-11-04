import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import Avatar from '@components/common/Avatar';
import StylizedText from '@components/common/StylizedText';
import { useNavigation } from '@react-navigation/native';

const OrderReceived: React.FC = () => {
  const navigation = useNavigation();
  // TODO : 이전 페이지로부터 샘플 결제 완료인지 일반 사료 결제 완료인지 넘겨받아서 텍스트 변경
  // TODO : 현재는 화면 터치 시 이전 페이지로 이동. 차후 Home 페이지로 이동하도록 수정 예정.
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View className="flex-1 justify-center items-center bg-white">
        {/* 트럭 아이콘과 텍스트 애니메이션 뷰 */}
        <Animated.View entering={FadeInUp.duration(500)} exiting={FadeOut.duration(300)} className="items-center">
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
