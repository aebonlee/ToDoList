# 기술 아키텍처 문서

## 🏗 시스템 아키텍처

### 전체 구조
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Components  │  │   Hooks     │  │  Services   │     │
│  │             │  │             │  │             │     │
│  │ - TodoList  │  │ - useAuth   │  │ - ApiService│     │
│  │ - TodoItem  │  │ - useTodos  │  │ - AuthServ  │     │
│  │ - AuthForms │  │             │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                            │
                    HTTP/REST API
                            │
┌─────────────────────────────────────────────────────────┐
│              Backend API Server                        │
│         https://to-do-list-pog8.onrender.com          │
└─────────────────────────────────────────────────────────┘
```

## 📁 폴더 구조

### 디렉토리 구성
```
src/
├── components/              # React 컴포넌트
│   ├── auth/               # 인증 관련 컴포넌트
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── todo/               # TODO 관련 컴포넌트
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoForm.tsx
│   └── common/             # 공통 컴포넌트
│       └── HealthCheck.tsx
├── hooks/                  # 커스텀 훅
│   ├── useAuth.ts         # 인증 상태 관리
│   └── useTodos.ts        # TODO 데이터 관리
├── services/               # 외부 서비스 연동
│   ├── api.ts             # API 클라이언트
│   └── auth.ts            # 인증 서비스
├── types/                  # TypeScript 타입 정의
│   └── todo.ts            # 데이터 모델
└── utils/                  # 유틸리티 함수
    └── constants.ts        # 상수 정의
```

## 🔧 핵심 컴포넌트 설계

### 1. API Service Layer

```typescript
// src/services/api.ts
class ApiService {
  private api: AxiosInstance;
  private baseURL: string;
  private timeout: number = 10000;

  constructor() {
    // Axios 인스턴스 생성
    // Request/Response 인터셉터 설정
    // 에러 처리 로직 구현
  }

  // 인증 API
  async login(credentials: LoginRequest): Promise<AuthResponse>
  async register(userData: RegisterRequest): Promise<AuthResponse>
  async logout(): Promise<void>
  
  // TODO API
  async getTodos(): Promise<Todo[]>
  async createTodo(data: CreateTodoRequest): Promise<Todo>
  async updateTodo(id: string, data: UpdateTodoRequest): Promise<Todo>
  async deleteTodo(id: string): Promise<void>
  async toggleTodo(id: string): Promise<Todo>
  
  // 시스템 API
  async healthCheck(): Promise<HealthStatus>
}
```

### 2. Custom Hooks

```typescript
// src/hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Promise.race 패턴으로 타임아웃 처리
  const login = useCallback(async (credentials: LoginRequest) => {
    const result = await Promise.race([
      authService.login(credentials),
      timeoutPromise(15000)
    ]);
    return result;
  }, []);

  return { user, loading, error, login, register, logout };
};

// src/hooks/useTodos.ts
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // CRUD 작업 함수들
  return { todos, loading, error, createTodo, updateTodo, deleteTodo };
};
```

### 3. Component Architecture

```typescript
// 컴포넌트 계층 구조
App
├── HealthCheck (서버 상태 모니터링)
├── AuthForm (로그인/회원가입)
│   ├── LoginForm
│   └── RegisterForm
└── TodoApp (인증 후 메인 앱)
    ├── Header (사용자 정보, 로그아웃)
    └── TodoList
        ├── TodoForm (새 할 일 추가)
        ├── FilterTabs (상태별 필터)
        └── TodoItem[] (할 일 목록)
            ├── EditMode (인라인 편집)
            └── Actions (수정/삭제 버튼)
```

## 🔐 인증 시스템

### JWT Token 관리
```typescript
// 토큰 저장 전략
localStorage.setItem('token', jwtToken);
localStorage.setItem('user', JSON.stringify(userData));

// 자동 토큰 첨부 (Axios Interceptor)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 토큰 만료 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 자동 로그아웃 및 로그인 페이지 리다이렉트
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 사용자 세션 관리
```typescript
// 앱 시작 시 세션 복원
useEffect(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  
  if (token && userData) {
    setUser(JSON.parse(userData));
    // 서버에서 사용자 정보 갱신
    refreshUserProfile();
  }
}, []);
```

## 📡 API 통신

### Request/Response Flow
```
1. Component → Hook → Service → API Server
2. API Server → Service → Hook → Component (state update)
3. Component Re-render (UI 업데이트)
```

### Error Handling Strategy
```typescript
// 에러 분류 및 처리
const handleApiError = (error: AxiosError) => {
  if (error.code === 'ECONNABORTED') {
    return '서버 응답 시간이 초과되었습니다.';
  }
  
  switch (error.response?.status) {
    case 401:
      return '인증이 필요합니다.';
    case 403:
      return '권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 500:
      return '서버에 문제가 발생했습니다.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};
```

