import axios from 'axios';

export interface LoginInfo {
  memberId: number;
}

export interface PutVaccinationRequest {
  name: string;
  year: number;
  month: number;
  day: number;
}

export interface VaccinationResponse {
  pet: {
    name: string;
  };
  vaccination: {
    name: string;
    year: number;
    month: number;
    day: number;
  }[];
}

// 보건정보 수정
export const updateVaccination = async (
  petId: number,
  vaccinationId: number,
  data: { loginInfo: LoginInfo; request: PutVaccinationRequest }
) => {
  try {
    const response = await axios.put(
      `${config.API_LOCAL_URL}/api/v1/pets/${petId}/vaccination/${vaccinationId}`,
      data
    );
    return response.status === 204; // No Content
  } catch (error) {
    console.error('Error updating vaccination:', error);
    throw error;
  }
};

// 보건정보 삭제
export const deleteVaccination = async (petId: number, vaccinationId: number) => {
  try {
    const response = await axios.delete(
      `${config.API_LOCAL_URL}/api/v1/pets/${petId}/vaccination/${vaccinationId}`
    );
    return response.status === 204; // No Content
  } catch (error) {
    console.error('Error deleting vaccination:', error);
    throw error;
  }
};

// 보건정보 목록 조회
export const fetchVaccinations = async (petId: number) => {
  try {
    const response = await axios.get(
      `${config.API_LOCAL_URL}/api/v1/pets/${petId}/vaccination`
    );
    return response.data as VaccinationResponse;
  } catch (error) {
    console.error('Error fetching vaccinations:', error);
    throw error;
  }
};

// 보건정보 등록
export const registerVaccination = async (
  petId: number,
  data: { loginInfo: LoginInfo; request: PutVaccinationRequest }
) => {
  try {
    const response = await axios.post(
      `${config.API_LOCAL_URL}/api/v1/pets/${petId}/vaccination`,
      data
    );
    return response.status === 201; // Created
  } catch (error) {
    console.error('Error registering vaccination:', error);
    throw error;
  }
};
