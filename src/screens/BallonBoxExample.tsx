// BalloonBoxExample.tsx
import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import BalloonBox from '@common/BalloonBox';  // BalloonBox 컴포넌트를 가져옵니다.
import StylizedText, {HeaderText} from '@components/common/StylizedText';

const BalloonBoxExample: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white pt-10 px-5">
      {/* @common/BalloonBox : 말풍선 내 텍스트 예제 */}
      <View className="justify-center">
          <BalloonBox>
            <View>
              <StylizedText type="header2" color="text-black">습진이란?</StylizedText>
              <StylizedText type="body1" color="text-black">sample text. sample text. sample text.</StylizedText>
            </View>
            <View>
              <StylizedText type="header2" color="text-black">유의 사항</StylizedText>
              <StylizedText type="body1" color="text-black">sample text. sample text. sample text.</StylizedText>
            </View>
            <View>
              <StylizedText type="header2" color="text-black">좋은 음식</StylizedText>
              <StylizedText type="body1" color="text-black">sample text. sample text. sample text.</StylizedText>
            </View>
            <View>
              <StylizedText type="header2" color="text-black">나쁜 음식</StylizedText>
              <StylizedText type="body1" color="text-black">sample text. sample text. sample text.</StylizedText>
            </View>
          </BalloonBox>
      </View>
    </ScrollView>
  );
};

export default BalloonBoxExample;