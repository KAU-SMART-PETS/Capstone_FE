import { PetDetails } from "@constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'http://52.79.140.133:8080/api/v1';

export const fetchUserPets = async (): Promise<string[]> => {
  try {
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      console.log('JSESSIONID not found');
      return [];
    }

    const response = await fetch(`${BASE_URL}/users/pets`, {
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

    const response = await fetch(`${BASE_URL}/pets/${petId}`, {
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