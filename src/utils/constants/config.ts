import { Platform } from 'react-native';

const config = {
  API_LOCAL_URL: Platform.OS === 'android' ? 'http://10.0.2.2:3030' : 'http://localhost:3030',
  API_SERVER_URL: 'http://52.79.140.133:8080'
};
export default config;
