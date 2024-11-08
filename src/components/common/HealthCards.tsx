import React from 'react';
import { View } from 'react-native';
import { DiseaseCard } from '@components/InfoCards';

const dogDiseaseTranslationMap = {
  blepharitis: '안건염',
  cataract: '백내장',
  conjunctivitis_arbitary: '결막염',
  conjunctivitis: '결막염',
  entropion: '안검내반증',
  eyelid_tumor: '안검종양',
  incontinence: '요실금',
  non_ulcerative_keratitis: '비궤양성 각막염',
  nuclear_sclerosis: '핵경화증',
  pigmentary_keratitis: '색소성 각막염',
  ulcerative_keratitis: '각막궤양',
};

const catDiseaseTranslationMap = {
  corneal_dystrophy: '각막이영양증',
  corneal_ulcer: '각막궤양',
  conjunctivitis: '결막염',
  non_ulcerative_keratitis: '비궤양성 각막질환',
  blepharitis: '안건염',
};

const HealthCards = ({ diagnosisData = {}, petType = 'dog' }) => {
  const diseaseTranslationMap = petType === 'dog' ? dogDiseaseTranslationMap : catDiseaseTranslationMap;

  return (
    <View style={styles.container}>
      {Object.entries(diagnosisData).map(([condition, probability]) => (
        <View key={condition} style={styles.cardContainer}>
          <DiseaseCard
            title={diseaseTranslationMap[condition] || condition}
            percentage={probability}
            icon
          />
        </View>
      ))}
    </View>
  );
};

// 스타일 설정
const styles = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '95%',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 10,
  },
};

export default HealthCards;