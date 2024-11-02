import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import registerPhoto from '@image/frame/registerPhoto.png';
import { PetDetails } from '@src/utils/constants/types';

// 초기 데이터(임시)
const mockData = {
  steps: {
    current: 1900,
    goal: 3000
  },
  minutes: {
    current: 18,
    goal: 60
  },
  petDetails: {
    name: "하늘이",
    type: "강아지",
    weight: "25",
    age: "3",
    gender: "암",
  },
  estimatedCalories: 330
};

const PetProfile: React.FC<{ route: RouteProp<RootStackParamList, 'PetProfile'> }> = ({ route }) => {
  const pet = route.params?.pet;
  const {
    id = 0,
    name = '이름 없음',
    petType = '종류 없음',
    gender = '성별 없음',
    weight = '무게 없음',
    imageUrl = '',
    age = '나이 없음',
  } = pet || {}; // pet이 undefined일 경우 빈 객체로 대체
  
  const navigation = useNavigation();
  const [showDetail, setShowDetail] = useState(false);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const calculatePercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const stepsPercentage = calculatePercentage(mockData.steps.current, mockData.steps.goal);
  const minutesPercentage = calculatePercentage(mockData.minutes.current, mockData.minutes.goal);

  const toggleDetail = () => {
    setShowDetail(prevState => !prevState);
  };

  const getLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      name: '이름',
      petType: '종류',
      weight: '체중',
      age: '나이',
      gender: '성별',
    };

    return labels[key] || key;
  };

  const handleHealthInfo = (navigation:any) => {
    navigation.navigate("RegisterHealthInfo", id); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity onPress={handleHealthInfo} style={styles.healthInfoButton}>
                <Text style={styles.healthInfoButtonText}>보건정보 조회하기</Text>
          </TouchableOpacity>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.profileSection}>
            <Image
              source={imageUrl ? { uri: imageUrl } : registerPhoto}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{name}</Text>

            <View style={styles.calorieInfoContainer}>
              <View style={styles.calorieInfo}>
                <Text style={styles.breed}>예상 칼로리 소모량</Text>
                <Text style={styles.calories}>{mockData.estimatedCalories} kcal</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.statsTitle}>일일 산책</Text>
            <View style={styles.statItem}>
              <View style={styles.statLabels}>
                <Text style={styles.labelText}>걸음 수</Text>
                <Text style={styles.valueText}>{mockData.steps.current} / {mockData.steps.goal}</Text>
              </View>
              <View style={styles.statBarOuter}>
                <View style={[styles.statBarInner, { width: `${stepsPercentage}%` }]} />
              </View>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statLabels}>
                <Text style={styles.labelText}>시간</Text>
                <Text style={styles.valueText}>{mockData.minutes.current} / {mockData.minutes.goal} 분</Text>
              </View>
              <View style={styles.statBarOuter}>
                <View style={[styles.statBarInner, { width: `${minutesPercentage}%` }]} />
              </View>
            </View>
          </View>
          
          {showDetail && (
            <>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>{getLabel('petType')}</Text>
                <Text style={styles.detailValue}>{petType}</Text>
              </View>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>{getLabel('gender')}</Text>
                <Text style={styles.detailValue}>{gender}</Text>
              </View>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>{getLabel('weight')}</Text>
                <Text style={styles.detailValue}>{weight} kg</Text>
              </View>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>{getLabel('age')}</Text>
                <Text style={styles.detailValue}>{age} 세</Text>
              </View>
            </>
          )}
          
          <TouchableOpacity style={styles.button} onPress={toggleDetail}>
            <Text style={styles.buttonText}>
              {showDetail ? "정보 숨기기" : "정보 펼쳐보기"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 0,
  },
  backButtonText: {
    fontSize: 24,
    color: '#888',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '100%', 
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    color: 'black',
    fontSize: 34,
    paddingTop: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  calorieInfo: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 20,
  },
  breed: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    textAlign: 'left', 
  },
  calories: {
    color: '#666',
    fontSize: 18,
    textAlign: 'left', 
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statItem: {
    marginBottom: 20,
  },
  statLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  labelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  valueText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statBarOuter: {
    height: 30,
    backgroundColor: '#E7F9ED',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 3,
  },
  statBarInner: {
    height: '100%',
    backgroundColor: '#85E0A3',
    borderRadius: 15,
  },
  detailItem: {
    marginBottom: 15,
  },
  detailCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  detailValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  button: {
    width: '100%',
    backgroundColor: '#73A8BA',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  calorieInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  healthInfoButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  healthInfoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PetProfile;
