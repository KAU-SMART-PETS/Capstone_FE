// BalloonBoxExample.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import BalloonBox from '@common/BalloonBox';
import StylizedText from '@components/common/StylizedText';

const sections = [
  { title: "습진이란?", content: "sample text. sample text. sample text." },
  { title: "유의 사항", content: "sample text. sample text. sample text." },
  { title: "좋은 음식", content: "sample text. sample text. sample text." },
  { title: "나쁜 음식", content: "sample text. sample text. sample text." }
];

const BalloonBoxExample: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white pt-10 px-5">
      {/* @common/BalloonBox : 말풍선 내 텍스트 예제 */}
      <View className="justify-center">
        <BalloonBox>
          {sections.map((section, index) => (
            <View key={index}>
              <StylizedText type="header2" styleClass="text-black">{section.title}</StylizedText>
              <StylizedText type="body1" styleClass="text-black">{section.content}</StylizedText>
            </View>
          ))}
        </BalloonBox>
      </View>
    </ScrollView>
  );
};

export default BalloonBoxExample;
