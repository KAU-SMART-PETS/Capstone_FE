import axios from 'axios';
import config from '@constants/config';
import { PetRegistRequest } from '@types';
import Pet1 from '@data/pets1.json';

// 반려동물 정보 등록
export const registerPet = async (data: { loginInfo: { memberId: number }; petRegistRequest: PetRegistRequest }) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/api/v1/pets`, data);
    return response.status === 201; // Created
  } catch (error) {
    console.error('Error registering pet:', error);
    throw error;
  }
};

// 반려동물 정보 조회
export const fetchPetInfo = async (petId: number) => {
  // try {
  //   const response = await axios.get(`${config.API_BASE_URL}/api/v1/pets/${petId}`);
  //   return response.data; // { name: "string", petType: "CAT", gender: "MALE", weight: 0, imageUrl: "string", age: 0 }
  // } catch (error) {
  //   console.error('Error fetching pet info:', error);
  //   throw error;
  // }
  return Pet1;
};

// 반려동물 정보 수정
export const updatePetInfo = async (petId: number, data: PetRegistRequest) => {
  try {
    await axios.patch(`${config.API_BASE_URL}/api/v1/pets/${petId}`, data);
    return { success: true }; // 200 OK
  } catch (error) {
    console.error('Error updating pet info:', error);
    throw error;
  }
};

// 반려동물 정보 삭제
export const deletePetInfo = async (petId: number) => {
  try {
    await axios.delete(`${config.API_BASE_URL}/api/v1/pets/${petId}`);
    return { success: true }; // 200 OK
  } catch (error) {
    console.error('Error deleting pet info:', error);
    throw error;
  }
};
