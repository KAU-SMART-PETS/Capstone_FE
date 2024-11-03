import { PetDetails, PetRegistRequest } from "@constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const fetchUserPets = async (): Promise<string[]> => {
  try {
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      console.log('JSESSIONID not found');
      return [];
    }

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/users/pets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionid}`,
      },
    });

    if (response.ok) {
      const { pets } = await response.json();

      return pets.map((pet: any) => pet.id);
    } else {
      console.log('Failed to fetch pet data:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching pet data:', error);
    return [];
  }
};

export const getPetDetails = async (petId: string): Promise<PetDetails | null> => {
  try {
    const cachedPetData = await AsyncStorage.getItem(`PET_${petId}`);
    
    if (cachedPetData) {
      console.log(`Returning cached data for pet ${petId} : ${cachedPetData}`);
      return JSON.parse(cachedPetData) as PetDetails;
    }

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/pets/${petId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const petDetails: PetDetails = await response.json();
      await saveSinglePetDetail(petId, petDetails);
      return petDetails;
    } else {
      console.log(`Failed to fetch pet details: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching pet details:', error);
    return null;
  }
};

const saveSinglePetDetail = async (petId : string, pet : PetDetails) => {
  try {
    console.log(petId);
    await AsyncStorage.setItem(`PET_${petId}`, JSON.stringify(pet));
    console.log(`Pet ${petId} details saved successfully.`);
  } catch (error) {
    console.error(`Error saving details for pet ${petId}:`, error);
  }
};

export const deletePet =  async (petId: string): Promise<boolean> => {
  try {

    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      console.log('JSESSIONID not found');
      return false;
    }
    console.log(petId);

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/pets/${petId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionid}`,
      },
    });

    if (response.ok) {
      console.log(`Pet ${petId} 삭제에 성공했습니다.`);

      await AsyncStorage.removeItem(`PET_${petId}`);
      console.log(`Pet ${petId} 캐시 삭제`);
      
      return true;
    } else {
      console.log(response)
      console.log(`Failed to delete pet ${petId} from server: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting pet ${petId}:`, error);
    return false;
  }

}

export const submitPetRegistration = async (
  petData: PetRegistRequest,
  navigation: any
) => {
  const { name, petType, gender, weight, age, image } = petData;

  if (!name || !petType || !gender || !weight || !age) {
    Alert.alert('오류', '모든 필수 정보를 입력해주세요.');
    return;
  }

  try {
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      Alert.alert('오류', '로그인이 필요합니다.');
      return;
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('petType', petType);
    formData.append('gender', gender);
    formData.append('weight', weight);
    formData.append('age', age);

    if (image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'pet_image.jpg',
      });
    }

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/pets`, {
      method: 'POST',
      headers: {
        'Cookie': `JSESSIONID=${jsessionid}`,
      },
      body: formData,
    });

    if (response.ok) {
      Alert.alert('성공', '반려동물이 등록되었습니다.');
      navigation.goBack();
    } else {
      const errorData = await response.text();
      console.error('반려동물 등록 에러:', errorData);
      Alert.alert('오류', '반려동물 등록 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('반려동물 데이터 전송 에러:', error);
    Alert.alert('오류', '반려동물 등록 중 오류가 발생했습니다.');
  }
};
