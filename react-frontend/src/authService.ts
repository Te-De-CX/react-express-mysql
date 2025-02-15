// authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle token refreshing
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/refresh-token', { refreshToken });
        localStorage.setItem('token', response.data.token);
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // Redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const signup = async (username: string, password: string) => {
  try {
    const response = await api.post('/signup', { username, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const signin = async (username: string, password: string) => {
  try {
    const response = await api.post('/signin', { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Signin failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const signout = async () => {
  try {
    const response = await api.post('/signout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Signout failed');
    }
    throw new Error('An unexpected error occurred');
  }
};