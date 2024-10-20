import axios from 'axios';
import config from '@constants/config';

// 타입 정의
export interface Alarm {
  id: number;
  text: string;
}

export interface AlarmResponse {
  alarm: Alarm[];
}

// 알람 목록 조회
export const fetchAlarms = async (memberId: number): Promise<AlarmResponse> => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/api/v1/alarm`, {
      params: { loginInfo: { memberId } },
    });
    return response.data as AlarmResponse; // AlarmResponse 타입으로 반환
  } catch (error) {
    console.error('Error fetching alarms:', error);
    throw error;
  }
};
