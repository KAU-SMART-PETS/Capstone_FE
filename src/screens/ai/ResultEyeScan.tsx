import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, ScrollView } from 'react-native';
import { RoundedTextButton } from '@common/RoundedButton';
import { HeaderText } from '@common/StylizedText';
import HealthCards from '@common/HealthCards';
import Avatar from '@common/Avatar';

const ResultEyeScan: React.FC<{ route }> = ({
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {  diagnosis, imageUri, petName } = route?.params;
  const handleRetestButtonPress = () => navigation.navigate('SelectPetToScan', { scanType : 'EYE_SCAN' });
  const handleHospitalButtonPress = () => navigation.navigate('HospitalList');
  // console.log("홍채분석 디버그 :", diagnosis, imageUri, petName);
  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 28, paddingTop: 30, paddingBottom: 80 }}>
        <View className="flex-1 w-full my-2 items-center">
          <HeaderText highlight={petName} text={`${petName}의 진단 리포트`} className="mb-6 text-center" />
          <Avatar source={{ uri: imageUri }} size={125} />
          <View className="mb-6" />
        </View>
        <HealthCards diagnosisData={diagnosis} />
        <View className="flex-row justify-between w-full mt-8">
          <RoundedTextButton content="다시 검사하기" widthOption="md" onPress={handleRetestButtonPress} />
          <RoundedTextButton content="인근 병원 찾기" widthOption="md" onPress={handleHospitalButtonPress} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultEyeScan;
