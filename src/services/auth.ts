import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/todo';
import apiService from './api';

class AuthService {
  // Token management
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  // User management
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }

  // Auth state
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Auth actions
  async login(credentials: LoginRequest): Promise<User> {
    try {
      const response: AuthResponse = await apiService.login(credentials);
      this.setToken(response.token);
      this.setUser(response.user);
      return response.user;
    } catch (error) {
      throw new Error('로그인에 실패했습니다.');
    }
  }

  async register(userData: RegisterRequest): Promise<User> {
    try {
      const response: AuthResponse = await apiService.register(userData);
      this.setToken(response.token);
      this.setUser(response.user);
      return response.user;
    } catch (error) {
      throw new Error('회원가입에 실패했습니다.');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.logout();
    } catch (error) {
      console.warn('Logout API call failed, but clearing local storage');
    } finally {
      this.removeToken();
      this.removeUser();
    }
  }

  async refreshProfile(): Promise<User> {
    try {
      const user = await apiService.getProfile();
      this.setUser(user);
      return user;
    } catch (error) {
      this.logout();
      throw new Error('사용자 정보를 가져올 수 없습니다.');
    }
  }
}

export const authService = new AuthService();
export default authService;