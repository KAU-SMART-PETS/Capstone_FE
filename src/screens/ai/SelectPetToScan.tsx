// components/SelectPetToScan.tsx

import React, { useEffect, useState, useCallback, memo } from 'react';
import { View, FlatList } from 'react-native';
import { fetchUserPets, getPetDetails } from '@api/petApi';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@common/RoundedButton';
import CustomAlert from '@common/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { BackArrowHeader } from '@src/components/HeaderBar';
import RadioButton from '@src/components/common/RadioButton';
import SCAN_TYPES from './ScanTypes';

const defaultImage = require('@assets/image/icon/pawprint.png');

/**
 * Memoized Pet Item Component to prevent unnecessary re-renders
 */
interface Pet {
  id: string;
  name: string;
  petType: string;
  imageUrl?: string;
}

interface PetItemProps {
  pet: Pet;
  isSelected: boolean;
  onSelect: (pet: Pet) => void;
}

const PetItem: React.FC<PetItemProps> = memo(({ pet, isSelected, onSelect }) => (
  <RadioButton
    inactiveOutlineStyle='solid'
    boxsize='md'
    isSelected={isSelected}
    onPress={() => onSelect(pet)}
    >
    <Avatar size={52} source={pet.imageUrl ? { uri: pet.imageUrl } : defaultImage} />
    <StylizedText type="body1" styleClass="mt-2">
      {pet.name}
    </StylizedText>
  </RadioButton>
));

const SelectPetToScan: React.FC<{ route: RouteProp<RootStackParamList, "SelectPetToScan"> }> = ({ route }) => {
  const scanType:string = route.params?.scanType || "";
  const navigation = useNavigation();
  const [petList, setPetList] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  /**
   * Initialize data on component mount
   */
  useEffect(() => {
    const initializeData = async () => {
      try {
        const sessionId = await AsyncStorage.getItem('JSESSIONID');
        if (sessionId) {
          console.log('Session ID found:', sessionId);
        }
        await loadPets();
      } catch (error) {
        console.error('Initialization error:', error);
        showAlert('초기화 과정에서 문제가 발생했습니다. 다시 시도해주세요.');
      }
    };
    initializeData();
  }, [navigation]);

  /**
   * Load pets from API
   */
  const loadPets = useCallback(async () => {
    try {
      const petIds = await fetchUserPets();
      const petsData = await Promise.all(
        petIds.map(async (petId) => {
          try {
            const pet = await getPetDetails(petId);
            if (pet) {
              return { ...pet, id: petId, petType: pet.petType.toLowerCase() };
            }
            return null;
          } catch (petError) {
            console.error(`Error fetching details for pet ID ${petId}:`, petError);
            return null;
          }
        })
      );
      const validPets = petsData.filter(Boolean) as Pet[];
      if (validPets.length === 0) {
        showAlert('등록된 반려동물이 없습니다. 반려동물을 먼저 등록해주세요.');
      }
      setPetList(validPets);
    } catch (error) {
      console.error('Error loading pets:', error);
      showAlert('반려동물 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
    }
  }, []);

  /**
   * Handle pet selection
   */
  const handlePetSelect = useCallback(
    (pet: Pet) => {
      if (selectedPet?.id === pet.id) {
        setSelectedPet(null);
      } else {
        setSelectedPet(pet);
      }
    },
    [selectedPet]
  );

  /**
   * Handle register button press
   */
  const handleRegisterButtonPress = useCallback(() => {
    if (selectedPet) {
      navigation.navigate('AlertScan', {
        scanType: scanType || '',
        petId: selectedPet.id || '',
        petType: selectedPet.petType || '',
        petName: selectedPet.name || '',
      });
    } else {
      showAlert('반려동물을 선택해주세요.');
    }
  }, [navigation, selectedPet]);

  /**
   * Show alert with message
   */
  const showAlert = useCallback((message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
  }, []);

  /**
   * Render each pet item
   */
  const renderPetItem = useCallback(
    ({ item }: { item: Pet }) => (
      <PetItem
        pet={item}
        isSelected={selectedPet?.id === item.id}
        onSelect={handlePetSelect}
      />
    ),
    [selectedPet, handlePetSelect]
  );

  /**
   * Extract unique key for each pet item
   */
  const keyExtractor = useCallback((item: Pet) => item.id.toString(), []);

  return (
    <View className="flex-1 bg-white px-8 pt-16">
      {/* Back Button */}
      <BackArrowHeader />
      
      {/* Header Text */}
      <StylizedText type="header1" styleClass="mb-8 ml-2">
        {SCAN_TYPES[scanType]['selectIntro']}
      </StylizedText>

      {/* Pet List */}
      <FlatList
        data={petList}
        renderItem={renderPetItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        // contentContainerStyle="justify-around mt-5"
        extraData={selectedPet}
        ListEmptyComponent={
          <StylizedText type="body1" className="text-gray-500 mt-4 text-center">
            반려동물이 없습니다.
          </StylizedText>
        }
      />

      {/* Register Button */}
      <View className="absolute bottom-4 left-0 right-0 items-center">
        <RoundedTextButton
          content="사진 등록하기"
          widthOption="xl"
          onPress={handleRegisterButtonPress}
        />
      </View>

      {/* Custom Alert */}
      <CustomAlert
        visible={isAlertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

/**
 * Styles integrated with NativeWind classes, no need for separate StyleSheet
 */

export default SelectPetToScan;
