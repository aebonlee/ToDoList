# 컴포넌트 개발 가이드

## 🧩 컴포넌트 구조 개요

### 전체 컴포넌트 트리
```
App
├── HealthCheck (서버 상태 모니터링)
├── AuthFlow (인증되지 않은 사용자)
│   ├── LoginForm
│   └── RegisterForm
└── MainApp (인증된 사용자)
    ├── Header (사용자 정보, 로그아웃)
    └── TodoList
        ├── TodoForm (새 할 일 추가)
        ├── FilterTabs (상태별 필터)
        └── TodoItem[] (할 일 목록)
```

## 🔐 인증 컴포넌트

### LoginForm.tsx

#### 기능
- 이메일/비밀번호 입력
- 비밀번호 표시/숨김 토글
- 폼 유효성 검사
- 로딩 상태 표시
- 에러 메시지 표시
- 회원가입 모드 전환

#### 주요 Props
```typescript
interface LoginFormProps {
  onSubmit: (credentials: LoginRequest) => void;
  loading?: boolean;
  error?: string | null;
  onToggleMode: () => void;
}
```

#### 핵심 상태 관리
```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
```

#### 사용자 경험 최적화
```tsx
{/* 로딩 상태 시각화 */}
{loading && (
  <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
    <div className="flex items-center text-blue-800 text-sm">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
      로그인 중입니다... 잠시만 기다려주세요.
    </div>
  </div>
)}

{/* 에러 메시지 */}
{error && (
  <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
    <div className="text-red-800 text-sm">{error}</div>
  </div>
)}
```

### RegisterForm.tsx

#### 추가 기능
- 이름 입력 (선택사항)
- 비밀번호 확인
- 클라이언트 측 유효성 검증
- 실시간 검증 피드백

#### 유효성 검증 로직
```typescript
const validateForm = () => {
  if (!formData.email.trim()) {
    setValidationError('이메일을 입력해주세요.');
    return false;
  }
  if (formData.password.length < 6) {
    setValidationError('비밀번호는 최소 6자 이상이어야 합니다.');
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    setValidationError('비밀번호가 일치하지 않습니다.');
    return false;
  }
  return true;
};
```

## 📝 TODO 관리 컴포넌트

### TodoList.tsx

#### 주요 책임
- 전체 TODO 인터페이스 관리
- 필터링 상태 관리
- 통계 정보 표시
- 하위 컴포넌트 조율

#### 상태 관리
```typescript
const [filter, setFilter] = useState<FilterType>('all');

const filteredTodos = todos.filter(todo => {
  switch (filter) {
    case 'active': return !todo.completed;
    case 'completed': return todo.completed;
    default: return true;
  }
});

const completedCount = todos.filter(todo => todo.completed).length;
const activeCount = todos.length - completedCount;
```

#### 필터 탭 UI
```tsx
<div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
  {[
    { key: 'all', label: '전체', count: todos.length },
    { key: 'active', label: '진행 중', count: activeCount },
    { key: 'completed', label: '완료', count: completedCount },
  ].map(({ key, label, count }) => (
    <button
      key={key}
      onClick={() => setFilter(key as FilterType)}
      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
        filter === key
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {label} ({count})
    </button>
  ))}
</div>
```

### TodoItem.tsx

#### 핵심 기능
- 할 일 표시 및 편집
- 완료 상태 토글
- 인라인 편집 (더블클릭)
- 삭제 확인

#### 편집 모드 구현
```typescript
const [isEditing, setIsEditing] = useState(false);
const [editTitle, setEditTitle] = useState(todo.title);
const [editDescription, setEditDescription] = useState(todo.description || '');

const handleSave = () => {
  if (editTitle.trim()) {
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
    });
    setIsEditing(false);
  }
};

const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSave();
  } else if (e.key === 'Escape') {
    handleCancel();
  }
};
```

#### 시각적 상태 표시
```tsx
<div className={`border rounded-lg p-4 shadow-sm transition-all duration-200 ${
  todo.completed 
    ? 'bg-gray-50 border-gray-200' 
    : 'bg-white border-gray-300 hover:border-blue-300'
}`}>
  {/* 체크박스 */}
  <button
    onClick={() => onToggle(todo.id)}
    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
      todo.completed
        ? 'bg-blue-500 border-blue-500 text-white'
        : 'border-gray-300 hover:border-blue-400'
    }`}
  >
    {todo.completed && <CheckIcon className="w-3 h-3" />}
  </button>
  
  {/* 제목과 설명 */}
  <h3 className={`font-medium text-gray-900 ${
    todo.completed ? 'line-through text-gray-500' : ''
  }`}>
    {todo.title}
  </h3>
