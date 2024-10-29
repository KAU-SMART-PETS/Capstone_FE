import AsyncStorage from "@react-native-async-storage/async-storage";
import { PetDetails } from "@constants/types";

const getPetDetails = async (petId: string): Promise<PetDetails | null> => {
  try {
    const response = await fetch(`http://52.79.140.133:8080/api/v1/pets/${petId}`, {
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

export default getPetDetails;
