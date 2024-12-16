// Modal.tsx
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation as useReactNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { Portal } from 'react-native-paper';
import RoundedBox, { DesignPreset } from '@common/RoundedBox';

interface ModalProps {
  visible?: boolean;
  hideModal?: () => void;
  children: React.ReactNode;
  tapOutsideToClose?: boolean; // 외부 터치 시 닫기 옵션
  position?: 'center' | 'bottom'; // 모달 위치 옵션
  transparent?: boolean;
}

interface ModalBackgroundProps {
  onPress?: () => void;
  children?: React.ReactNode;
  position?: 'center' | 'bottom'; // 배경 컴포넌트에 모달 위치 추가
  transparent?: boolean;
}

interface ModalContentProps {
  children?: React.ReactNode;
  preset?: DesignPreset; // RoundedBox에 적용할 preset prop
}

// 배경 컴포넌트
const ModalBackground: React.FC<ModalBackgroundProps> = ({ onPress, children, position = 'center', transparent = false }) => {
  const containerStyle =
    position === 'center' ? 'justify-center items-center' : 'justify-end items-center'; // 중앙 또는 하단 정렬

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        className={`flex-1 w-full h-full absolute inset-0 ${
          !transparent ? 'bg-black/60' : 'bg-transparent'
        } ${containerStyle}`}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

// 모달 내용 컴포넌트
const ModalContent: React.FC<ModalContentProps> = ({ children, preset }) => {
  return (
    <Animated.View exiting={FadeOutUp.duration(250)}>
      <RoundedBox shadow={false} preset={preset}>
        {children}
      </RoundedBox>
    </Animated.View>
  );
};

// 메인 모달 컴포넌트
export const Modal: React.FC<ModalProps> = ({
  visible = false,
  hideModal,
  children,
  tapOutsideToClose = false,
  position = 'center',
  transparent = false,
}) => {
  const navigation = useReactNavigation();
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    } else {
      // 100ms 후에 모달을 언마운트
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  useEffect(() => {
    if (!isVisible) return;

    // 네비게이션 이벤트 리스너 추가
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // 모달이 열려있는 상태에서 네비게이션이 발생하면 모달을 닫음
      if (hideModal) {
        hideModal();
        // 네비게이션을 취소
        e.preventDefault();
      }
    });

    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      unsubscribe();
    };
  }, [navigation, isVisible, hideModal]);

  if (!isVisible) return null; // 모달이 보이지 않을 때는 렌더링하지 않음

  // position에 따라 preset 설정
  const preset = position === 'bottom' ? 'modalB' : 'modalC';

  return (
    <Portal>
      <View className="absolute inset-0 z-10 w-full h-full flex-1">
        <ModalBackground
          onPress={tapOutsideToClose ? hideModal : undefined}
          position={position}
          transparent={transparent}
        >
          <ModalContent preset={preset}>{children}</ModalContent>
        </ModalBackground>
      </View>
    </Portal>
  );
};

export default Modal;
