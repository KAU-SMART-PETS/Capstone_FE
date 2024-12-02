//자꾸 오류나서 일단 walkweeklyrecord 써둠
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { fetchWeeklyData } from '@api/weeklyDataApi';
import { VBarChart } from '@components/common/BarChart';
import Loading from '@components/common/Loading';
import { HeaderText } from '@components/common/StylizedText';
import { WeeklySummaryProps, WeeklyDataType, Metrics } from '@types';
import { BarGroupColor } from '@components/common/ColorMap';
import { RoundedFrame } from '@components/common/RoundedBox';

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ petId = 1 }) => {
  const [weeklyData, setWeeklyData] = useState<WeeklyDataType[] | null>(null);
  const [petName, setPetName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const getData = async () => {
      setLoading(true); // 로딩 상태 시작
      try {
        // const petData = await fetchPetInfo(petId); // petId로 반려동물 정보 가져오기
        // setPetName(petData.name); // 반려동물 이름 저장
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
      <RoundedFrame preset="A" className="my-3 w-full px-2" shadow={true}>
        <Text className="px-6 mb-4 text-md font-black text-black">{displayNameMap[dataKey]}</Text>
        <View className="flex-row justify-between px-6">
          {weeklyData &&
            weeklyData.map((entry, index) => {
              const value = entry.metrics[dataKey];
              const color = BarGroupColor[dataKey];
              return (
                <VBarChart
                  key={index}
                  date={entry.date}
                  percentage={value}
                  color={color}
                />
              );
            })}
          </View>
      </RoundedFrame>
    );
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <View className="px-4">
        <HeaderText
          text={`${petName}의 일주일은 어땠을까요?`}  // petName 사용
          highlight={petName || ''}                // 강조할 부분
        />
        {(['walk', 'rest', 'steps', 'sunlight', 'uvExposure', 'vitaminD'] as Array<keyof Metrics>).map((dataKey) => (
          <View key={dataKey} className="mb-4">{renderWeeklyBarChart(dataKey)}</View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WeeklySummary;
