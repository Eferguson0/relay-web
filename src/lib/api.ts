import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// Create singleton Axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    timeout: 10000,
  });

  // Request interceptor to add auth token
  client.interceptors.request.use((config) => {
    const token = Cookies.get('relay_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
};

const apiClient = createApiClient();

// Typed API helpers
export const getJSON = async <T>(path: string, params?: Record<string, unknown>): Promise<T> => {
  const response = await apiClient.get(path, { params });
  return response.data;
};

export const postJSON = async <T>(path: string, body?: unknown): Promise<T> => {
  const response = await apiClient.post(path, body);
  return response.data;
};

export const putJSON = async <T>(path: string, body?: unknown): Promise<T> => {
  const response = await apiClient.put(path, body);
  return response.data;
};

export const deleteJSON = async <T>(path: string): Promise<T> => {
  const response = await apiClient.delete(path);
  return response.data;
};

export default apiClient;
