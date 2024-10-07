import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define types for disease data and pet data
interface Disease {
  name: string;
  probability: number;
}

interface DiseaseDetails {
  about: string;
  note: string;
  goodFood: string;
  badFood: string;
}

interface PetData {
  name: string;
  type: string;
  age: string;
  sex: string;
  diseases: Disease[];
}

const petData: PetData = {
  name: "하루",
  type: "믹스",
  age: "4 살",
  sex: "암컷",
  diseases: [
    { name: "피부염", probability: 83 },
    { name: "진드기", probability: 60 },
    { name: "관절염", probability: 10 }
  ]
};

// Mock disease data with descriptions, notes, food
const diseaseDetails: Record<string, DiseaseDetails> = {
  "피부염": {
    about: "피부염은 피부가 염증에 의해 붉고 가려운 상태입니다.",
    note: "주의 깊게 관찰하고 악화시 병원에 방문하세요.",
    goodFood: "생선, 오메가-3",
    badFood: "짠 음식"
  },
  "진드기": {
    about: "진드기는 피부에 기생하는 작은 해충입니다.",
    note: "정기적인 목욕과 청결 관리가 필요합니다.",
    goodFood: "고단백 사료",
    badFood: "단 음식"
  },
  "관절염": {
    about: "관절염은 관절의 염증으로 인해 통증을 유발합니다.",
    note: "관절 건강을 위한 운동을 시키세요.",
    goodFood: "글루코사민 포함 사료",
    badFood: "고칼로리 음식"
  }
};

const AnalysisScreen: React.FC = () => {
  const navigation = useNavigation(); // Use navigation hook

  const getProbabilityColor = (probability: number): string => {
    if (probability > 80) {
      return '#FF6B6B'; // Red
    } else if (probability >= 60) {
      return '#FFD700'; // Yellow
    } else {
      return '#32CD32'; // Green
    }
  };

  const handleCardPress = (disease: Disease): void => {
    const diseaseDetail = diseaseDetails[disease.name] || {};
    navigation.navigate('DiseaseDetail', { disease, petName: petData.name, diseaseDetail });
  };

  const handleFindHospital = () => {
    navigation.navigate('FindHospital');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.petName}><Text style={{ color: 'skyblue' }}>{petData.name}</Text> 의 분석 리포트</Text>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.petImage} />
        <View style={styles.pillContainer}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{petData.type}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{petData.age}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{petData.sex}</Text>
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={{ textAlign: 'left' ,fontWeight: 'bold', fontSize: 26, color: 'black', paddingTop: 10, paddingRight: 240, paddingBottom: 10 }}>의심질환</Text>
        <View style={styles.diseaseContainer}>
          
          {petData.diseases.map((disease, index) => (
            <TouchableOpacity key={index} style={styles.diseaseCard} onPress={() => handleCardPress(disease)}>
              <Text style={styles.diseaseName}>{disease.name}</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageLabel}>Percentage</Text>
                <Text style={[styles.diseaseProbability, { color: getProbabilityColor(disease.probability) }]}>
                  {disease.probability}
                  <Text style={styles.percentSign}>%</Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.noticeTitle}>주의사항</Text>
        <Text style={styles.noticeText}>
          해당 리포트는 참고용 자료이며 정확한 진단은 인근 동물병원에서 해주세요.
        </Text>

        <View style={styles.paddingBottomSpace} />
      </ScrollView>

      <View style={styles.stickyButtonContainer}>
        <TouchableOpacity onPress={handleFindHospital} style={styles.findHospitalButton}>
          <Text  style={styles.findHospitalButtonText}>병원 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100, // Adjusted padding to avoid the content being hidden by the sticky button
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 30,
    marginBottom: 10,
  },
  petName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  diseaseContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  diseaseCard: {
    width: '48%',
    aspectRatio: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    backgroundColor: '#F7F7F7', // Change this line
  },
  
  diseaseName: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  percentageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  percentageLabel: {
    fontSize: 12,
    color: '#888',
  },
  diseaseProbability: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  percentSign: {
    fontSize: 16,
  },
  pill: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  pillText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A3A3AC',
  },
  pillContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  divider: {
    height: 2,
    backgroundColor: '#D1D1D6',
    marginVertical: 15,
    width: '100%',
  },
  // Adjusted styles for left alignment of the notice
  noticeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A3A3AC',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  noticeText: {
    fontSize: 16,
    color: '#A3A3AC',
    textAlign: 'left',
    width: '100%',
  },
  // Sticky button container
  stickyButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  findHospitalButton: {
    backgroundColor: 'skyblue',
    borderRadius: 50,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  findHospitalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  // Space added at the bottom to account for the sticky button
  paddingBottomSpace: {
    height: 100, // Adjust this value based on the button height
  },
});

export default AnalysisScreen;
