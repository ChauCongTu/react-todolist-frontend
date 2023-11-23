import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://127.0.0.1:8000/api';

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Interceptor để tự động thêm token vào headers nếu có
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Thay 'yourTokenKey' bằng key lưu trữ token của bạn

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
