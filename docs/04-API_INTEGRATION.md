# API 연동 가이드

## 🌐 백엔드 API 개요

### 기본 정보
- **Base URL**: `https://to-do-list-pog8.onrender.com`
- **API 버전**: v1
- **인증 방식**: JWT Bearer Token
- **데이터 형식**: JSON

### API 상태
```bash
# Health Check
GET /api/health
Response: { "status": "ok", "timestamp": "2024-08-19T..." }
```

## 🔐 인증 API

### 1. 사용자 등록
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "사용자명" // 선택사항
}
```

**응답 (성공)**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "사용자명",
    "createdAt": "2024-08-19T12:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. 로그인
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답 (성공)**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "사용자명",
    "createdAt": "2024-08-19T12:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. 사용자 프로필 조회
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

**응답**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "사용자명",
  "createdAt": "2024-08-19T12:00:00Z"
}
```

### 4. 로그아웃
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

## 📝 TODO API

### 1. 할 일 목록 조회
```http
GET /api/todos
Authorization: Bearer {token}
```

**응답**
```json
[
  {
    "id": "todo_123",
    "title": "할 일 제목",
    "description": "할 일 설명",
    "completed": false,
    "createdAt": "2024-08-19T12:00:00Z",
    "updatedAt": "2024-08-19T12:00:00Z",
    "userId": "user_123"
  }
]
```

### 2. 할 일 생성
```http
POST /api/todos
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "새로운 할 일",
  "description": "할 일 설명" // 선택사항
}
```

**응답**
```json
{
  "id": "todo_124",
  "title": "새로운 할 일",
  "description": "할 일 설명",
  "completed": false,
  "createdAt": "2024-08-19T12:01:00Z",
  "updatedAt": "2024-08-19T12:01:00Z",
  "userId": "user_123"
}
```

### 3. 할 일 수정
```http
PUT /api/todos/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "수정된 할 일",
  "description": "수정된 설명",
  "completed": true
}
```

### 4. 할 일 삭제
```http
DELETE /api/todos/{id}
Authorization: Bearer {token}
```

### 5. 할 일 완료 상태 토글
```http
PATCH /api/todos/{id}/toggle
Authorization: Bearer {token}
```

**응답**
```json
{
  "id": "todo_123",
  "title": "할 일 제목",
  "description": "할 일 설명",
  "completed": true, // 토글된 상태
  "createdAt": "2024-08-19T12:00:00Z",
  "updatedAt": "2024-08-19T12:05:00Z",
  "userId": "user_123"
}
```

## 🔧 클라이언트 구현

### API Service 클래스
```typescript
// src/services/api.ts
class ApiService {
  private api: AxiosInstance;
  private baseURL = 'https://to-do-list-pog8.onrender.com';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터 - JWT 토큰 자동 첨부
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 응답 인터셉터 - 에러 처리
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // 토큰 만료 시 자동 로그아웃
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // 인증 메서드
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post('/api/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post('/api/auth/register', userData);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post('/api/auth/logout');
  }

  async getProfile(): Promise<User> {
    const response = await this.api.get('/api/auth/profile');
    return response.data;
  }

  // TODO 메서드
  async getTodos(): Promise<Todo[]> {
    const response = await this.api.get('/api/todos');
    return response.data;
  }

  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    const response = await this.api.post('/api/todos', todoData);
    return response.data;
  }

  async updateTodo(id: string, todoData: UpdateTodoRequest): Promise<Todo> {
    const response = await this.api.put(`/api/todos/${id}`, todoData);
    return response.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await this.api.delete(`/api/todos/${id}`);
  }

  async toggleTodo(id: string): Promise<Todo> {
    const response = await this.api.patch(`/api/todos/${id}/toggle`);
    return response.data;
  }

  // 시스템 메서드
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.api.get('/api/health');
    return response.data;
  }
}

export const apiService = new ApiService();
```

### 타입 정의
```typescript
// src/types/todo.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

## ⚡ 성능 최적화

### 1. Request Timeout 관리
```typescript
// API 레벨 타임아웃 (10초)
const api = axios.create({
  timeout: 10000,
  // ...
});

