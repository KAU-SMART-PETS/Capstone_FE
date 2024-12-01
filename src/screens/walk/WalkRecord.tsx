import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Calendar from '@components/Calendar';
import { HeaderText } from '@common/StylizedText';
import { SBar } from '@common/BarChart';
import dayjs from 'dayjs';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchDailyWalkRecord, fetchMonthlyWalkRecord } from '@api/recordApi';

const WalkRecord: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId, petName } = route.params as { petId: string; petName: string }; // Extract petId and petName from route params
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [activeDates, setActiveDates] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState({
    walkingDistance: 0,
    restTime: 0,
    stepCount: 0,
    sunlightExposure: 0,
    uvExposure: 0,
    vitaminSynthesis: 0,
  });


  useEffect(() => {
    const fetchActiveDates = async () => {
      try {
        const year = dayjs(selectedDate).year();
        const month = dayjs(selectedDate).month() + 1; 
        const apiData = await fetchMonthlyWalkRecord(petId, year, month);

        if (apiData?.walkDates) {
          const updatedActiveDates = apiData.walkDates.reduce(
            (acc: { [key: string]: boolean }, date: string) => {
              acc[date] = true;
              return acc;
            },
            {}
          );
          setActiveDates(updatedActiveDates);
        } else {
          Alert.alert('오류', '월간 데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching monthly walk record:', error);
        Alert.alert('오류', '데이터를 가져오는 중 문제가 발생했습니다.');
      }
    };

    fetchActiveDates();
  }, [petId, selectedDate]);


  const handleDateSelect = async (date: string) => {
    setSelectedDate(date);

    try {
      const apiData = await fetchDailyWalkRecord(petId, date);

      if (apiData) {
        console.log('Fetched daily walk record successfully:', apiData);
        setData({
          walkingDistance: apiData.walkingDistancePercent || 0,
          restTime: apiData.restTimePercent || 0,
          stepCount: apiData.stepCountPercent || 0,
          sunlightExposure: apiData.sunlightExposurePercent || 0,
          uvExposure: apiData.uvExposurePercent || 0,
          vitaminSynthesis: apiData.vitaminSynthesisPercent || 0,
        });
      } else {
        Alert.alert('오류', '해당 날짜의 데이터를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching data for selected date:', error);
      Alert.alert('오류', '데이터를 가져오는 중 문제가 발생했습니다.');
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
    
      <HeaderText text={`${petName}의 산책 기록`} highlight="산책" />
      
    
      <Calendar onDateSelect={handleDateSelect} petId={petId} activeDates={activeDates} />

   
      <View className="flex-row justify-between items-center w-full px-4 my-4">
        <Text style={{ color: '#4B5563', fontSize: 14 }}>{dayjs(selectedDate).format('YYYY.MM.DD')}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WalkWeeklyRecord', { date: selectedDate, petId, petName })
          } 
        >
          <Text style={{ color: '#9CA3AF', fontSize: 14 }}>이번 주 한눈에 보기 &gt;</Text>
        </TouchableOpacity>
      </View>

    
      <View className="flex-row flex-wrap justify-around mb-5 mt-5">
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={data.walkingDistance} color="#85E0A3" label="일일 산책량" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={data.restTime} color="#FFAFA3" label="휴식량" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={data.stepCount} color="#FFD966" label="걸음 수" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={data.sunlightExposure} color="#C4A8FF" label="일광 노출량" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={data.uvExposure} color="#80CAFF" label="자외선 노출량" />
        </View>
        <View className="w-1/3 flex items-center mb-4">
          <SBar percentage={data.vitaminSynthesis} color="#C09999" label="비타민 D 합성량" />
        </View>
      </View>
    </View>
  );
};

export default WalkRecord;
