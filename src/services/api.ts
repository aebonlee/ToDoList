import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  Todo, 
  CreateTodoRequest, 
  UpdateTodoRequest, 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse 
} from '../types/todo';

class ApiService {
  private api: AxiosInstance;
  private baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000, // 10초 타임아웃
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        
        if (error.code === 'ECONNABORTED') {
          console.error('Request timeout');
          return Promise.reject(new Error('서버 응답 시간이 초과되었습니다. 다시 시도해주세요.'));
        }
        
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        
        if (error.response?.status >= 500) {
          return Promise.reject(new Error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'));
        }
        
        if (error.response?.status === 404) {
          return Promise.reject(new Error('요청한 리소스를 찾을 수 없습니다.'));
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Auth API
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/auth/register', userData);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post('/api/auth/logout');
  }

  async getProfile(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/api/auth/profile');
    return response.data;
  }

  // Todo API
  async getTodos(): Promise<Todo[]> {
    const response: AxiosResponse<Todo[]> = await this.api.get('/api/todos');
    return response.data;
  }

  async getTodoById(id: string): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.api.get(`/api/todos/${id}`);
    return response.data;
  }

  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.api.post('/api/todos', todoData);
    return response.data;
  }

  async updateTodo(id: string, todoData: UpdateTodoRequest): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.api.put(`/api/todos/${id}`, todoData);
    return response.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await this.api.delete(`/api/todos/${id}`);
  }

  async toggleTodo(id: string): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.api.patch(`/api/todos/${id}/toggle`);
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.api.get('/api/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;