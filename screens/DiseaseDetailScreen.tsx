import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;


type DiseaseDetailRouteParams = {
  disease: {
    name: string;
    probability: number;
  };
  petName: string;
  diseaseDetail: {
    about: string;
    note: string;
    goodFood: string;
    badFood: string;
  };
};

type DiseaseDetailScreenProps = {
  route: RouteProp<{ params: DiseaseDetailRouteParams }, 'params'>;
};

const DiseaseDetailScreen: React.FC<DiseaseDetailScreenProps> = ({ route }) => {
  const { disease, petName, diseaseDetail } = route.params;

  if (!diseaseDetail) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>질환 정보가 없습니다. 데이터를 확인하세요.</Text>
      </View>
    );
  }

  // Determine badge text and color
  const getBadgeInfo = (probability: number) => {
    if (probability > 80) return { text: '위험', color: 'red' };
    if (probability > 59) return { text: '보통', color: 'yellow' };
    return { text: '안전', color: 'green' };
  };

  const badgeInfo = getBadgeInfo(disease.probability);

  return (
    <View style={styles.container}>
      <View style={styles.topPadding}></View>
      <Text style={styles.title}><Text style={{ color: 'skyblue' }}>{petName}</Text>의 의심질환에 대해 설명 드릴게요</Text>

      <View style={styles.diseaseCard}>
        <View style={[styles.badge, { backgroundColor: badgeInfo.color }]}>
          <Text style={styles.badgeText}>{badgeInfo.text}</Text>
        </View>
        <Text style={styles.diseaseName}>{disease.name}</Text>
        <Text style={styles.subText}>치료가 필요해요.</Text>
        <View style={styles.probabilityContainer}>
          <Text style={[styles.diseaseProbability, { color: badgeInfo.color }]}>
            {disease.probability}
          </Text>
          <Text style={styles.percentSymbol}>%</Text>
        </View>
      </View>

      <View style={styles.speechBubble}>
        <Text style={styles.sectionTitle}>About Disease</Text>
        <Text style={styles.text}>{diseaseDetail.about}</Text>

        <Text style={styles.sectionTitle}>Note</Text>
        <Text style={styles.text}>{diseaseDetail.note}</Text>

        <Text style={styles.sectionTitle}>Good Food</Text>
        <Text style={styles.text}>{diseaseDetail.goodFood}</Text>

        <Text style={styles.sectionTitle}>Bad Food</Text>
        <Text style={styles.text}>{diseaseDetail.badFood}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'white',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  diseaseCard: {
    width: screenWidth * 0.53, // 53% of the screen width
    alignSelf: 'flex-start', // Align to the left
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#F7F7F7',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  diseaseName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  probabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  diseaseProbability: {
    fontSize: 29,
    fontWeight: 'bold',
  },
  percentSymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  speechBubble: {
    padding: 20,
    backgroundColor: '#F2FAFF',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#CCC',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  text: {
    paddingBottom: 20,
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  topPadding: {
    paddingTop: 50,
  }
});

export default DiseaseDetailScreen;
