import React, { useEffect, useState } from 'react';
import config from '@constants/config';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchHospitals } from '@src/api/hospitalApi';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

// 임시 동물병원 데이터 제거
// const hospitalData = require('@api/data/hospitalList.json').vets;

const HospitalCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imageContainer} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>{item.telephone}</Text>
      <Text style={styles.info}>{item.address}</Text>
    </View>
  </TouchableOpacity>
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
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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

  const handleBackButton = () => {
    navigation.goBack();
  };
  
  const handleHospitalPress = (item) => {
    navigation.navigate('HospitalInfo', { vetId: item.id, latitude, longitude });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>내 주변 동물병원 검색 결과입니다.</Text>
      <FlatList
        data={hospitalData}
        renderItem={({ item }) => (
          <HospitalCard item={item} onPress={() => handleHospitalPress(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 25,
    paddingBottom: 0,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    padding: 16,
  },
  title: {
    fontSize: 29,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 20,
    paddingLeft: 35,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 33,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#ddd',
    marginRight: 16,
    paddingLeft: 20,
  },
  infoContainer: {
    paddingLeft: 30,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});

export default FindHospital;