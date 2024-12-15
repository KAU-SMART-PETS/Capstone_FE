import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { ProgressDots } from '@common/Loading';
import StylizedText from '@common/StylizedText';
import CustomAlert from '@common/CustomAlert';

const ReadyToRegisterNose = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri, petId, petName } = route.params;

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  console.log("1. 디버깅 출력 (비문 등록 요청) : ", imageUri, petId, petName);

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

  // 데이터 Fetch 및 등록 함수
  const fetchAndRegisterNose = async () => {
    const mimeType = getMimeType(imageUri);
    const formData = new FormData();
    formData.append('animalImage', {
      uri: imageUri,
      type: mimeType,
      name: 'nose_registration_image.jpeg',
    });

    try {
      const response = await fetch(`http://52.79.140.133:8080/api/v1/ai/nose/regist?petId=${petId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const message = await response.text();
        console.log("2. 디버깅 출력 (비문 등록 성공) :", message);
        navigation.navigate('ResultNoseRegister', {
          imageUri, // 서버로 보낸 이미지 URI
          petName,  // 선택한 반려동물 이름
        });
      } else {
        const errorText = await response.text();
        console.log("2. 디버깅 출력 (서버 오류메시지) :", errorText);

        if (errorText.includes("이미 등록된 비문입니다")) {
          showAlert("이미 등록된 비문입니다. 새로운 비문 이미지를 선택해주세요.");
        } else {
          showAlert("이미지에서 코가 인식되지 않았습니다.");
        }
      }
    } catch (error) {
      console.error("Network or server error: ", error);
      showAlert("비문 등록 서버에 문제가 발생했습니다.\n네트워크 또는 서버 상태를 확인해주세요.");
    }
  };

  useEffect(() => {
    if (imageUri && petId) {
      fetchAndRegisterNose();
    }
  }, [imageUri, petId]);

  return (
    <View style={styles.headerContainer}>
      <StylizedText type="header1" styleClass="text-black mb-4">
        비문 등록 중입니다.{"\n"}잠시만 기다려주세요.
      </StylizedText>
      <ProgressDots />
      <CustomAlert
        visible={isAlertVisible}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false);
          navigation.navigate('RegisterPetNose'); // 비문 등록 완료 후 이동할 페이지
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
    paddingTop: 50,
  },
  headerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 80,
  },
});

export default ReadyToRegisterNose;
