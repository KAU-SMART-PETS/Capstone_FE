import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';
import StylizedText from '@components/common/StylizedText';
import { RoundedTextButton } from '@components/common/RoundedButton';
import ModalLayout from '@components/ModalLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanNose = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const backIcon = require('../../assets/image/icon/arrow_back.png');
  const [isModalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  // 서버로 이미지 전송
  const uploadImageToServer = async (imageUri) => {
    const formData = new FormData();
    formData.append('animalImage', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'animal_nose.jpg',
    });

    try {
      const jsessionid = await AsyncStorage.getItem('JSESSIONID');
      if (!jsessionid) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
      }

      // 비문 이미지 서버 전송
      const response = await fetch(`${config.API_SERVER_URL}/api/v1/ai/nose/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Cookie': `JSESSIONID=${jsessionid}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const closestPetId = data.closest_class;

        // 사용자 소유 반려동물 목록 가져오기
        const petsResponse = await fetch(`${config.API_SERVER_URL}/api/v1/users/pets`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `JSESSIONID=${jsessionid}`,
          },
        });

        if (petsResponse.ok) {
          const petsData = await petsResponse.json();
          const userPets = petsData.pets;

          // closest_class ID와 사용자 소유 반려동물 ID 비교
          const matchedPet = userPets.find((pet) => String(pet.id) === String(closestPetId));

          if (matchedPet) {
            // 사용자 소유 반려동물과 일치
            navigation.navigate('ScanNoseResult', {
              petDetails: matchedPet,
              isOwner: true,
            });
          } else {
            // 사용자 소유 반려동물이 아닌 경우
            const petResponse = await fetch(`${config.API_SERVER_URL}/api/v1/pets/${closestPetId}`);
            if (petResponse.ok) {
              const petData = await petResponse.json();
              navigation.navigate('ScanNoseResult', {
                petDetails: petData,
                isOwner: false,
              });
            } else {
              console.error('비문 조회 반려동물 정보 가져오기 실패');
            }
          }
        } else {
          console.error('사용자 반려동물 목록 조회 실패');
        }
      } else {
        Alert.alert('오류', '비문 비교에 실패했습니다.');
      }
    } catch (error) {
      console.error('POST 요청 오류:', error);
      Alert.alert('오류', '비문 비교 중 오류가 발생했습니다.');
    }
  };


  // 갤러리에서 이미지를 선택
  const handleGallerySelect = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) {
        Alert.alert('이미지 선택이 취소되었습니다.');
      } else if (response.errorMessage) {
        Alert.alert('이미지를 불러오는 중 오류가 발생했습니다.');
      } else if (response.assets && response.assets[0]) {
        const selectedImageUri = response.assets[0].uri;
        setModalVisible(false); // 모달 닫기
        uploadImageToServer(selectedImageUri); // 서버로 이미지 전송
      }
    });
  };

  // 카메라로 이미지 촬영
  const handleTakePhoto = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: false };
      const data = await cameraRef.takePictureAsync(options);
      setCameraVisible(false); // 카메라 숨기기
      uploadImageToServer(data.uri); // 서버로 이미지 전송
    }
  };

  return (
    <>
      {!cameraVisible ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <StylizedText type="header1" styleClass="text-black mb-4">
              코의 전체 모양이{"\n"}잘 보이는 사진을 준비해주세요.
            </StylizedText>
            <StylizedText type="body2" styleClass="text-gray mb-6">
              준비된 사진이 적합하지 않으면 비문 조회에 어려움을 겪을 수 있습니다.
            </StylizedText>
          </View>

          <View style={styles.imageContainer}>
            {/* 적합한 사진 */}
            <View style={styles.imageRow}>
              <View style={styles.imageWrapper}>
                <Image source={require('@image/nose_example1.png')} style={styles.image} />
                <Image source={require('@image/icon/check.png')} style={styles.icon} />
              </View>
              <View style={styles.imageWrapper}>
                <Image source={require('@image/nose_example2.png')} style={styles.image} />
                <Image source={require('@image/icon/check.png')} style={styles.icon} />
              </View>
              <View style={styles.imageWrapper}>
                <Image source={require('@image/nose_example3.png')} style={styles.image} />
                <Image source={require('@image/icon/check.png')} style={styles.icon} />
              </View>
            </View>

            {/* 부적합한 사진 */}
            <View style={styles.incorrectRow}>
              <View style={styles.incorrectWrapper}>
                <Image source={require('@image/nose_example5.png')} style={styles.image} />
                <View style={styles.textWrapper}>
                  <Image source={require('@image/icon/x.png')} style={styles.icon} />
                  <StylizedText type="body2" styleClass="text-gray">
                    코의 모양이{"\n"}너무 작아요.
                  </StylizedText>
                </View>
              </View>
              <View style={styles.incorrectWrapper}>
                <Image source={require('@image/nose_example4.png')} style={styles.image} />
                <View style={styles.textWrapper}>
                  <Image source={require('@image/icon/x.png')} style={styles.icon} />
                  <StylizedText type="body2" styleClass="text-gray">
                    코의 전체가{"\n"}보이지 않아요.
                  </StylizedText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomButtonContainer}>
            <RoundedTextButton content="준비 완료" widthOption="xl" onPress={() => setModalVisible(true)} />
          </View>

          {/* ModalLayout */}
          <ModalLayout
            visible={isModalVisible}
            setVisible={setModalVisible}
            rows={[
              {
                content: [
                  <RoundedTextButton
                    content="갤러리에서 가져오기"
                    widthOption="lg"
                    color="bg-primary"
                    onPress={handleGallerySelect}
                    key="gallery"
                  />,
                  <RoundedTextButton
                    content="촬영하기"
                    widthOption="lg"
                    color="bg-primary"
                    onPress={() => {
                      setModalVisible(false);
                      setCameraVisible(true); // 카메라 화면으로 전환
                    }}
                    key="camera"
                  />,
                ],
                layout: 'col',
              },
            ]}
          />
        </View>
      ) : (
        <RNCamera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
        >
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
              <StylizedText type="button" styleClass="text-white">
                촬영하기
              </StylizedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setCameraVisible(false)}>
              <StylizedText type="button" styleClass="text-white">
                취소
              </StylizedText>
            </TouchableOpacity>
          </View>
        </RNCamera>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 80,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
  incorrectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  incorrectWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  captureButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
  },
});

export default ScanNose;