</div>
```

### TodoForm.tsx

#### 기능
- 새 할 일 추가
- 제목과 설명 입력
- 확장 가능한 폼 인터페이스
- 키보드 단축키 지원

#### 확장 가능한 UI 패턴
```typescript
const [isExpanded, setIsExpanded] = useState(false);

// 제목 입력에 포커스 시 폼 확장
<input
  onFocus={() => setIsExpanded(true)}
  placeholder="새로운 할 일을 입력하세요..."
/>

// 확장된 상태에서 설명 입력 필드 표시
{isExpanded && (
  <div className="space-y-2">
    <textarea
      placeholder="설명 (선택사항)"
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>
)}
```

## 🔧 유틸리티 컴포넌트

### HealthCheck.tsx

#### 기능
- 주기적 서버 상태 확인 (5분 간격)
- 실시간 연결 상태 표시
- 수동 재시도 기능
- 마지막 확인 시간 표시

#### 상태 관리
```typescript
const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
const [isChecking, setIsChecking] = useState(false);
const [lastChecked, setLastChecked] = useState<Date | null>(null);

const checkHealth = useCallback(async () => {
  try {
    setIsChecking(true);
    await apiService.healthCheck();
    setIsHealthy(true);
    setLastChecked(new Date());
    onStatusChange?.(true);
  } catch (error) {
    setIsHealthy(false);
    setLastChecked(new Date());
    onStatusChange?.(false);
  } finally {
    setIsChecking(false);
  }
}, [onStatusChange]);
```

#### 자동 모니터링 설정
```typescript
useEffect(() => {
  checkHealth();
  const interval = setInterval(checkHealth, 5 * 60 * 1000); // 5분
  return () => clearInterval(interval);
}, [checkHealth]);
```

#### 상태별 UI 렌더링
```tsx
// 연결 정상
if (isHealthy === true) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-2 mb-4">
      <div className="flex items-center text-green-700 text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        서버 연결 정상
        {lastChecked && (
          <span className="ml-1 text-green-600">
            (마지막 확인: {lastChecked.toLocaleTimeString()})
          </span>
        )}
      </div>
    </div>
  );
}

// 연결 실패
if (isHealthy === false) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-red-700 text-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          서버에 연결할 수 없습니다.
        </div>
        <button
          onClick={checkHealth}
          disabled={isChecking}
          className="text-red-600 hover:text-red-700 text-sm underline"
        >
          {isChecking ? '확인 중...' : '다시 시도'}
        </button>
      </div>
    </div>
  );
}
```

## 🎨 스타일링 가이드

### Tailwind CSS 클래스 패턴

#### 색상 시스템
```css
/* 주요 색상 */
.text-blue-600     /* 기본 액션 */
.text-green-600    /* 성공 상태 */
.text-red-600      /* 오류 상태 */
.text-yellow-600   /* 경고 상태 */
.text-gray-600     /* 보조 텍스트 */

/* 배경 색상 */
.bg-blue-50        /* 정보 배경 */
.bg-green-50       /* 성공 배경 */
.bg-red-50         /* 오류 배경 */
.bg-yellow-50      /* 경고 배경 */
```

#### 간격 시스템
```css
/* 패딩 */
.p-2    /* 8px */
.p-3    /* 12px */
.p-4    /* 16px */
.p-6    /* 24px */

/* 마진 */
.mb-2   /* margin-bottom: 8px */
.mb-4   /* margin-bottom: 16px */
.mb-6   /* margin-bottom: 24px */

/* 간격 */
.space-y-2 > * + *  /* vertical spacing: 8px */
.space-y-4 > * + *  /* vertical spacing: 16px */
.gap-2              /* grid/flex gap: 8px */
.gap-4              /* grid/flex gap: 16px */
```

#### 반응형 클래스
```css
/* 모바일 우선 */
.w-full            /* 기본: 100% */
.md:w-2/3          /* 768px+: 66.67% */
.lg:w-1/2          /* 1024px+: 50% */

