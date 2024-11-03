import { PetDetails } from "@constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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