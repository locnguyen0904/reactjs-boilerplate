import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import {
  loginService,
  registerService,
  getMeService,
  logoutService,
} from '@/features/auth/services/auth-service';
import type { LoginRequest, RegisterRequest } from '@/features/auth/types';

const AUTH_KEYS = {
  me: ['auth', 'me'] as const,
} as const;

export function useUser() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: getMeService,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginService(data),
    onSuccess: (response) => {
      setAuth(response.user, response.accessToken, response.refreshToken);
      navigate({ to: '/dashboard' });
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerService(data),
    onSuccess: (response) => {
      setAuth(response.user, response.accessToken, response.refreshToken);
      navigate({ to: '/dashboard' });
    },
  });
}

export function useLogout() {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      logout();
      queryClient.clear();
      navigate({ to: '/login' });
    },
    onError: () => {
      logout();
      queryClient.clear();
      navigate({ to: '/login' });
    },
  });
}
