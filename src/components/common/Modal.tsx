import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { FadeInDown } from 'react-native-reanimated';
import { RoundedFrame } from './RoundedBox';

interface ModalProps {
  visible?: boolean;
  hideModal?: () => void;
  children: React.ReactNode;
  tapOutsideToClose?: boolean; // 외부 터치 시 닫기 옵션
  position?: 'center' | 'bottom'; // 모달 위치 옵션
}

interface ModalBackgroundProps {
  onPress?: () => void;
  children?: React.ReactNode;
  position?: 'center' | 'bottom'; // 배경 컴포넌트에 모달 위치 추가
}

interface ModalContentProps {
  children?: React.ReactNode;
  preset?: string; // RoundedFrame에 적용할 preset prop
}

// 배경 컴포넌트
const ModalBackground: React.FC<ModalBackgroundProps> = ({ onPress, children, position = 'center' }) => {
  const containerStyle =
    position === 'center' ? 'justify-center items-center' : 'justify-end'; // 중앙 또는 하단 정렬

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className={`flex-1 w-full h-full absolute inset-0 bg-black/60 ${containerStyle}`}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

// 모달 내용 컴포넌트
const ModalContent: React.FC<ModalContentProps> = ({ children, preset }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <RoundedFrame shadow={false} preset={preset}>
        {children}
      </RoundedFrame>
    </Animated.View>
  );
};

// 메인 모달 컴포넌트
export const Modal: React.FC<ModalProps> = ({ visible = false, hideModal, children, tapOutsideToClose = false, position = 'center' }) => {
  if (!visible) return null; // 모달이 보이지 않을 때는 렌더링하지 않음

  // position에 따라 preset 설정
  const preset = position === 'bottom' ? 'E' : 'D';

  return (
    <View className="absolute inset-0 z-10 w-full h-full flex-1">
      <ModalBackground onPress={tapOutsideToClose ? hideModal : undefined} position={position}>
        <ModalContent preset={preset}>
          {children}
        </ModalContent>
      </ModalBackground>
    </View>
  );
};

export default Modal;
