import axios, { AxiosInstance } from 'axios';
import { getEnvVars } from '../../Environment';

const { apiUrl } = getEnvVars();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: false
});

export default axiosInstance;
