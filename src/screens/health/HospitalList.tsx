import React, { useEffect, useState } from 'react';
import config from '@constants/config';
import {  View, FlatList, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchHospitals } from '@src/api/hospitalApi';
import Geolocation from '@react-native-community/geolocation';
import { VeterinaryCard } from '@src/components/FlatListCards';
import StylizedText from '@common/StylizedText';
import HeaderBar from '@src/components/HeaderBar';

const HospitalCard = ({ item, onPress }) => (
    <VeterinaryCard 
    title={item.name} 
    contact={item.telephone}
    address={item.address}
    onPress={onPress} 
    />
);

const FindHospital = () => {
  const navigation = useNavigation();
  const [hospitalData, setHospitalData] = useState([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {

        Geolocation.requestAuthorization();
        console.log(Geolocation.getCurrentPosition);

        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            loadHospitalData(latitude, longitude); 
          },
          error => {
            console.error("Error getting location:", error);
            Alert.alert("위치 오류", "위치 정보를 가져오는 중 문제가 발생했습니다.");
          },
          { enableHighAccuracy: false, timeout: 150000, maximumAge: 10000 }
        );
      } catch (error) {
        console.error("Location permission error:", error);
        Alert.alert("권한 오류", "위치 권한을 허용해주세요.");
      }
    };

    const loadHospitalData = async (latitude: number, longitude: number) => {
      try {
        const vets = await fetchHospitals(latitude, longitude); // API 호출
        setHospitalData(vets); // 데이터를 상태에 설정
      } catch (error) {
        Alert.alert('오류', '병원 정보를 가져오는 중 문제가 발생했습니다.');
      }
    };

    requestLocationPermission(); 
  }, []);

  const handleHospitalPress = (item) => {
    navigation.navigate('HospitalInfo', { vetId: item.id, latitude, longitude });
  };
  
  return (
  <SafeAreaView className="flex-1 bg-white">
    {/* 뒤로가기 버튼 */}
    <HeaderBar showBackButton />
    <View className='items-center'>
      <StylizedText type='header1'>내 주변 동물병원 검색 결과입니다.</StylizedText>
    </View>
    <FlatList
      data={hospitalData}
      renderItem={({ item }) => (
        <HospitalCard item={item} onPress={() => handleHospitalPress(item)} />
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 16 }}
    />
    </SafeAreaView>
  );
};

export default FindHospital;