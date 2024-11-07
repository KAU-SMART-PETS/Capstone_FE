import React, { useEffect, useState } from 'react';
import { View, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchUserPets, getPetDetails } from '@api/petApi';
import StylizedText from '../../components/common/StylizedText';
import Avatar from '@components/common/Avatar';
import { RoundedTextButton } from '@components/common/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ModalLayout from '@components/ModalLayout';  // ModalLayout 컴포넌트 직접 사용
import { launchImageLibrary } from 'react-native-image-picker';

const defaultImage = require('../../assets/image/icon/pawprint.png');
const backIcon = require('../../assets/image/icon/arrow_back.png');

const SelectPetToScan = () => {
  const navigation = useNavigation();
  const [petList, setPetList] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [selectedPetName, setSelectedPetName] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // 반려동물 데이터를 불러오는 함수
  const loadPets = async () => {
    try {
      const petIds = await fetchUserPets();
      const petsData = await Promise.all(
        petIds.map(async (petId) => {
          const pet = await getPetDetails(petId);
          if (pet) {
            return { ...pet, id: petId, petType: pet.petType.toLowerCase() };
          }
          return null;
        })
      );
      setPetList(petsData.filter(Boolean));
      console.log("Loaded pet list:", petsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load pets. Please try again later.');
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const sessionId = await AsyncStorage.getItem('JSESSIONID');
      if (sessionId) {
        console.log('Session ID found:', sessionId);
      }
      await loadPets();
    };

    initializeData();
  }, []);

  // 반려동물을 선택하는 함수
  const handlePetSelect = (petId, petType, petName) => {
    if (petId === selectedPetId) {
      setSelectedPetId(null);
      setSelectedPetType(null);
      setSelectedPetName(null);
    } else {
      setSelectedPetId(petId);
      setSelectedPetType(petType);
      setSelectedPetName(petName);
    }
    console.log("Selected Pet ID:", petId, "Pet Type:", petType, "Pet Name:", petName);
  };

  // 모달 열기
  const handleRegisterButtonPress = () => {
    if (selectedPetId && selectedPetType) {
      setModalVisible(true);
    } else {
      Alert.alert("알림", "반려동물을 선택해주세요.");
    }
  };

  // 갤러리에서 이미지 선택
  const handleGallerySelect = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.assets && response.assets[0]) {
        const selectedImageUri = response.assets[0].uri;
        console.log('Selected Image URI:', selectedImageUri);

        // ReadyToScan 화면으로 이동하며 선택한 이미지와 반려동물 정보 전달
        navigation.navigate('ReadyToScan', {
          imageUri: selectedImageUri,
          petId: selectedPetId,
          petType: selectedPetType,
          petName: selectedPetName,
        });
      } else {
        Alert.alert("오류", "이미지 선택이 취소되었거나 실패했습니다.");
      }
    });
    setModalVisible(false);
  };

  // 카메라 화면으로 이동
  const handleCameraLaunch = () => {
    setModalVisible(false);
    navigation.navigate('TakePicture', {
      petId: selectedPetId,
      petType: selectedPetType,
      petName: selectedPetName, // 반려동물 이름 전달
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <StylizedText type="header1" styleClass="text-black mb-4 mt-6">
        촬영 시 {"\n"}반려동물의 동공이 {"\n"}잘 보일 수 있도록 찍어주세요.
      </StylizedText>

      <View style={styles.petListContainer}>
        {petList.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            onPress={() => handlePetSelect(pet.id, pet.petType, pet.name)}
            style={[
              styles.petButton,
              selectedPetId === pet.id ? styles.selectedPetButton : styles.unselectedPetButton,
            ]}
          >
            <Avatar size={52} source={pet.imageUrl ? { uri: pet.imageUrl } : defaultImage} />
            <StylizedText type="body1" styleClass="mt-3">{pet.name}</StylizedText>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomButtonContainer}>
        <RoundedTextButton content="사진 등록하기" widthOption="xl" onPress={handleRegisterButtonPress} />
      </View>

      {/* 직접 정의한 모달 컴포넌트 */}
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
                onPress={handleCameraLaunch}
                key="camera"
              />
            ],
            layout: 'col',
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 50,
  },
  petListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    top: 39,
  },
  petButton: {
    alignItems: 'center',
    margin: 8,
    padding: 10,
    borderRadius: 8,
  },
  selectedPetButton: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  unselectedPetButton: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default SelectPetToScan;