// 사용자 경험 레벨 타임아웃 (15초)
const apiCallWithTimeout = async <T>(
  apiCall: Promise<T>,
  timeout: number = 15000
): Promise<T> => {
  return Promise.race([
    apiCall,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

// 사용 예시
const login = async (credentials: LoginRequest) => {
  return apiCallWithTimeout(
    apiService.login(credentials),
    15000
  );
};
```

### 2. 에러 분류 및 처리
```typescript
const handleApiError = (error: AxiosError): string => {
  console.error('API Error:', error);

  // 네트워크 타임아웃
  if (error.code === 'ECONNABORTED') {
    return '서버 응답 시간이 초과되었습니다. 다시 시도해주세요.';
  }

  // HTTP 상태 코드별 처리
  switch (error.response?.status) {
    case 400:
      return '잘못된 요청입니다. 입력 내용을 확인해주세요.';
    case 401:
      return '인증이 필요합니다. 다시 로그인해주세요.';
    case 403:
      return '권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 409:
      return '이미 존재하는 데이터입니다.';
    case 429:
      return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
    case 500:
    case 502:
    case 503:
    case 504:
      return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return error.message || '알 수 없는 오류가 발생했습니다.';
  }
};
```

### 3. 요청 재시도 로직
```typescript
const apiWithRetry = async <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as Error;
      
      // 마지막 시도가 아니면 대기 후 재시도
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError!;
};

// 사용 예시
const getTodosWithRetry = () => {
  return apiWithRetry(() => apiService.getTodos(), 3, 1000);
};
```

## 🔍 Health Check 시스템

### 주기적 서버 상태 확인
```typescript
// src/components/HealthCheck.tsx
export const HealthCheck: React.FC = ({ onStatusChange }) => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkHealth = useCallback(async () => {
    try {
      await apiService.healthCheck();
      setIsHealthy(true);
      setLastChecked(new Date());
      onStatusChange?.(true);
    } catch (error) {
      console.error('Health check failed:', error);
      setIsHealthy(false);
      setLastChecked(new Date());
      onStatusChange?.(false);
    }
  }, [onStatusChange]);

  useEffect(() => {
    checkHealth();
    // 5분마다 자동 확인
    const interval = setInterval(checkHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  // UI 렌더링 로직...
};
```

## 📊 API 모니터링

### 요청/응답 로깅
```typescript
// 개발 환경에서만 로깅
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use((config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('📤 Data:', config.data);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      console.log('📥 Data:', response.data);
      return response;
    },
    (error) => {
      console.error(`❌ API Error: ${error.config?.url}`);
      console.error('💥 Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
}
```

### 성능 메트릭 수집
```typescript
// API 호출 시간 측정
const measureApiPerformance = (apiCall: () => Promise<any>) => {
  return async () => {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const duration = performance.now() - startTime;
      
      console.log(`⏱️ API call took ${duration.toFixed(2)}ms`);
      
      // 느린 API 호출 경고
      if (duration > 5000) {
        console.warn('🐌 Slow API call detected');
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      console.error(`💥 API call failed after ${duration.toFixed(2)}ms`);
      throw error;
    }
  };
};
```

## 🚨 에러 시나리오 및 대응

### 1. 네트워크 연결 실패
```typescript
// 연결 실패 시 사용자에게 명확한 안내
if (error.code === 'NETWORK_ERROR') {
  showError('인터넷 연결을 확인해주세요.');
}
```

### 2. 서버 다운타임
```typescript
// 서버 오류 시 재시도 옵션 제공
if (error.response?.status >= 500) {
  showError('서버에 문제가 발생했습니다.', {
    action: '다시 시도',
    onClick: () => retryLastRequest()
  });
}
```

### 3. 토큰 만료
```typescript
// 자동 로그아웃 및 상태 정리
if (error.response?.status === 401) {
  localStorage.clear();
  setUser(null);
  navigate('/login');
  showError('세션이 만료되었습니다. 다시 로그인해주세요.');
}
```

### 4. 데이터 동기화 오류
```typescript
// 로컬 상태와 서버 상태 불일치 시
const syncData = async () => {
  try {
    const serverTodos = await apiService.getTodos();
    setTodos(serverTodos);
  } catch (error) {
    showError('데이터 동기화에 실패했습니다.', {
      action: '새로고침',
      onClick: () => window.location.reload()
    });
  }
};
```