import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { fetchWeeklyData } from '@api/weeklyDataApi'; // 주간 데이터 가져오기
import { fetchPetInfo } from '@api/petApi'; // 반려동물 정보 가져오기
import BarChart from '@components/common/BarChart';
import Loading from '@components/common/Loading';
import { HeaderText } from '@components/common/StylizedText';

// Props 인터페이스 정의
interface WeeklySummaryProps {
  petId: number; // petId를 prop으로 받아옴
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ petId = 1 }) => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData[] | null>(null);
  const [petName, setPetName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const getData = async () => {
      setLoading(true); // 로딩 상태 시작
      try {
        const petData = await fetchPetInfo(petId); // petId로 반려동물 정보 가져오기
        setPetName(petData.name); // 반려동물 이름 저장

        const data = await fetchWeeklyData(petId); // petId로 주간 데이터 가져오기
        setWeeklyData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    getData();
  }, [petId]);

  if (loading) {
    return <Loading />; // 로딩 중이면 로딩 컴포넌트 반환
  }

  const renderWeeklyBarChart = (dataKey: keyof Metrics) => {
    const displayNameMap: Record<string, string> = {
      walk: '일일 산책량',
      rest: '휴식량',
      steps: '걸음수',
      sunlight: '일광 노출량',
      uvExposure: '자외선 노출량',
      vitaminD: '비타민 D 합성량',
    };

    return (
      <View className="w-full my-3">
        <View className="py-6 bg-white border border-gray-200 rounded-3xl shadow-lg">
          <Text className="px-8 mb-4 text-md font-black text-black">{displayNameMap[dataKey]}</Text>
          <View className="flex-row justify-between px-8">
            {weeklyData &&
              weeklyData.map((entry, index) => {
                const value = entry.metrics[dataKey];
                const color = colorMap[dataKey];
                return (
                  <BarChart
                    key={index}
                    date={entry.date}
                    percentage={value}
                    color={color}
                  />
                );
              })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <HeaderText
        text={`${petName}의 일주일은 어땠을까요?`}  // petName 사용
        highlight={petName}                // 강조할 부분
      />
      {(['walk', 'rest', 'steps', 'sunlight', 'uvExposure', 'vitaminD'] as Array<keyof Metrics>).map((dataKey) => (
        <View key={dataKey}>{renderWeeklyBarChart(dataKey)}</View>
      ))}
    </ScrollView>
  );
};

// Metric interface definition
interface Metrics {
  walk: number;
  rest: number;
  steps: number;
  sunlight: number;
  uvExposure: number;
  vitaminD: number;
}

interface WeeklyData {
  date: string;
  metrics: Metrics;
}

// Color map definition
const colorMap: { [key in keyof Metrics]: string } = {
  walk: 'green', // Green
  rest: 'red', // Red
  steps: 'yellow', // Yellow
  sunlight: 'purple', // Purple
  uvExposure: 'blue', // Blue
  vitaminD: '#FFB74D', // Orange
};

export default WeeklySummary;
