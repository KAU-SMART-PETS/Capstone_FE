import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import StylizedText, {HeaderText} from '@components/common/StylizedText';
import RoundedBox from '@common/RoundedBox';
import {SBar} from '@common/BarChart';
import {WalkingRecord, Warning} from '@common/Records';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ICWExample: React.FC = () => {
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

        {/* 동물 병원 후기 */}
      <View className="w-full mb-5">
          <RoundedBox
            preset="A"
            isButton={false}
            shadow={true}
            // borderActivate={false}
          >
            {/* 첫 번째 행: 이름 및 별점 */}
            <View className="flex-row justify-between items-center px-4 py-2">
              <StylizedText type="header2" color="text-primary">
                김똑똑
              </StylizedText>
              <View className="flex-row items-center">
                <MCIcon name="star" size={18} color="#FFD700" />
                <Text className="ml-1 text-base">5.0</Text>
              </View>
            </View>

            {/* 두 번째 행: 후기 */}
            <View className="px-4 pb-2">
              <Text className="text-sm text-black">
                수의사 선생님이 아주 친절하세요.
              </Text>
            </View>
          </RoundedBox>
        </View>

      {/* 주의 사항 */}
      <Warning />
      <Warning />
    </ScrollView>
  );
};

export default ICWExample;