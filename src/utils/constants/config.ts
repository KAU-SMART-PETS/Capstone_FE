import { Platform } from 'react-native';

const config = {
  API_BASE_URL: Platform.OS === 'android' ? 'http://10.0.2.2:3030' : 'http://localhost:3030',
};

export default config;
