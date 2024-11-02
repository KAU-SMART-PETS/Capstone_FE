import React, { useEffect, useState } from 'react';
import config from '@constants/config';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

  useEffect(() => {
    // 위치 정보 (예: 사용자의 현재 위치)
    const latitude = 35.2031699;
    const longitude = 126.8971756;

    // API 호출
    const fetchHospitals = async () => {
      try {
        const response = await axios.post(`${config.API_SERVER_URL}/api/v1/vets`, {
          latitude,
          longitude,
        });
        setHospitalData(response.data.vets);
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };
  
  const handleHospitalPress = (item) => {
    navigation.navigate('HospitalInfo',  { vetId: item.id });
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