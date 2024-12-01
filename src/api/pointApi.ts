
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '@constants/config';

// 포인트 적립 및 결제 내역 조회 (GET)
export const fetchPointHistory = async (): Promise<any | null> => {
  try {
    /*
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionId) {
      console.log('JSESSIONID not found');
      return null;
    }*/
   const jsessionId = "1EAF293F00CE06990659464BE59EA3D2"

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/points`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionId}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Failed to fetch point history:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching point history:', error);
    return null;
  }
};

// 포인트 사용 테스트 (PATCH)
export const usePoints = async (point: number): Promise<boolean> => {
  try {
    /*
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionId) {
      console.log('JSESSIONID not found');
      return false;
    }*/
   const jsessionId = "1EAF293F00CE06990659464BE59EA3D2"

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/points/payment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionId}`,
      },
      body: JSON.stringify({ point }),
    });

    if (response.ok) {
      console.log('Points used successfully');
      return true;
    } else {
      console.log('Failed to use points:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error using points:', error);
    return false;
  }
};

// 포인트 적립 테스트 (PATCH)
export const depositPoints = async (point: number): Promise<boolean> => {
  try {
    /*
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionId) {
      console.log('JSESSIONID not found');
      return false;
    }*/
   const jsessionId = "1EAF293F00CE06990659464BE59EA3D2"

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/points/deposit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionId}`,
      },
      body: JSON.stringify({ point }),
    });

    if (response.ok) {
      console.log('Points deposited successfully');
      return true;
    } else {
      console.log('Failed to deposit points:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error depositing points:', error);
    return false;
  }
};
