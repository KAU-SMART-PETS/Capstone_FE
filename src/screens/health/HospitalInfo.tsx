import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchHospitalInfo } from '@src/api/hospitalApi';
import KakaoMap from './kakaoMap';
import StylizedText from '@src/components/common/StylizedText';


const HospitalInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { vetId, latitude, longitude } = route.params;
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const loadHospitalInfo = async () => {
      try {
        const hospitalData = await fetchHospitalInfo(vetId, latitude, longitude); // API 호출
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
        <StylizedText type='body1'>Loading...</StylizedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity onPress={handleBackButton} className="p-2">
        <Text className="text-2xl text-gray-500">{'<'}</Text>
      </TouchableOpacity>
      <View className="p-5">
        <StylizedText type="header1">{hospital.name}</StylizedText>

        <View className="bg-white border-b-4 border-gray-100 p-5">
          <View className="flex-row items-center mb-2.5">
            <Image
              source={require('@image/icon/phoneVector.png')}
              className="w-[30px] h-[30px] mr-2.5"
            />
            <StylizedText type="header2">{hospital.telephone}</StylizedText>
          </View>
          <View className="flex-row items-center mb-2.5 mr-5">
            <Image
              source={require('@image/icon/locationVector.png')}
              className="w-[30px] h-[30px] mr-2.5"
            />
            <StylizedText type="header2">{hospital.address}</StylizedText>
          </View>
          <View className="flex-row items-center mb-2.5">
            <Image
              source={require('@image/icon/locationVector.png')}
              className="w-[30px] h-[30px] mr-2.5"
            />
            <StylizedText type="header2">
              {Math.floor(hospital.vetToMemberDistance)} m
            </StylizedText>
          </View>
        </View>
      </View>
      <View className="flex-1 m-5 rounded-lg overflow-hidden border border-gray-300">
        <KakaoMap latitude={hospital.latitude} longitude={hospital.longitude} />
      </View>
    </SafeAreaView>
  );
};

export default HospitalInfo;