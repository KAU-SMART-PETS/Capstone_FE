import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { ProgressDots } from '@common/Loading';
import StylizedText from '@common/StylizedText';
import { useImageProcessing } from './useImageProcessing';
import SCAN_TYPES from './ScanTypes';
import { fetchUserPets, getPetDetails } from '@src/api/petApi';

const findPetDetails = async (closestPetId: number, navigation: any) => {
  const response = await fetchUserPets();
  if (response) {
    if (response[closestPetId]) {
      const matchedPet = response[closestPetId];
      navigation.navigate('ResultNoseScan', { petDetails: matchedPet, isOwner: true });
    } else {
      const matchedPetDetails = await getPetDetails(String(closestPetId));
      if (matchedPetDetails) {
        navigation.navigate('ResultNoseScan', { petDetails: matchedPetDetails, isOwner: false });
      } else {
        console.error('비문 조회 반려동물 정보 가져오기 실패');
      }
    }
  } else {
    console.error('사용자 반려동물 목록 조회 실패');
  }
};

const ScanPetResult: React.FC<{ route: RouteProp<RootStackParamList, 'ScanPetResult'> }> = ({ route }) => {
  const navigation = useNavigation();
  const { scanType, imageUri, petId, petType, petName } = route.params || {};
  const currentScan = SCAN_TYPES[scanType || ''];
  const { isLoading, handleAlert, uploadImage } = useImageProcessing();

  useEffect(() => {
    if (imageUri && currentScan.apiEndpoint) {
      const formDataKey = scanType === 'EYE_SCAN' ? 'AnimalImage' : 'animalImage';
      const queryParams =
        scanType === 'NOSE_REGISTER'
          ? { petId }
          : scanType === 'EYE_SCAN'
          ? { PetType: petType }
          : {};

      uploadImage(
        currentScan.apiEndpoint,
        imageUri,
        formDataKey,
        queryParams,
        async (data: any) => {
          if (scanType === 'NOSE_SCAN') {
            const jsonData = await data.json();
            const closestPetId = jsonData.closest_class;
            await findPetDetails(closestPetId, navigation);
          } else if (scanType === 'EYE_SCAN') {
            const jsonData = await data.json();
            console.log("json데이터", jsonData);
            navigation.navigate('ResultEyeScan', { diagnosis: jsonData, imageUri: imageUri, petName: petName });
          } else if (scanType === 'NOSE_REGISTER') {
            navigation.navigate('ResultNoseRegister', { imageUri, petName });
          }
        }
      );
    } else {
      handleAlert('필요한 데이터가 누락되었습니다.');
    }
  }, [imageUri, currentScan.apiEndpoint]);

  if (isLoading) {
    return (
      <>
      <View className="flex-1 w-full bg-white px-4 py-20">
        <StylizedText type="header1">
          {SCAN_TYPES[scanType || ''].title}에는{"\n"}다소 시간이 걸릴 수 있습니다.
        </StylizedText>
        <ProgressDots />
      </View>
      </>
    );
  }
  return null; // 결과 화면에서 렌더링 처리
};

export default ScanPetResult;
