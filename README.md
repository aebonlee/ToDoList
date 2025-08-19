# TODO 앱

React + TypeScript + Tailwind CSS로 구축된 모던 TODO 관리 애플리케이션입니다.

## 🌟 주요 기능

### 📝 TODO 관리
- **할 일 추가**: 제목과 설명을 포함한 새로운 할 일 생성
- **상태 관리**: 체크박스로 완료/미완료 토글
- **편집 기능**: 인라인 편집으로 할 일 수정
- **삭제 기능**: 불필요한 할 일 제거
- **필터링**: 전체/진행중/완료 상태별 필터링

### 🔐 사용자 인증
- **회원가입**: 이메일 기반 새 계정 생성
- **로그인**: JWT 토큰 기반 인증
- **자동 로그인**: 토큰 자동 저장 및 복원
- **사용자별 데이터**: 개인 TODO 목록 관리

### 🎨 UI/UX
- **반응형 디자인**: 모바일/데스크톱 대응
- **모던 인터페이스**: Tailwind CSS 기반 깔끔한 디자인
- **아이콘**: Heroicons으로 직관적 UI
- **애니메이션**: 부드러운 상태 전환 효과

## 🛠 기술 스택

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Backend API**: https://to-do-list-pog8.onrender.com

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)로 접속합니다.

### 3. 빌드
```bash
npm run build
```

## 🏗 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── LoginForm.tsx   # 로그인 폼
│   ├── RegisterForm.tsx # 회원가입 폼
│   ├── TodoForm.tsx    # 할 일 추가 폼
│   ├── TodoItem.tsx    # 개별 할 일 아이템
│   └── TodoList.tsx    # 할 일 목록
├── hooks/              # 커스텀 훅
│   ├── useAuth.ts      # 인증 관리
│   └── useTodos.ts     # TODO 관리
├── services/           # API 서비스
│   ├── api.ts          # API 클라이언트
│   └── auth.ts         # 인증 서비스
├── types/              # TypeScript 타입 정의
│   └── todo.ts         # TODO 관련 타입
└── App.tsx             # 메인 앱 컴포넌트
```

## 🔌 API 연동

백엔드 API (`https://to-do-list-pog8.onrender.com`)와 연동하여 다음 기능을 제공합니다:

### 인증 API
- `POST /api/auth/login` - 로그인
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/profile` - 사용자 프로필

### TODO API
- `GET /api/todos` - 할 일 목록 조회
- `POST /api/todos` - 새 할 일 생성
- `PUT /api/todos/:id` - 할 일 수정
- `DELETE /api/todos/:id` - 할 일 삭제
- `PATCH /api/todos/:id/toggle` - 완료 상태 토글

## 🎯 주요 컴포넌트

### TodoList
- 전체 TODO 관리 인터페이스
- 필터링 및 통계 표시
- 할 일 추가 폼 포함

### TodoItem
- 개별 할 일 표시 및 관리
- 인라인 편집 기능
- 완료/미완료 토글

### LoginForm / RegisterForm
- 사용자 인증 인터페이스
- 폼 유효성 검사
- 에러 메시지 표시

## 🔧 개발 가이드

### 커스텀 훅 사용
```typescript
// 인증 상태 관리
const { user, login, logout, isAuthenticated } = useAuth();

// TODO 데이터 관리
const { todos, createTodo, updateTodo, deleteTodo } = useTodos();
```

### API 서비스 확장
```typescript
// services/api.ts에서 새로운 엔드포인트 추가
async customEndpoint(data: any): Promise<ResponseType> {
  const response = await this.api.post('/api/custom', data);
  return response.data;
}
```

## 🚀 배포

### Netlify/Vercel 배포
```bash
npm run build
# build 폴더를 정적 호스팅 서비스에 업로드
```

### 환경 변수 설정
프로덕션 환경에서는 다음 환경 변수를 설정하세요:
```
REACT_APP_API_URL=https://to-do-list-pog8.onrender.com
```

## 📱 주요 기능 미리보기

1. **로그인/회원가입**: 이메일 기반 사용자 인증
2. **할 일 추가**: 제목과 설명을 포함한 새 할 일 생성
3. **상태 필터링**: 전체/진행중/완료 상태별 분류
4. **실시간 편집**: 더블클릭으로 인라인 편집
5. **반응형 UI**: 모바일과 데스크톱 최적화

## 🐛 문제 해결

### 백엔드 연결 오류
- 백엔드 서버 상태 확인
- CORS 설정 확인
- 네트워크 연결 상태 확인

### 빌드 오류
```bash
npm install
npm run build
```

## 📄 라이센스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
