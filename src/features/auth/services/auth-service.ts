import { apiClient } from '@/lib/axios';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/features/auth/types';

const AUTH_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  logout: '/auth/logout',
} as const;

export async function loginService(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.login, data);
  return response.data;
}

export async function registerService(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.register, {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return response.data;
}

export async function getMeService(): Promise<User> {
  const response = await apiClient.get<User>(AUTH_ENDPOINTS.me);
  return response.data;
}

export async function logoutService(): Promise<void> {
  await apiClient.post(AUTH_ENDPOINTS.logout);
}
