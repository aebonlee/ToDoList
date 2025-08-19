import { useState, useEffect, useCallback } from 'react';
import { User, LoginRequest, RegisterRequest } from '../types/todo';
import authService from '../services/auth';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = authService.isAuthenticated();

  const initializeAuth = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const savedUser = authService.getUser();
        if (savedUser) {
          setUser(savedUser);
          // Try to refresh user profile
          try {
            const refreshedUser = await authService.refreshProfile();
            setUser(refreshedUser);
          } catch (err) {
            // If refresh fails, use saved user
            console.warn('Failed to refresh user profile, using cached data');
          }
        }
      }
    } catch (err) {
      console.error('Failed to initialize auth:', err);
      setError('인증 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      
      // 빠른 응답을 위한 타임아웃 처리
      const userData = await Promise.race([
        authService.login(credentials),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('로그인 요청 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.')), 15000)
        )
      ]);
      
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err?.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: RegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      
      // 빠른 응답을 위한 타임아웃 처리
      const newUser = await Promise.race([
        authService.register(userData),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('회원가입 요청 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.')), 15000)
        )
      ]);
      
      setUser(newUser);
    } catch (err: any) {
      const errorMessage = err?.message || '회원가입에 실패했습니다. 다시 시도해주세요.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    clearError,
  };
};