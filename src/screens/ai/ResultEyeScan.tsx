import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import HealthCards from '../../components/common/HealthCards';
import { useRoute, useNavigation } from '@react-navigation/native';
import StylizedText from '../../components/common/StylizedText';
import { RoundedTextButton } from '../../components/common/RoundedButton';

const ResultEyeScan = () => {
  const route = useRoute();
  const navigation = useNavigation(); // useNavigation 훅 사용
  const { diagnosis = {}, imageUri, petName = '' } = route.params || {};

  const handleRegisterButtonPress = () => {
    navigation.navigate('HospitalList');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StylizedText type="header1" styleClass="text-black mb-4 mt-6">
          {petName}의 진단 리포트
        </StylizedText>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <HealthCards diagnosisData={diagnosis} />
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <RoundedTextButton content="인근 병원 찾기" widthOption="xl" onPress={handleRegisterButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
    paddingBottom: 80,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 40,
    marginBottom: 30,
    marginTop: 30,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default ResultEyeScan;




