import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { env } from '@/config/env';

export const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach access token
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: Normalize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred';

    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  },
);

// Auto-refresh on 401
const refreshAuthLogic = async () => {
  try {
    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) {
      useAuthStore.getState().logout();
      throw new Error('No refresh token');
    }

    const response = await axios.post(`${env.VITE_API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    useAuthStore.getState().setTokens(accessToken, newRefreshToken);

    return Promise.resolve();
  } catch {
    useAuthStore.getState().logout();
    return Promise.reject();
  }
};

createAuthRefreshInterceptor(apiClient, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});
