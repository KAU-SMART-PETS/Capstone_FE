import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import HealthCards from '../../components/common/HealthCards';
import { useRoute, useNavigation } from '@react-navigation/native';
import StylizedText from '@components/common/StylizedText';
import { RoundedTextButton } from '../../components/common/RoundedButton';

const ResultEyeScan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { diagnosis = {}, imageUri, petName = '' } = route.params || {};

  const handleRetestButtonPress = () => {
      navigation.navigate('SelectPetToScan');
  };

  const handleHospitalButtonPress = () => {
    navigation.navigate('HospitalList');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StylizedText type="header1" styleClass="text-black mb-4 mt-6">
          <StylizedText type="header1" style={{ color: '#73A8BA' }}>
            {petName}
          </StylizedText>
          의 진단 리포트
        </StylizedText>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <HealthCards diagnosisData={diagnosis} />
      <View style={styles.bottomButtonContainer}>
        <RoundedTextButton
          content="다시 검사하기"
          widthOption="md"
          onPress={handleRetestButtonPress}
          style={styles.button}
        />
        <RoundedTextButton
          content="인근 병원 찾기"
          widthOption="md"
          onPress={handleHospitalButtonPress}
          style={styles.button}
        />
      </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 16,
    left: 32,
    right: 32,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default ResultEyeScan;