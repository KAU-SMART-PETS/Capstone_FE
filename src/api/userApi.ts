import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { UserData } from '@constants/types';

export const fetchUserProfile = async (): Promise<UserData | null> => {
  try {
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      console.log('JSESSIONID not found');
      return null;
    }
    const response = await fetch(`${config.API_SERVER_URL}/api/v1/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionid}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      await AsyncStorage.setItem('USER_DATA', JSON.stringify(userData));

      console.log(userData);
      
      return userData;
    } else {
      console.log('Failed to fetch user data:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const updateUserProfile = async (userInfo: UserData): Promise<boolean> => {
  try {
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      Alert.alert('오류', '로그인이 필요합니다.');
      return false;
    }

    const updateData = {
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      smsOptIn: userInfo.smsOptIn,
      emailOptIn: userInfo.emailOptIn,
    };

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionid}`,
      },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      await AsyncStorage.setItem('USER_DATA', JSON.stringify(userInfo));
      return true;
    } else {
      const responseText = await response.text();
      console.error('Failed to update user data:', responseText);
      Alert.alert('오류', '정보를 업데이트하는 중 오류가 발생했습니다.');
      return false;
    }
  } catch (error) {
    console.error('Error saving user data:', error);
    Alert.alert('오류', '정보를 저장하는 중 오류가 발생했습니다.');
    return false;
  }
};


