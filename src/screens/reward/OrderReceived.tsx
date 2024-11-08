import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback, BackHandler } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import Avatar from '@components/common/Avatar';
import StylizedText from '@components/common/StylizedText';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';

type OrderReceivedParams = {
  product: string; // "사료" 또는 "사료 샘플"
};

const OrderReceived: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product = '사료' } = route.params as OrderReceivedParams; // 전달받은 제품 정보

  const handleClose = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleClose();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View className="flex-1 justify-center items-center bg-white">
        <Animated.View
          entering={FadeInUp.duration(500).delay(300)}
          exiting={FadeOut.duration(300)}
          className="items-center"
        >
          <Avatar
            source={require('@image/icon/truck.png')}
            size={40}
          />
          <StylizedText type="header2" styleClass="text-center text-black mt-4">
            {product}(이)가 접수됐어요.{"\n"}곧 만나요!
          </StylizedText>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OrderReceived;
