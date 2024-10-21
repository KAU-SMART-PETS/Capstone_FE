import React from 'react';
import { View, TouchableWithoutFeedback, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import { FadeInDown } from 'react-native-reanimated';
import { RoundedFrame } from './RoundedBox';

interface ModalProps {
  visible?: boolean;
  hideModal?: () => void;
  children: React.ReactNode;
  tapOutsideToClose?: boolean; // 외부 터치 시 닫기 옵션
}

const Modal: React.FC<ModalProps> = ({ visible = false, hideModal, children, tapOutsideToClose = false }) => {
  if (!visible) return null; // 모달이 보이지 않을 때는 렌더링하지 않음

  return (
    <View className="absolute inset-0 z-10 w-full h-full flex-1">
      <TouchableWithoutFeedback onPress={tapOutsideToClose ? hideModal : undefined}>
        <View className="flex-1 w-full h-full absolute inset-0 bg-black/60 justify-center items-center">
          <Animated.View entering={FadeInDown.duration(500)}>
            <RoundedFrame shadow={false} preset="D">
              {children}
            </RoundedFrame>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Modal;
