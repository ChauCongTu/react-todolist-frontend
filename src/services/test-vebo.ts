import axios, { AxiosInstance } from 'axios';

const baseURL = 'https://api.vebo.xyz/api/';

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default instance;