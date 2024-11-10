// HospitalInfo.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchHospitalInfo } from '@src/api/hospitalApi';
import KakaoMap from './kakaoMap';
import StylizedText from '@common/StylizedText';
import { HospitalRecord } from '@components/Records';

const HospitalInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { vetId, latitude, longitude } = route.params;
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const loadHospitalInfo = async () => {
      try {
        const hospitalData = await fetchHospitalInfo(vetId, latitude, longitude);
        setHospital(hospitalData);
      } catch (error) {
        console.error('Error fetching hospital info:', error);
      }
    };

    loadHospitalInfo();
  }, [vetId, latitude, longitude]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  if (!hospital) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StylizedText type="body1">Loading...</StylizedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 뒤로 가기 버튼 */}
      <TouchableOpacity onPress={handleBackButton} className="p-2">
        <Text className="text-2xl text-gray-500">{'<'}</Text>
      </TouchableOpacity>

      {/* 병원 정보 표시 */}
      <View className="p-5">
        <HospitalRecord
          name={hospital.name}
          address={hospital.address}
          telephone={hospital.telephone}
          distance={Math.floor(hospital.vetToMemberDistance)} // 거리 정보 추가
        />
      </View>

      {/* 지도 표시 */}
      <View className="flex-1 m-5 rounded-lg overflow-hidden border border-gray-300">
        <KakaoMap latitude={hospital.latitude} longitude={hospital.longitude} />
      </View>
    </SafeAreaView>
  );
};

export default HospitalInfo;
