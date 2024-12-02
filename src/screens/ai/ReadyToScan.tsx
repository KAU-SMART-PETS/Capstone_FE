import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { ProgressDots } from '../../components/common/Loading';
import StylizedText from '@components/common/StylizedText';
import CustomAlert from '@components/common/CustomAlert'; // CustomAlert를 외부에서 가져오기

const ReadyToScan = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri, petId, petType, petName } = route.params;

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  console.log("1. 디버깅 출력 (스캔요청으로 이동 시) : ", imageUri, petId, petType, petName);

  // MIME 타입 추론 함수
  const getMimeType = (uri) => {
    const extension = uri.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return 'application/octet-stream';
    }
  };

  // Alert 메시지를 표시하는 함수
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // 데이터 Fetch 및 화면 이동 함수
  const fetchAndNavigate = async () => {
    const mimeType = getMimeType(imageUri);
    const formData = new FormData();
    formData.append('AnimalImage', {
      uri: imageUri,
      type: mimeType,
      name: 'test.jpeg',
    });

    try {
      const response = await fetch(`http://52.79.140.133:8080/api/v1/ai/eye?PetType=${petType.toLowerCase()}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("2. 디버깅 출력 (서버에서 받은 진단결과) :", data);
        navigation.navigate('ResultEyeScan', { diagnosis: data, imageUri, petName });
      } else {
        const errorText = await response.text();
        console.log("2. 디버깅 출력 (서버 오류메시지) :", errorText);

        if (errorText.includes("petType이 일치하지 않습니다")) {
          showAlert("반려동물의 종이 맞는지 확인해주세요.");
        } else {
          showAlert(`진단 결과를 가져오는 중 문제가 발생했습니다.\n(상태 코드: ${response.status})`);
        }
      }
    } catch (error) {
      console.error("Network or server error: ", error);
      showAlert("진단 서버에 문제가 발생했습니다.\n네트워크 또는 서버 상태를 확인해주세요.");
    }
  };

  useEffect(() => {
    if (imageUri && petType) {
      fetchAndNavigate();
    }
  }, [imageUri, petType, petName]);

  return (
    <View style={styles.headerContainer}>
       <StylizedText type="header1" styleClass="text-black mb-4">
          홍채 분석 중 입니다.{"\n"}다소 시간이 걸릴 수 있습니다.
       </StylizedText>
      <ProgressDots />
      <CustomAlert
        visible={isAlertVisible}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false);
          navigation.navigate('SelectPetToScan', { petId, petType, petName });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, // 상단 텍스트와 ProgressDots 간 간격 조정
  },
  headerContainer: {
      paddingHorizontal: 30,
      paddingVertical: 80,
    },
});

export default ReadyToScan;
