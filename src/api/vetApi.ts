import axios from 'axios';

// 타입 정의
export interface MemberLocationRequest {
  latitude: number;
  longitude: number;
}

export interface VetResponse {
  id: number;
  name: string;
  address: string;
  telephone: string;
}

export interface VetsResponse {
  vets: VetResponse[];
}

// 동물병원 목록 조회
export const fetchVets = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.post(`${config.API_LOCAL_URL}/api/v1/vets`, {
      latitude,
      longitude,
    });
    return response.data as VetsResponse;
  } catch (error) {
    console.error('Error fetching vets:', error);
    throw error;
  }
};

// 동물병원 세부 정보 조회
export const fetchVetDetail = async (vetId: number, latitude: number, longitude: number) => {
  try {
    const response = await axios.post(`${config.API_LOCAL_URL}/api/v1/vets/${vetId}`, {
      latitude,
      longitude,
    });
    return response.data; // VetDetailResponse 타입으로 반환
  } catch (error) {
    console.error('Error fetching vet details:', error);
    throw error;
  }
};
