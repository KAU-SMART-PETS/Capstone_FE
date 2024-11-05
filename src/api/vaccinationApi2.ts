import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';


export interface VaccinationResponse {
  pet: {
    name: string;
  };
  vaccination: {
    name: string;
    year: number;
    month: number;
    day: number;
  }[];
}

export const fetchHealthInfo = async (
  petId: number,
  setPetName: React.Dispatch<React.SetStateAction<string>>,
  setHealthInfo: React.Dispatch<React.SetStateAction<{ id: number; name: string; date: string }[]>>
) => {
  try {
    const jsessionId = await AsyncStorage.getItem('JSESSIONID');
    const response = await axios.get<VaccinationResponse>(`${config.API_SERVER_URL}/api/v1/pets/${petId}/vaccination`, {
      headers: {
        Cookie: `JSESSIONID=${jsessionId}`,
      },
    });

    const { pet, vaccination } = response.data;
    setPetName(pet.name);
    setHealthInfo(
      vaccination.map((v, index) => ({
        id: index, 
        name: v.name,
        date: `${v.year}${String(v.month).padStart(2, '0')}${String(v.day).padStart(2, '0')}`,
      }))
    );
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    Alert.alert('오류', '보건 정보를 불러오는 중 문제가 발생했습니다.');
  }
};

