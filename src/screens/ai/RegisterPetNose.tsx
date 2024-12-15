import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchUserPets, getPetDetails } from '@api/petApi';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@common/RoundedButton';
import CustomAlert from '@common/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ColorMap from '@common/ColorMap';

const defaultImage = require('../../assets/image/icon/pawprint.png');
const backIcon = require('../../assets/image/icon/arrow_back.png');

const RegisterNose = () => {
  const navigation = useNavigation();
  const [petList, setPetList] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [selectedPetName, setSelectedPetName] = useState(null);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
      navigation.navigate('AlertNoseRegister', {
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

      <View style={styles.headerContainer}>
        <StylizedText type="header1" styleClass="text-black mb-4">
           비문 등록을 위한{"\n"}반려동물을 선택해주세요.
        </StylizedText>
       </View>

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
        <RoundedTextButton content="등록하기" widthOption="xl" onPress={handleRegisterButtonPress} />
      </View>
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
    paddingTop: 80,
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
  bottomButtonContainer: {
      position: 'absolute',
      bottom: 16,
      left: 0,
      right: 0,
      alignItems: 'center',
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
    borderColor: ColorMap['primary'],
    borderWidth: 2,
  },
  unselectedPetButton: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default RegisterNose;