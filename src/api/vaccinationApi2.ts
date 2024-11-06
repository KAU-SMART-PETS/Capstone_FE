import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';


export interface VaccinationResponse {
  pet: {
    name: string;
  };
  vaccination: {
    id: number;
    name: string;
    year: number;
    month: number;
    day: number;
  }[];
}

export const fetchHealthInfo = async (petId: number) => {
  try {
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    const response = await axios.get<VaccinationResponse>(
      `${config.API_SERVER_URL}/api/v1/pets/${petId}/vaccination`,
      {
        headers: {
          Cookie: `JSESSIONID=${jsessionId}`,
        },
      }
    );

    const { pet, vaccination } = response.data;
    const healthInfo = vaccination.map(v => ({
      id: v.id,
      name: v.name,
      date: `${v.year}${String(v.month).padStart(2, '0')}${String(v.day).padStart(2, '0')}`,
    }));

    return { petName: pet.name, healthInfo };
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
    Alert.alert('오류', '보건 정보를 불러오는 중 문제가 발생했습니다.');
    return { petName: '', healthInfo: [] };
  }
};

// 보건 정보 추가 함수
export const addVaccination = async (petId: number, name: string, date: string) => {
  try {
    const year = parseInt(date.slice(0, 4), 10);
    const month = parseInt(date.slice(4, 6), 10);
    const day = parseInt(date.slice(6, 8), 10);
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');

    await axios.post(
      `${config.API_SERVER_URL}/api/v1/pets/${petId}/vaccination`,
      { name, year, month, day },
      { headers: { Cookie: `JSESSIONID=${jsessionId}` } }
    );

    Alert.alert('추가 성공', '새로운 보건 정보가 추가되었습니다.');
  } catch (error) {
    console.error('서버 요청 중 오류:', error);
    Alert.alert('오류', '서버에 데이터를 전송하는 중 문제가 발생했습니다.');
  }
};

// 보건 정보 수정 함수
export const updateVaccination = async (
  petId: number,
  vaccinationId: number,
  name: string,
  date: string
) => {
  try {
    const year = parseInt(date.slice(0, 4), 10);
    const month = parseInt(date.slice(4, 6), 10);
    const day = parseInt(date.slice(6, 8), 10);
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');

    await axios.put(
      `${config.API_SERVER_URL}/api/v1/pets/${petId}/vaccination/${vaccinationId}`,
      { name, year, month, day },
      { headers: { Cookie: `JSESSIONID=${jsessionId}` } }
    );

    Alert.alert('수정 성공', '보건 정보가 수정되었습니다.');
  } catch (error) {
    console.error('서버 요청 중 오류:', error);
    Alert.alert('오류', '서버에 데이터를 전송하는 중 문제가 발생했습니다.');
  }
};

// 보건 정보 삭제 함수
export const deleteVaccination = async (petId: number, vaccinationId: number) => {
  try {
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    await axios.delete(`${config.API_SERVER_URL}/api/v1/pets/${petId}/vaccination/${vaccinationId}`, {
      headers: {
        Cookie: `JSESSIONID=${jsessionId}`,
      },
    });

    Alert.alert('삭제 성공', '보건 정보가 삭제되었습니다.');
  } catch (error) {
    console.error('삭제 오류:', error);
    if (error.response && error.response.status === 404) {
      Alert.alert('오류', '삭제하려는 보건 정보를 찾을 수 없습니다.');
    } else {
      Alert.alert('오류', '보건 정보를 삭제하는 중 문제가 발생했습니다.');
    }
  }
};

