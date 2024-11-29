import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
// 산책 기록 요청 타입 정의
export interface WalkRecordRequest {
  dataInpDt: string;    // 측정일자
  step: number;         // 걸음 수
  tLux: number;         // 누적 조도량
  avgK: number;         // 평균 색온도
  avgLux: number;       // 평균 조도량
  startTime: string;    // 산책 시작 시간
  endTime: string;      // 산책 종료 시간
  distance: number;     // 산책 거리 (미터)
  walkingTime: number;  // 산책 시간 (초)
}

// 산책 기록 POST 함수
export const registerWalkRecord = async (
    petId: string,
    walkData: WalkRecordRequest
  ): Promise<boolean> => {
    try {
      // AsyncStorage에서 JSESSIONID 가져오기
      const jsessionid = await AsyncStorage.getItem('JSESSIONID');
      if (!jsessionid) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return false;
      }
  
      // API URL 설정
      const apiUrl = `http://52.79.140.133:8080/api/v1/walk/register/${petId}`;
  
      // 디버깅 로그
      console.log('POST 요청 URL:', apiUrl);
      console.log('요청 바디:', walkData);
  
      // POST 요청 보내기
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형태
          'Cookie': `JSESSIONID=${jsessionid}`, // JSESSIONID를 쿠키에 포함
        },
        body: JSON.stringify(walkData), // JSON 형태로 데이터 변환
      });
  
      // 응답 처리
      if (response.ok) {
        const responseData = await response.json();
  
        console.log('산책 기록 저장 성공:', responseData);
  
        // 필요한 데이터 예시: 거리와 칼로리
        const { distance, calories } = responseData;
        Alert.alert(
          '성공',
          `산책 기록이 저장되었습니다.\n거리: ${distance}km\n소모 칼로리: ${calories}kcal`
        );
  
        return true;
      } else {
        const errorData = await response.text();
        console.error(`산책 기록 저장 실패: ${response.status}`, errorData);
        Alert.alert('오류', `산책 기록 저장 실패: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error('산책 기록 저장 중 오류 발생:', error);
      Alert.alert('오류', '산책 기록 저장 중 문제가 발생했습니다.');
      return false;
    }
  };
  
// 산책 기록 GET 함수
export const fetchRecentWalkRecords = async (): Promise<any | null> => {
  try {
    // Retrieve JSESSIONID from AsyncStorage
    const jsessionid = await AsyncStorage.getItem('JSESSIONID');
    if (!jsessionid) {
      console.error('JSESSIONID not found');
      return null;
    }

    // API URL for fetching recent walk records
    const apiUrl = `http://52.79.140.133:8080/api/v1/walk/recent`;

    // Log debug information
    console.log('Fetching recent walk records from:', apiUrl);

    // Make the GET request
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
        'Cookie': `JSESSIONID=${jsessionid}`, // Attach JSESSIONID in the Cookie header
      },
    });

    // Handle the response
    if (response.status === 200) {
      console.log('Fetched recent walk records successfully:', response.data);
      return response.data; // Return the fetched data
    } else {
      console.error(`Failed to fetch recent walk records: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching recent walk records:', error);
    return null;
  }
};


// 반려동물 목록 GET 함수
export const fetchPetList = async (): Promise<any | null> => {
    try {
      // Retrieve JSESSIONID from AsyncStorage
      const jsessionid = await AsyncStorage.getItem('JSESSIONID');
      if (!jsessionid) {
        console.error('JSESSIONID not found');
        return null;
      }
  
      // API URL for fetching recent walk records
      const apiUrl = `http://52.79.140.133:8080/api/v1/users/pets`;
  
      // Log debug information
      console.log('반려동물 목록 불러오는 api:', apiUrl);
  
      // Make the GET request
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
          'Cookie': `JSESSIONID=${jsessionid}`, // Attach JSESSIONID in the Cookie header
        },
      });
  
      // Handle the response
      if (response.status === 200) {
        console.log('반려동물 목록 불러오기 성공:', response.data);
        return response.data; // Return the fetched data
      } else {
        console.error(`반려동물 목록 불러오기 실패: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching 반려동물 목록 records:', error);
      return null;
    }
  };