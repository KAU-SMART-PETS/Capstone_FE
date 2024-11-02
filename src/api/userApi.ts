import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const handleLogout = async (): Promise<boolean> => {
  try {
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      console.log('JSESSIONID not found');
      return false;
    }

    const response = await fetch(`${config.API_SERVER_URL}/api/v1/oaauth2/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionid}`,
      },
    });

    if (response.ok) {
      await AsyncStorage.removeItem('JSESSIONID');
      await AsyncStorage.removeItem('USER_DATA');
      return true;
    } else {
      console.log('Failed to logout:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};