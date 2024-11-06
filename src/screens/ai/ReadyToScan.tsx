import React, { useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProgressDots } from '../../components/common/Loading';
import { Alert } from 'react-native';

const ReadyToScan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri, petId, petType, petName } = route.params;

  useEffect(() => {
    const fetchAndNavigate = async () => {
      const formData = new FormData();
      formData.append('AnimalImage', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'test.jpeg',
      });

      const petTypeLowerCase = petType.toLowerCase();

      try {
        const response = await fetch(`http://52.79.140.133:8080/ai/eye?PetType=${petTypeLowerCase}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          // 3초 후에 ResultEyeScan 화면으로 이동하면서 진단 결과와 이미지 URI, petName 전달
          setTimeout(() => {
            navigation.navigate('ResultEyeScan', { diagnosis: data, imageUri, petName });
          }, 3000);
        } else {
          const errorText = await response.text();
          Alert.alert("오류", `진단 결과를 가져오는 중 문제가 발생했습니다. (상태 코드: ${response.status})\n${errorText}`);
        }
      } catch (error) {
        Alert.alert("오류", "진단 서버에 문제가 발생했습니다. 네트워크 또는 서버 상태를 확인해주세요.");
      }
    };

    fetchAndNavigate();
  }, [imageUri, petType, petName, navigation]);

  return <ProgressDots />;
};

export default ReadyToScan;





