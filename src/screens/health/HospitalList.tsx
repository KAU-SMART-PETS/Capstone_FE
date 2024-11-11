import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// 임시 동물병원 데이터
const hospitalData = [
  ['멍멍 동물병원', '031-1234-5678', '09:00-18:00', '경기도 고양시 일산동구'],
  ['아옹 동물병원', '031-2345-6789', '09:00-18:00', '경기도 고양시 일산서구'],
  ['멍멍 동물병원', '031-3456-7890', '09:00-20:00', '경기도 파주시 금촌동'],
  ['야옹 동물병원', '031-4567-8901', '10:00-19:00', '경기도 김포시 구래동'],
  ['야옹 동물병원', '031-4567-8901', '10:00-19:00', '경기도 김포시 구래동'],
  ['야옹 동물병원', '031-4567-8901', '10:00-19:00', '경기도 김포시 구래동'],
  ['야옹 동물병원', '031-4567-8901', '10:00-19:00', '경기도 김포시 구래동'],
  ['야옹 동물병원', '031-4567-8901', '10:00-19:00', '경기도 김포시 구래동'],
];

const HospitalCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.imageContainer} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{item[0]}</Text>
      <Text style={styles.info}>{item[2]}</Text>
      <Text style={styles.info}>{item[1]}</Text>
      <Text style={styles.info}>{item[3]}</Text>
    </View>
  </View>
);


const HospitalList = () => {
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      <Text style={styles.title}>내 주변 동물병원 검색 결과입니다.</Text>
      <FlatList
        data={hospitalData}
        renderItem={({ item }) => <HospitalCard item={item} />}
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

export default HospitalList;