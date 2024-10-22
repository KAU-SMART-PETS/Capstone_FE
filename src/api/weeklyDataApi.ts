import axios from 'axios';
import config from '@constants/config';
// import wd1 from '@data/weeklyData1.json';

export const fetchWeeklyData = async (petId : number) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/weeklyData`, {
      params: {
        petId: petId,
      },
    });
    return response.data[petId]; // 특정 petId의 데이터 반환
  } catch (error) {
    console.error('Error fetching weekly data:', error);
    throw error;
  }
  // return wd1;
};
