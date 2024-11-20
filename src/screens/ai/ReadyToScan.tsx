import React, { useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProgressDots } from '../../components/common/Loading';
import { Alert } from 'react-native';

const ReadyToScan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri, petId, petType, petName } = route.params;
  console.log("1. 디버깅 출력 (스캔요청으로 이동 시) : ", imageUri, petId, petType, petName);

  // 파일 확장자에 따른 MIME 타입 추론 함수
  const getMimeType = (uri) => {
    const extension = uri.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return 'application/octet-stream'; // 기본값
    }
  };

  useEffect(() => {
    const fetchAndNavigate = async () => {
      // imageUri에서 MIME 타입 추론
      const mimeType = getMimeType(imageUri);
      const formData = new FormData();
      formData.append('AnimalImage', {
        uri: imageUri,
        type: mimeType, // 추론된 MIME 타입 설정
        name: 'test.jpeg',
      });

      const petTypeLowerCase = petType.toLowerCase();

      console.log("Preparing to send data");
      console.log("Selected Pet Type:", petTypeLowerCase);
      console.log("Image URI:", imageUri);
      console.log("MIME Type:", mimeType);

     try {
       const response = await fetch(`http://52.79.140.133:8080/ai/eye?PetType=${petType.toLowerCase()}`, {
         method: 'POST',
         body: formData,
       });


        if (response.ok) {
          const data = await response.json();
          // 3초 후에 ResultEyeScan 화면으로 이동하면서 진단 결과와 이미지 URI, petName 전달
          setTimeout(() => {
            console.log("2. 디버깅 출력 (서버에서 받은 진단결과) :", data);
            console.log("3. 디버깅 출력 (진단 완료 시) : ", imageUri, petId, petType, petName);
            navigation.navigate('ResultEyeScan', { diagnosis: data, imageUri, petName });
          }, 3000);
        } else {
            const errorText = await response.text();
            console.log("2. 디버깅 출력 (서버 오류메시지) :", errorText);
            console.log("3. 디버깅 출력 (진단 완료 시) : ", imageUri, petId, petType, petName);
            Alert.alert("오류", `진단 결과를 가져오는 중 문제가 발생했습니다. (상태 코드: ${response.status})\n${errorText}`);
          }

      } catch (error) {
        console.error("Network or server error: ", error);
        Alert.alert("오류", '진단 서버에 문제가 발생했습니다. 네트워크 또는 서버 상태를 확인해주세요.');
      }
    };

    if (imageUri && petType) {
      fetchAndNavigate();
    }
  }, [imageUri, petType, petName, navigation]);

  return <ProgressDots />;
};

export default ReadyToScan;