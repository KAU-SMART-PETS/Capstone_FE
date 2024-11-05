import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@constants/config';
// TODO : 현재 
// 사료 목록 조회 API 호출
export const foodsList = async () => {
  try {
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionId) {
      console.log('JSESSIONID not found');
      return null;
    }

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/foods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionId}`,
      },
    });

    if (response.ok) {
      const foodsData = await response.json();
      return foodsData;
    } else {
      console.log('Failed to fetch foods:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching foods:', error);
    return null;
  }
};

// 사료 포인트 결제 API 호출
//NOTE : 현재 배송비 기본값 2500으로 설정하였음.
export const purchaseFood = async (foodId: number, deliveryFee: number = 2500) => {
  try {
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionId) {
      console.log('JSESSIONID not found');
      return null;
    }

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/foods/${foodId}/points/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionId}`,
      },
      body: JSON.stringify({ deliveryFee }),
    });

    if (response.ok) {
      const paymentData = await response.json();
      console.log('Payment successful:', paymentData);
      return paymentData;
    } else {
      console.log('Failed to make payment:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error making payment:', error);
    return null;
  }
};
