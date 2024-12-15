import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import HealthCards from '../../components/common/HealthCards';
import { useRoute, useNavigation } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@components/common/StylizedText';
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
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <HeaderText
            highlight={petName}
            text={`${petName} 진단 리포트`}
          />
        </View>

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
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingBottom: 80,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 30,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ResultEyeScan;
