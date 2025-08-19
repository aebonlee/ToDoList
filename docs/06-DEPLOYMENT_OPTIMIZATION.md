# 배포 최적화 가이드

## 🚀 배포 플랫폼별 최적화

### 1. Netlify 배포 (권장)

#### 배포 설정
```toml
# public/netlify.toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  REACT_APP_API_URL = "https://to-do-list-pog8.onrender.com"
  NODE_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# 성능 최적화 헤더
[[headers]]
  for = "/static/*"
  [headers.values]
    cache-control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    cache-control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    cache-control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/index.html"
  [headers.values]
    cache-control = "public, max-age=0, must-revalidate"
```

#### 자동 배포 설정
```yaml
# .github/workflows/netlify-deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './build'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 2. Render 배포

#### 정적 사이트 설정
```yaml
# render.yaml
services:
  - type: web
    name: todo-app-frontend
    env: static
    buildCommand: npm ci && npm run build
    staticPublishPath: ./build
    pullRequestPreviewsEnabled: true
    
    # Custom Headers for Performance
    headers:
      - path: /static/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /*.js
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /*.css
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /index.html
        name: Cache-Control
        value: public, max-age=0, must-revalidate
    
    # SPA 라우팅 지원
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    
    envVars:
      - key: REACT_APP_API_URL
        value: https://to-do-list-pog8.onrender.com
      - key: NODE_ENV
        value: production
      - key: GENERATE_SOURCEMAP
        value: false
```

### 3. Vercel 배포

#### vercel.json 설정
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_URL": "https://to-do-list-pog8.onrender.com"
  }
}
```

## 📦 빌드 최적화

### 1. 번들 크기 최적화

#### 현재 성과
```bash
# 최적화된 번들 크기
File sizes after gzip:
  79.95 kB  build/static/js/main.js     # React + 앱 코드
  3.92 kB   build/static/css/main.css   # Tailwind CSS
  1.77 kB   build/static/js/vendor.js   # 분리된 의존성
```

#### Bundle Analyzer 설정
```bash
# 의존성 설치
npm install --save-dev webpack-bundle-analyzer

# package.json에 스크립트 추가
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}

# 분석 실행
npm run analyze
```

#### 코드 스플리팅 (미래 확장)
```typescript
// 라우트별 코드 스플리팅
import { lazy, Suspense } from 'react';

const TodoList = lazy(() => import('./components/TodoList'));
const Settings = lazy(() => import('./components/Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. 이미지 최적화

#### WebP 형식 지원
```typescript
// 이미지 최적화 유틸리티
const optimizeImage = (src: string) => {
  const img = new Image();
  img.src = src;
  
  // WebP 지원 확인
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx?.drawImage(img, 0, 0);
  
  return canvas.toDataURL('image/webp', 0.8);
};
```

#### 반응형 이미지
```tsx
// 다양한 화면 크기에 대응
<picture>
  <source
    media="(min-width: 768px)"
    srcSet="logo-large.webp"
    type="image/webp"
  />
  <source
    media="(min-width: 768px)"
    srcSet="logo-large.png"
    type="image/png"
  />
  <img
    src="logo-small.png"
    alt="TODO App Logo"
    loading="lazy"
  />
</picture>
```

### 3. CSS 최적화

#### Tailwind CSS Purging
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 프로덕션에서 사용하지 않는 클래스 제거
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,jsx,ts,tsx}']
  }
}
```

#### Critical CSS 인라인화
```html
<!-- public/index.html -->
<style>
  /* 초기 렌더링에 필요한 최소 CSS */
  .loading-spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
```

## ⚡ 성능 최적화

### 1. React 컴포넌트 최적화

#### 메모이제이션 전략
```typescript
// React.memo로 불필요한 리렌더링 방지
const TodoItem = React.memo(({ todo, onUpdate, onDelete }: TodoItemProps) => {
  // 컴포넌트 로직...
}, (prevProps, nextProps) => {
  // 커스텀 비교 함수
  return prevProps.todo.id === nextProps.todo.id &&
         prevProps.todo.completed === nextProps.todo.completed &&
         prevProps.todo.title === nextProps.todo.title;
});

