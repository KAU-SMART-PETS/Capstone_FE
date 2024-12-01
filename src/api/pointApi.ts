import axios from 'axios';

// 타입 정의
export interface LoginInfo {
  memberId: number;
}

export interface PointHistory {
  id: number;
  totalPoint: number;
  changePoint: number;
  name: string;
  date: string;
}

export interface PointHistoryResponse {
  history: PointHistory[];
}

export interface PayPointRequest {
  loginInfo: LoginInfo;
  request: {
    point: number;
  };
}

// 포인트 내역 조회
export const fetchPointHistory = async (memberId: number): Promise<PointHistoryResponse> => {
  try {
    const response = await axios.get(`${config.API_LOCAL_URL}/api/v1/points`, {
      params: { loginInfo: { memberId } },
    });
    return response.data as PointHistoryResponse;
  } catch (error) {
    console.error('Error fetching point history:', error);
    throw error;
  }
};

// 포인트 결제
export const payWithPoints = async (data: PayPointRequest): Promise<{ success: boolean }> => {
  try {
    await axios.patch(`${config.API_LOCAL_URL}/api/v1/points/payment`, data);
    return { success: true }; // 200 OK
  } catch (error) {
    console.error('Error paying with points:', error);
    throw error;
  }
};

// 포인트 적립
export const depositWithPoints = async (data: PayPointRequest): Promise<{ success: boolean }> => {
  try {
    await axios.patch(`${config.API_LOCAL_URL}/api/v1/points/deposit`, data);
    return { success: true }; // 200 OK
  } catch (error) {
    console.error('Error depositing points:', error);
    throw error;
  }
};