### Request Timeout Management
```typescript
// 다층 타임아웃 시스템
const API_TIMEOUT = 10000;      // Axios 레벨 (10초)
const USER_TIMEOUT = 15000;     // 사용자 경험 레벨 (15초)

// Axios 설정
const api = axios.create({
  timeout: API_TIMEOUT,
  // ...기타 설정
});

// Promise.race 패턴
const apiCallWithTimeout = async <T>(
  apiCall: Promise<T>, 
  timeout: number = USER_TIMEOUT
): Promise<T> => {
  return Promise.race([
    apiCall,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};
```

## 🎨 UI/UX 아키텍처

### Tailwind CSS Design System
```css
/* 색상 시스템 */
--primary: blue-500     /* 주요 액션 */
--success: green-500    /* 성공 상태 */
--warning: yellow-500   /* 경고 상태 */
--danger: red-500       /* 오류 상태 */
--gray: gray-500        /* 중성 색상 */

/* 간격 시스템 */
--space-xs: 0.25rem     /* 4px */
--space-sm: 0.5rem      /* 8px */
--space-md: 1rem        /* 16px */
--space-lg: 1.5rem      /* 24px */
--space-xl: 2rem        /* 32px */

/* 타이포그래피 */
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
```

### 반응형 디자인
```typescript
// Breakpoint 시스템
const breakpoints = {
  sm: '640px',    // 모바일
  md: '768px',    // 태블릿
  lg: '1024px',   // 데스크톱
  xl: '1280px',   // 대형 데스크톱
};

// 컴포넌트별 반응형 클래스
<div className="
  w-full               /* 모바일: 전체 너비 */
  md:w-2/3            /* 태블릿: 2/3 너비 */
  lg:w-1/2            /* 데스크톱: 1/2 너비 */
  max-w-4xl           /* 최대 너비 제한 */
  mx-auto             /* 중앙 정렬 */
  px-4                /* 좌우 패딩 */
  sm:px-6             /* 태블릿 이상 패딩 */
  lg:px-8             /* 데스크톱 패딩 */
">
```

## 📊 상태 관리

### Local State Pattern
```typescript
// 컴포넌트별 지역 상태
const [localData, setLocalData] = useState<LocalData>(initialData);

// 서버 상태와 동기화
useEffect(() => {
  const syncData = async () => {
    try {
      const serverData = await apiService.getData();
      setLocalData(serverData);
    } catch (error) {
      // 에러 처리
    }
  };
  
  syncData();
}, []);
```

### Global State via Custom Hooks
```typescript
// 전역 상태는 커스텀 훅으로 관리
const useGlobalAuth = () => {
  // Context나 외부 상태 관리 라이브러리 없이
  // localStorage와 useState 조합으로 구현
  
  const [user, setUser] = useState(getStoredUser());
  
  const login = useCallback(async (credentials) => {
    const userData = await authService.login(credentials);
    setUser(userData);
    storeUser(userData);
  }, []);
  
  return { user, login, logout };
};
```

## 🚀 성능 최적화

### Bundle Optimization
```javascript
// Webpack Bundle Analyzer 결과
{
  "main.js": "79.95 KB (gzipped)",
  "vendor.js": "포함됨",
  "css": "3.92 KB (gzipped)",
  "total": "< 84 KB"
}

// 최적화 기법
- Tree Shaking (사용하지 않는 코드 제거)
- Code Splitting (미래 확장 시)
- Lazy Loading (컴포넌트별)
- Asset Optimization (이미지, 폰트)
```

### Runtime Performance
```typescript
// useCallback으로 함수 메모이제이션
const handleSubmit = useCallback((data: FormData) => {
  // 폼 제출 로직
}, [dependency]);

// useMemo로 계산 결과 캐싱
const filteredTodos = useMemo(() => {
  return todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });
}, [todos, filter]);

// 조건부 렌더링으로 불필요한 연산 방지
{shouldRender && <ExpensiveComponent />}
```

## 🔧 개발 도구 및 설정

### Build Configuration
```javascript
// package.json scripts
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "serve": "serve -s build",
  "build:prod": "REACT_APP_API_URL=... npm run build"
}

// TypeScript 설정 (tsconfig.json)
{
  "compilerOptions": {
    "target": "es5",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Development Environment
```bash
# 환경 변수 (.env)
PORT=3001
REACT_APP_API_URL=https://to-do-list-pog8.onrender.com
GENERATE_SOURCEMAP=false

# Git Hooks (권장)
pre-commit: lint-staged
pre-push: npm run build && npm test
```

## 📈 모니터링 및 로깅

### Health Check System
```typescript
// 주기적 서버 상태 확인
const useHealthCheck = () => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await apiService.healthCheck();
        setIsHealthy(true);
      } catch {
        setIsHealthy(false);
      }
    };
    
    checkHealth();
    const interval = setInterval(checkHealth, 5 * 60 * 1000); // 5분
    return () => clearInterval(interval);
  }, []);
  
  return isHealthy;
};
```

### Error Tracking
```typescript
// 프로덕션 환경에서 에러 로깅
const logError = (error: Error, context: string) => {
  console.error(`[${context}]`, error);
  
  // 프로덕션에서는 외부 서비스로 전송
  if (process.env.NODE_ENV === 'production') {
    // Sentry, LogRocket 등 연동
  }
};
```