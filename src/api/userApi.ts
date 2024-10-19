import axios from 'axios';
import config from '@constants/config';

// 타입 정의
export interface MemberInfoResponse {
  name: string;
  email: string;
  phoneNumber: string;
  point: number;
  socialSite: string;
  smsOptIn: boolean;
  emailOptIn: boolean;
}

// 사용자 정보 조회
export const fetchUserInfo = async (memberId: number) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/api/v1/users`, {
      params: { loginInfo: { memberId } },
    });
    return response.data as MemberInfoResponse;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// 사용자 정보 수정
export const updateUserInfo = async (memberId: number, data: { email: string; phoneNumber: string; smsOptIn: boolean; emailOptIn: boolean; }) => {
  try {
    await axios.patch(`${config.API_BASE_URL}/api/v1/users`, {
      loginInfo: { memberId },
      request: data,
    });
    return { success: true }; // 204 No Content
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

// 사용자가 등록한 반려동물 목록 조회
export const fetchUserPets = async (memberId: number) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/api/v1/users/pets`, {
      params: { loginInfo: { memberId } },
    });
    return response.data; // { pets: [{ id: 0, name: "string", imageUrl: "string" }] }
  } catch (error) {
    console.error('Error fetching user pets:', error);
    throw error;
  }
};
