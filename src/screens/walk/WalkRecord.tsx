import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Calendar from '@components/Calendar';
import { HeaderText } from '@common/StylizedText';
import { SBar } from '@common/BarChart';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import WalkWeeklyRecord from './WalkWeeklyRecord';
const WalkRecord: React.FC = () => {
  // navigation 훅을 사용해 navigation 객체 가져오기
  const navigation = useNavigation();

  // 오늘 날짜 가져오기
  const currentDate = dayjs().format('YYYY.MM.DD');

  return (
    <View className="flex-1 items-center justify-center p-4">
      <HeaderText text="바둑이의 산책 기록" highlight="산책" />
      <Calendar />

      <View className="flex-row justify-between items-center w-full px-4 my-4">
        <Text style={{ color: '#4B5563', fontSize: 14 }}>{currentDate}</Text> 
        <TouchableOpacity onPress={() => navigation.navigate('WalkWeeklyRecord')}>
  <Text style={{ color: '#9CA3AF', fontSize: 14 }}>이번 주 한눈에 보기 &gt;</Text>
</TouchableOpacity>

      </View>

      {/* 일일 상태 표시 차트 */}
      <View className="flex-row flex-wrap justify-around mb-5 mt-5">
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={30} color="#85E0A3" label="일일 산책량" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={50} color="#FFAFA3" label="휴식량" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={90} color="#FFD966" label="걸음 수" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={70} color="#C4A8FF" label="일광 노출량" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={40} color="#80CAFF" label="자외선 노출량" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={80} color="#C09999" label="비타민 D 합성량" />
        </View>
      </View>
    </View>
  );
};

export default WalkRecord;