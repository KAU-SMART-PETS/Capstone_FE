import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 일자 별 산책 데이터 GET 함수
export const fetchDailyWalkRecord = async (petId: string, date: string): Promise<any | null> => {
  try {
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      console.error('JSESSIONID not found');
      return null;
    }

    const apiUrl = `http://52.79.140.133:8080/api/v1/walk/daily/${petId}?date=${date}`;
    console.log('Fetching daily walk record from:', apiUrl);

    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionid}`,
      },
    });

    if (response.status === 200) {
      console.log('Fetched daily walk record successfully:', response.data);
      return response.data;
    } else {
      console.error(`Failed to fetch daily walk record: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching daily walk record:', error);
    return null;
  }
};

// 한달에 산책한 날짜만 GET 함수 (발바닥 표시하려고)
export const fetchMonthlyWalkRecord = async (petId: string, year: number, month: number): Promise<any | null> => {
    try {
      const jsessionid = await AsyncStorage.getItem('JSESSIONID');
      if (!jsessionid) {
        console.error('JSESSIONID not found');
        return null;
      }
  
      const apiUrl = `http://52.79.140.133:8080/api/v1/walk/monthly/${petId}?year=${year}&month=${month}`;
      console.log('Fetching monthly walk record from:', apiUrl);
  
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `JSESSIONID=${jsessionid}`,
        },
      });
  
      if (response.status === 200) {
        console.log('Fetched monthly walk record successfully:', response.data);
        return response.data;
      } else {
        console.error(`Failed to fetch monthly walk record: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching monthly walk record:', error);
      return null;
    }
  };


  // 주간 산책 데이터 GET 함수
export const fetchWeeklyWalkRecord = async (petId: string, date: string): Promise<any | null> => {
    try {
      const jsessionid = await AsyncStorage.getItem('JSESSIONID');
      if (!jsessionid) {
        console.error('JSESSIONID not found');
        return null;
      }
  
      const apiUrl = `http://52.79.140.133:8080/api/v1/walk/weekly/${petId}?date=${date}`;
      console.log('Fetching weekly walk record from:', apiUrl);
  
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `JSESSIONID=${jsessionid}`,
        },
      });
  
      if (response.status === 200) {
        console.log('Fetched weekly walk record successfully:', response.data);
        return response.data; // API에서 받은 주간 데이터 반환
      } else {
        console.error(`Failed to fetch weekly walk record: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching weekly walk record:', error);
      return null;
    }
  };
  