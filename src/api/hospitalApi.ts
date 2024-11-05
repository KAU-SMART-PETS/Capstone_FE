import axios from "axios";


export const fetchHospitals = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.post(`${config.API_SERVER_URL}/api/v1/vets`, {
      latitude,
      longitude,
    });
    return response.data.vets.slice(0, 20);
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    throw error; 
  }
};

export const fetchHospitalInfo = async (vetId: number, latitude: number, longitude: number) => {
  try {
    const response = await axios.post(`${config.API_SERVER_URL}/api/v1/vets/${vetId}`, {
      latitude,
      longitude,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching hospital info:', error);
    throw error;
  }
};