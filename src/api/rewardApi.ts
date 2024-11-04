import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@constants/config';

// 리워드 목록 조회 API 호출
export const rewardsList = async () => {
  try {
    /*
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionId) {
      console.log('JSESSIONID not found');
      return null;
    }*/
    const jsessionId = "9518A6550FED09FF26C40A31B3DBDBCF";

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/rewards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionId}`,
      },
    });

    if (response.ok) {
      const rewardsData = await response.json();
      return rewardsData;
    } else {
      console.log('Failed to fetch rewards:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching rewards:', error);
    return null;
  }
};

// 리워드 포인트 적립 API 호출
export const depositRewardPoints = async (rewardId: number) => {
  try {
    /*
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionId) {
      console.log('JSESSIONID not found');
      return null;
    }*/
   const jsessionId = "9518A6550FED09FF26C40A31B3DBDBCF"

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/rewards/${rewardId}/points/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionId}`,
      },
    });

    if (response.ok) {
      const depositData = await response.json();
      console.log('Points deposited successfully:', depositData);
      return depositData;
    } else {
      console.log('Failed to deposit points:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error depositing reward points:', error);
    return null;
  }
};
