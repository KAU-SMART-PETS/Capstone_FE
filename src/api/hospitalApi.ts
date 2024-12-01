import axios from "axios";


export const fetchHospitals = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.post(`${config.API_SERVER_URL}/api/v1/vets`, {
      latitude,
      longitude,
    });
    const formattedVets = response.data.vets.slice(0, 20).map((vet) => ({
      ...vet,
      address: formatAddress(vet.address), 
    }));

    return formattedVets;
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    throw error; 
  }
};

const formatAddress = (address) => {
  const match = address.match(/^([^ ]+ [^ ]+ [^ ]+ [^ ]+)/);
  return match ? match[1] : address;
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