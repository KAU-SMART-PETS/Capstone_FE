import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import StylizedText, {HeaderText} from '@components/common/StylizedText';
import {SBar} from '@common/BarChart';
import {WalkingRecord, Warning} from '@common/Records';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// IMPORTANT
// TODO : 이거에 예전 혜인님이 작업하신 부분 더 넣어야함 (이전 커밋에 있음)

const RecordExample: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white pt-10 px-5">
      {/* Header 부분 */}
      <HeaderText
      text={"똑똑님, 달성한 리워드를 확인해 주세요."}  // petName 사용
      highlight={'똑똑'}                // 강조할 부분
      />
      {/* 오늘의 산책 기록 */}
      <WalkingRecord
      walkDate="2024.05.20 18:01 - 2024.05.20 19:01"
      walkTime="00:14:23"
      distance="0.5km"
      calories="-"
      steps="-"
      />

      {/*원형 차트*/}
      <View className="flex-row justify-around mb-5">
        <SBar percentage={30} color="#D1FAE5" label="일일 산책량" />
        <SBar percentage={50} color="#FEB2B2" label="휴식량" />
        <SBar percentage={90} color="#FFD966" label="걸음 수" />
      </View>

      {/* 주의 사항 */}
      <Warning />
      <Warning />
    </ScrollView>
  );
};

export default RecordExample;