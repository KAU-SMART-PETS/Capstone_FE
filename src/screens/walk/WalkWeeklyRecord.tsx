//최종 사용
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { VBarChart } from '@common/BarChart';
import { HeaderText } from '@common/StylizedText';
import RoundedBox from '@common/RoundedBox';
import { fetchWeeklyWalkRecord } from '@api/recordApi';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

interface WeeklySummary {
  label: string;
  color: string;
  percentages: number[]; 
}

const WalkWeeklyRecord: React.FC = () => {
  const route = useRoute();
  const { date, petId, petName } = route.params as { date: string; petId: string; petName: string }; 
  const [weeklyData, setWeeklyData] = useState<WeeklySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWeeklyWalkRecord(petId, date); 
        if (response && response.dailySummaries) {
          const dailySummaries = response.dailySummaries;

        
          const transformedData: WeeklySummary[] = [
            {
              label: '일일 산책량',
              color: '#85E0A3',
              percentages: dailySummaries.map((day: any) => day.walkingDistancePercent),
            },
            {
              label: '휴식량',
              color: '#FFAFA3',
              percentages: dailySummaries.map((day: any) => day.restTimePercent),
            },
            {
              label: '걸음 수',
              color: '#FFD966',
              percentages: dailySummaries.map((day: any) => day.stepCountPercent),
            },
            {
              label: '일광 노출량',
              color: '#C4A8FF',
              percentages: dailySummaries.map((day: any) => day.sunlightExposurePercent),
            },
            {
              label: '자외선 노출량',
              color: '#80CAFF',
              percentages: dailySummaries.map((day: any) => day.uvExposurePercent),
            },
            {
              label: '비타민 D 합성량',
              color: '#C09999',
              percentages: dailySummaries.map((day: any) => day.vitaminSynthesisPercent),
            },
          ];

          setWeeklyData(transformedData);
        } else {
          Alert.alert('오류', '주간 데이터를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching weekly walk record:', error);
        Alert.alert('오류', '데이터를 가져오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [petId, date]); 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>데이터 로드 중...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
  
      <HeaderText text={`${petName}의 일주일은 어땠을까요?`} highlight={petName} />
      
      {weeklyData.map((item, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <RoundedBox preset="A" shadow={true}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginLeft: 10 }}>
              {item.label}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {item.percentages.map((percentage, dayIndex) => {
                return (
                  <View key={dayIndex} style={{ alignItems: 'center' }}>
                    <VBarChart
                      date={`Day ${dayIndex + 1}`}
                      percentage={percentage}
                      color={item.color}
                    />
                    <Text style={{ fontSize: 12, color: '#666', fontWeight: 'bold' }}>
                      {dayjs(date).subtract(6 - dayIndex, 'day').format('M/D')}
                    </Text>
                  </View>
                );
              })}
            </View>
          </RoundedBox>
        </View>
      ))}
    </ScrollView>
  );
};

export default WalkWeeklyRecord;
