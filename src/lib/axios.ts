import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { authStore } from '@/features/auth';
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
    const { accessToken } = authStore.getState();
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
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  },
);

// Auto-refresh on 401
const refreshAuthLogic = async () => {
  try {
    const { refreshToken } = authStore.getState();
    if (!refreshToken) {
      authStore.getState().logout();
      throw new Error('No refresh token');
    }

    const response = await axios.post(`${env.VITE_API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    authStore.getState().setTokens(accessToken, newRefreshToken);

    return Promise.resolve();
  } catch {
    authStore.getState().logout();
    return Promise.reject();
  }
};

createAuthRefreshInterceptor(apiClient, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});