.px-4              /* 기본: 16px 좌우 패딩 */
.sm:px-6           /* 640px+: 24px 좌우 패딩 */
.lg:px-8           /* 1024px+: 32px 좌우 패딩 */
```

### 컴포넌트별 스타일 패턴

#### 버튼 스타일
```tsx
// 기본 버튼
<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
  기본 버튼
</button>

// 보조 버튼
<button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  보조 버튼
</button>

// 위험 버튼
<button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
  삭제
</button>
```

#### 입력 필드 스타일
```tsx
<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed" />
```

#### 카드 스타일
```tsx
<div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
  카드 내용
</div>
```

## 🔄 상태 관리 패턴

### 로컬 상태 vs 전역 상태

#### 로컬 상태 (useState)
```typescript
// 폼 입력 상태
const [inputValue, setInputValue] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// UI 상태
const [isExpanded, setIsExpanded] = useState(false);
const [isEditing, setIsEditing] = useState(false);
```

#### 전역 상태 (Custom Hooks)
```typescript
// 사용자 인증 상태
const { user, login, logout, isAuthenticated } = useAuth();

// TODO 데이터 상태
const { todos, createTodo, updateTodo, deleteTodo } = useTodos();
```

### 상태 동기화 패턴

#### 서버 상태와 로컬 상태 동기화
```typescript
const [localTodos, setLocalTodos] = useState<Todo[]>([]);

// 서버에서 데이터 가져와서 로컬 상태 업데이트
useEffect(() => {
  const fetchTodos = async () => {
    try {
      const serverTodos = await apiService.getTodos();
      setLocalTodos(serverTodos);
    } catch (error) {
      // 에러 처리
    }
  };
  
  fetchTodos();
}, []);

// 낙관적 업데이트 패턴
const handleToggleTodo = async (id: string) => {
  // 즉시 UI 업데이트
  setLocalTodos(prev => prev.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
  
  try {
    // 서버에 변경사항 전송
    const updatedTodo = await apiService.toggleTodo(id);
    // 서버 응답으로 상태 동기화
    setLocalTodos(prev => prev.map(todo => 
      todo.id === id ? updatedTodo : todo
    ));
  } catch (error) {
    // 실패 시 원래 상태로 롤백
    setLocalTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    showError('할 일 상태 변경에 실패했습니다.');
  }
};
```

## 🧪 컴포넌트 테스팅 가이드

### 기본 테스트 패턴
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoItem } from './TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    title: '테스트 할 일',
    description: '테스트 설명',
    completed: false,
    createdAt: '2024-08-19T12:00:00Z',
    updatedAt: '2024-08-19T12:00:00Z',
  };

  const mockHandlers = {
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    onToggle: jest.fn(),
  };

  it('할 일 제목을 표시한다', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    expect(screen.getByText('테스트 할 일')).toBeInTheDocument();
  });

  it('완료 버튼 클릭 시 onToggle을 호출한다', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('button');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith('1');
  });

  it('더블클릭 시 편집 모드로 전환한다', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    const title = screen.getByText('테스트 할 일');
    fireEvent.doubleClick(title);
    
    expect(screen.getByDisplayValue('테스트 할 일')).toBeInTheDocument();
  });
});
```

### 비동기 테스트
```typescript
it('API 호출 후 상태가 업데이트된다', async () => {
  const mockApiCall = jest.fn().mockResolvedValue(mockTodos);
  
  render(<TodoList apiCall={mockApiCall} />);
  
  await waitFor(() => {
    expect(screen.getByText('테스트 할 일')).toBeInTheDocument();
  });
  
  expect(mockApiCall).toHaveBeenCalledTimes(1);
});
```

## 📱 접근성 가이드

### 키보드 네비게이션
```tsx
// Tab 순서와 키보드 이벤트
<input
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') handleCancel();
  }}
  aria-label="할 일 제목 입력"
/>
```

### ARIA 속성
```tsx
// 스크린 리더 지원
<button
  aria-label={todo.completed ? '완료 해제' : '완료 처리'}
  aria-pressed={todo.completed}
>
  <CheckIcon />
</button>

// 상태 알림
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {todos.length}개의 할 일이 있습니다.
</div>
```

### 색상 접근성
```css
/* 색상에만 의존하지 않고 아이콘/텍스트 병용 */
.success {
  @apply bg-green-50 text-green-800;
}
.success::before {
  content: "✓ ";
}

.error {
  @apply bg-red-50 text-red-800;
}
.error::before {
  content: "⚠ ";
}
```