import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchUserPets, getPetDetails } from '@api/petApi';
import StylizedText from '../../components/common/StylizedText';
import Avatar from '@components/common/Avatar';
import { RoundedTextButton } from '@components/common/RoundedButton';
import CustomAlert from '@components/common/CustomAlert'; // CustomAlert 임포트
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const defaultImage = require('../../assets/image/icon/pawprint.png');
const backIcon = require('../../assets/image/icon/arrow_back.png');

const SelectPetToScan = () => {
  const navigation = useNavigation();
  const [petList, setPetList] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [selectedPetName, setSelectedPetName] = useState(null);
  const [isAlertVisible, setAlertVisible] = useState(false); // 알림창 상태 추가
  const [alertMessage, setAlertMessage] = useState(''); // 알림창 메시지 상태 추가

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
    } catch (error) {
      showAlert('반려동물 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
    }
  };

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
  };

  const handleRegisterButtonPress = () => {
    if (selectedPetId && selectedPetType) {
      navigation.navigate('AlertEyeScan', {
        petId: selectedPetId,
        petType: selectedPetType,
        petName: selectedPetName,
      });
    } else {
      showAlert('반려동물을 선택해주세요.');
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
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

      {/* "사진 등록하기" 버튼 */}
      <View style={styles.bottomButtonContainer}>
        <RoundedTextButton content="사진 등록하기" widthOption="xl" onPress={handleRegisterButtonPress} />
      </View>

      {/* CustomAlert 추가 */}
      <CustomAlert
        visible={isAlertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 40,
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
  petListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  petButton: {
    alignItems: 'center',
    margin: 8,
    padding: 10,
    borderRadius: 8,
  },
  selectedPetButton: {
    borderColor: '#73A8BA',
    borderWidth: 2,
  },
  unselectedPetButton: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  bottomButtonContainer: {
      position: 'absolute',
      bottom: 16,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
});

export default SelectPetToScan;