// useCallback으로 함수 메모이제이션
const handleUpdate = useCallback((id: string, data: UpdateTodoRequest) => {
  updateTodo(id, data);
}, [updateTodo]);

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
```

#### 가상화 (대용량 데이터용)
```typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedTodoList = ({ todos }: { todos: Todo[] }) => {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      <TodoItem todo={todos[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={todos.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

### 2. API 호출 최적화

#### 요청 디바운싱
```typescript
import { debounce } from 'lodash';

const useDebounceApi = (apiCall: Function, delay: number = 300) => {
  const debouncedCall = useCallback(
    debounce((...args: any[]) => {
      return apiCall(...args);
    }, delay),
    [apiCall, delay]
  );

  return debouncedCall;
};

// 사용 예시: 검색 API
const searchTodos = useDebounceApi(apiService.searchTodos, 500);
```

#### 요청 캐싱
```typescript
const cache = new Map<string, { data: any; timestamp: number }>();

const cachedApiCall = async <T>(
  key: string, 
  apiCall: () => Promise<T>, 
  ttl: number = 5 * 60 * 1000 // 5분
): Promise<T> => {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const data = await apiCall();
  cache.set(key, { data, timestamp: Date.now() });
  
  return data;
};

// 사용 예시
const getTodos = () => cachedApiCall('todos', apiService.getTodos);
```

### 3. 로딩 최적화

#### 스켈레톤 스크린
```tsx
const TodoListSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// 사용
{loading ? <TodoListSkeleton /> : <TodoList todos={todos} />}
```

#### 프로그레시브 로딩
```tsx
const ProgressiveImage = ({ src, placeholder, alt }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
```

## 🔒 보안 최적화

### 1. CSP (Content Security Policy)
```html
<!-- public/index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://to-do-list-pog8.onrender.com;
  font-src 'self' data:;
">
```

### 2. 환경 변수 보안
```typescript
// 클라이언트에서 노출되어도 안전한 변수만 사용
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  environment: process.env.NODE_ENV || 'development',
  // ❌ 절대 클라이언트에 노출하면 안 되는 정보
  // apiSecret: process.env.API_SECRET, // 이런 것은 백엔드에서만!
};

// 런타임에서 민감한 정보 검증
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Development mode - API URL:', config.apiUrl);
} else {
  // 프로덕션에서는 로깅 최소화
  console.log('🚀 Production mode');
}
```

### 3. XSS 방지
```typescript
// HTML 이스케이프 유틸리티
const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  
  return text.replace(/[&<>"']/g, (match) => map[match]);
};

// 안전한 HTML 렌더링
const SafeHTML = ({ content }: { content: string }) => {
  return (
    <div dangerouslySetInnerHTML={{ 
      __html: escapeHtml(content) 
    }} />
  );
};
```

## 📊 모니터링 및 분석

### 1. Web Vitals 측정
```typescript
// src/reportWebVitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);  // Cumulative Layout Shift
    getFID(onPerfEntry);  // First Input Delay
    getFCP(onPerfEntry);  // First Contentful Paint
    getLCP(onPerfEntry);  // Largest Contentful Paint
    getTTFB(onPerfEntry); // Time to First Byte
  }
};

// 사용
reportWebVitals(console.log);
```

### 2. 성능 메트릭 수집
```typescript
// 커스텀 성능 메트릭
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      const navigationEntry = entry as PerformanceNavigationTiming;
      
      console.log('📊 Performance Metrics:', {
        domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.navigationStart,
        loadComplete: navigationEntry.loadEventEnd - navigationEntry.navigationStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime,
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime,
      });
    }
  }
});

performanceObserver.observe({ entryTypes: ['navigation', 'paint'] });
```

### 3. 에러 추적
```typescript
// 글로벌 에러 핸들러
window.addEventListener('error', (event) => {
  console.error('💥 Global Error:', {
    message: event.message,
    source: event.filename,
    line: event.lineno,
    column: event.colno,
    error: event.error
  });
  
  // 프로덕션에서는 에러 추적 서비스로 전송
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(event.error);
  }
});

// Promise 거부 에러 처리
window.addEventListener('unhandledrejection', (event) => {
  console.error('💥 Unhandled Promise Rejection:', event.reason);
  
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(event.reason);
  }
});
```

## 🔧 배포 자동화

### 1. GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy TODO App

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage --watchAll=false
      
      - name: Lint code
        run: npm run lint
      
      - name: Type check
        run: npx tsc --noEmit

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: build/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: build/
      
      - name: Deploy to production
        run: |
          # 배포 스크립트 실행
          echo "Deploying to production..."
```

### 2. 배포 상태 확인
```bash
#!/bin/bash
# scripts/health-check.sh

API_URL="https://your-app.netlify.app"
HEALTH_ENDPOINT="$API_URL/api/health"

echo "🔍 Checking deployment health..."

# API 응답 확인
response=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_ENDPOINT)

if [ $response -eq 200 ]; then
  echo "✅ Deployment successful! API is responding."
else
  echo "❌ Deployment failed! API returned status: $response"
  exit 1
fi

# 성능 테스트
echo "📊 Running performance check..."
curl -s -w "Response time: %{time_total}s\n" -o /dev/null $API_URL

echo "🎉 Health check completed!"
```

## 📈 성능 벤치마크

### 목표 지표
```typescript
const performanceTargets = {
  // Core Web Vitals
  LCP: 2500,    // Largest Contentful Paint < 2.5s
  FID: 100,     // First Input Delay < 100ms
  CLS: 0.1,     // Cumulative Layout Shift < 0.1
  
  // Custom Metrics
  TTI: 3000,    // Time to Interactive < 3s
  FCP: 1500,    // First Contentful Paint < 1.5s
  
  // Bundle Size
  jsBundle: 100 * 1024,    // < 100KB gzipped
  cssBundle: 10 * 1024,    // < 10KB gzipped
  totalBundle: 120 * 1024, // < 120KB gzipped
  
  // API Performance
  apiResponse: 2000,       // API 응답 < 2s
  authFlow: 3000,         // 로그인/가입 < 3s
};
```

### 실제 달성 지표 (2024.08.19)
```typescript
const actualPerformance = {
  // Bundle Size ✅
  jsBundle: 79.95 * 1024,  // 79.95KB (목표 대비 20% 개선)
  cssBundle: 3.92 * 1024,  // 3.92KB (목표 대비 60% 개선)
  totalBundle: 84 * 1024,  // 84KB (목표 대비 30% 개선)
  
  // Expected Performance ✅
  LCP: '~2.1s',           // 목표 내
  FCP: '~1.2s',           // 목표 대비 20% 개선
  TTI: '~2.8s',           // 목표 대비 7% 개선
  
  // API Optimization ✅
  timeout: 10000,         // 10초 타임아웃
  userTimeout: 15000,     // 15초 사용자 타임아웃
  healthCheck: 300000,    // 5분 간격 모니터링
};
```