import axios from 'axios';
import configUrl from '../../src/ConfigUrl';

const axiosInstance = axios.create({
  baseURL: `${configUrl.beBaseUrl}/api`, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('authTokenSitusNews')}` // Use backticks for token interpolation
  }
});

export default axiosInstance;
