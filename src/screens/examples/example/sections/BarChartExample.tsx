import React from 'react';
import { View, ScrollView } from 'react-native';
import { VBarChart, HBarChart, SBar } from '@common/BarChart';
import { HeaderText } from '@components/common/StylizedText';

// TODO : 좀더 예제 조정해야함. (주간데이터 세로막대 박스 안에 모아놓기, 가로막대는 중간에 기준점 잡는거 다듬기, .. 등)

const BarChartExample: React.FC = () => {
  const petName = "반려동물";

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <View className="px-4">
        <HeaderText text={`${petName}의 일주일 활동량`} highlight={petName} />

        {/* 세로 막대 차트 예제 */}
        <View className="my-4">
          <VBarChart
            date="2024-11-03"
            percentage={75}
            color="#4CAF50"
            labels={["2024-11-03"]}  // 날짜 레이블
          />
        </View>

        {/* 가로 막대 차트 예제 */}
        <View className="my-4">
          <HBarChart
            date="2024-11-03"
            percentage={50}
            color="#2196F3"
            labels={["0 걸음", "현재 1500 걸음", "3000 걸음"]}  // 시작, 현재, 최대값 레이블
          />
        </View>

        {/* 반원형 차트 예제 */}
        <View className="my-4">
          <SBar
            percentage={85}
            color="#FF9800"
            label="비타민 D 합성량"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default BarChartExample;
