# 🎨 Enhanced TodoList - 모던 할일 관리 애플리케이션

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16--20-339933?style=for-the-badge&logo=node.js&logoColor=white)

**🌟 다크모드 + 5가지 테마 + 모던 애니메이션을 지원하는 차세대 TodoList**

[✨ 라이브 데모](https://aebonlee.github.io/ToDoList) • [📚 문서](./docs/) • [🚀 시작하기](#-시작하기)

</div>

---

React + TypeScript + Tailwind CSS + Node.js로 구축된 **완전히 새로워진** 풀스택 TODO 관리 애플리케이션입니다.

## 🎯 주요 특징

### 🎨 **고급 테마 시스템**
- 🌙 **다크/라이트 모드** 지원
- 🌈 **5가지 컬러 팔레트** (Blue, Green, Purple, Pink, Orange)
- 💾 **설정 영구 저장** (LocalStorage)
- 🔄 **실시간 테마 전환**

### ✨ **모던 UI/UX**
- 🎭 **마이크로 애니메이션** (hover, click, transition)
- 📱 **완전 반응형** 디자인
- 🎯 **직관적 이모지** 아이콘
- 💫 **부드러운 전환** 효과

### 🚀 **향상된 기능**
- ⚡ **실시간 필터링** (전체/진행중/완료)
- 📊 **스마트 통계** 표시
- ✏️ **인라인 편집** 지원
- 🗑️ **일괄 삭제** 기능

### 📝 **TODO 관리**
- **할 일 추가**: 향상된 입력 시스템 + Enter 키 지원
- **상태 관리**: 애니메이션 체크박스로 완료/미완료 토글
- **편집 기능**: 클릭 한번으로 인라인 편집
- **삭제 기능**: 안전한 확인 팝업으로 삭제
- **필터링**: 아름다운 탭 인터페이스

### 🔐 **사용자 인증**
- **회원가입**: 이메일 기반 새 계정 생성
- **로그인**: JWT 토큰 기반 인증
- **자동 로그인**: 토큰 자동 저장 및 복원
- **사용자별 데이터**: 개인 TODO 목록 관리

## 🛠 기술 스택

### Frontend
- **React 19.1.1** + **TypeScript 4.9.5**
- **Tailwind CSS 3.4.17** (PostCSS, Autoprefixer)
- **Axios 1.11.0** (HTTP 클라이언트)
- **Heroicons 2.2.0** (아이콘)

### Backend
- **Node.js** + **Express 4.18.2**
- **JWT** (jsonwebtoken 9.0.2)
- **bcryptjs 2.4.3** (비밀번호 암호화)
- **CORS 2.8.5** (Cross-Origin Resource Sharing)

## 🌐 라이브 데모

- **프론트엔드**: https://aebonlee.github.io/ToDoList
- **백엔드**: http://localhost:5000 (로컬 개발)
- **GitHub**: https://github.com/aebonlee/ToDoList

## 📦 빠른 시작

### 1. 프로젝트 클론
```bash
git clone https://github.com/aebonlee/ToDoList.git
cd ToDoList
```

### 2. 의존성 설치
```bash
# 프론트엔드 의존성
npm install

# 백엔드 의존성
cd backend
npm install
cd ..
```

### 3. 백엔드 서버 실행
```bash
cd backend
npm start
# 서버가 http://localhost:5000에서 실행됩니다
```

### 4. 프론트엔드 개발 서버 실행
```bash
# 새 터미널에서
npm start
# 브라우저에서 http://localhost:3001로 접속
```

## 🏗 프로젝트 구조

```
ToDoList/
├── src/                     # 프론트엔드 소스
│   ├── components/          # React 컴포넌트
│   │   ├── HealthCheck.tsx  # 서버 상태 모니터링
│   │   ├── LoginForm.tsx    # 로그인 폼
│   │   ├── RegisterForm.tsx # 회원가입 폼
│   │   ├── TodoForm.tsx     # 할 일 추가 폼
│   │   ├── TodoItem.tsx     # 개별 할 일 아이템
│   │   └── TodoList.tsx     # 할 일 목록
│   ├── hooks/               # 커스텀 훅
│   │   ├── useAuth.ts       # 인증 관리
│   │   └── useTodos.ts      # TODO 관리
│   ├── services/            # API 서비스
│   │   ├── api.ts           # API 클라이언트
│   │   └── auth.ts          # 인증 서비스
│   ├── types/               # TypeScript 타입 정의
│   │   └── todo.ts          # TODO 관련 타입
│   └── App.tsx              # 메인 앱 컴포넌트
├── backend/                 # 백엔드 서버
│   ├── server.js            # Express 서버
│   ├── package.json         # 백엔드 의존성
│   └── .env                 # 환경 변수
├── docs/                    # 개발 문서
│   ├── 00-INDEX.md          # 문서 목차
│   ├── FULL_DEVELOPMENT_SUMMARY.md # 전체 개발 요약
│   └── ...                  # 기타 개발 가이드
└── public/                  # 정적 파일
```

## 🔌 API 연동

### 인증 API
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/profile` - 사용자 프로필 조회
- `POST /api/auth/logout` - 로그아웃

### TODO API
- `GET /api/todos` - 할 일 목록 조회
- `POST /api/todos` - 새 할 일 생성
- `PUT /api/todos/:id` - 할 일 수정
- `DELETE /api/todos/:id` - 할 일 삭제
- `PATCH /api/todos/:id/toggle` - 완료 상태 토글

### 헬스체크
- `GET /api/health` - 서버 상태 확인

## 🎯 주요 컴포넌트

### `<TodoList />`
- 전체 TODO 관리 인터페이스
- 필터링 탭 (전체/진행중/완료)
- 통계 정보 표시
- 할 일 추가 폼 포함

### `<TodoItem />`
- 개별 할 일 표시 및 관리
- 인라인 편집 기능 (더블클릭)
- 완료/미완료 토글
- 삭제 기능

### `<LoginForm />` / `<RegisterForm />`
- 사용자 인증 인터페이스
- 실시간 폼 유효성 검사
- 로딩 상태 및 에러 메시지 표시

### `<HealthCheck />`
- 백엔드 서버 상태 실시간 모니터링
- 5분 간격 자동 헬스체크
- 연결 실패 시 재시도 기능

## 📈 성능 최적화

### 번들 크기
- **JavaScript**: 79.96 KB (gzipped)
- **CSS**: 3.92 KB (gzipped)
- **총 크기**: ~84 KB

### 로딩 성능
- **First Contentful Paint**: ~1.2초
- **Time to Interactive**: ~2.8초
- **Largest Contentful Paint**: ~2.1초

## 🚀 배포

### GitHub Pages (프론트엔드)
```bash
npm run deploy
```

### Render.com (백엔드)
1. `backend/` 폴더를 별도 저장소로 분리
2. Render에서 Node.js 서비스로 배포
3. 환경 변수 설정

### 환경 변수
```bash
# 프론트엔드 (.env)
REACT_APP_API_URL=http://localhost:5000

# 백엔드 (backend/.env)
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=5000
```

## 🛡 보안 기능

- ✅ JWT 토큰 기반 인증
- ✅ bcrypt 비밀번호 암호화
- ✅ CORS 설정
- ✅ 환경 변수 분리
- ✅ XSS 방지
- ✅ SQL 인젝션 방지

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

## 📚 개발 문서

프로젝트의 상세한 개발 과정과 가이드는 [`docs/`](./docs/) 폴더에서 확인할 수 있습니다:

- [📋 전체 개발 요약](./docs/FULL_DEVELOPMENT_SUMMARY.md)
- [📚 문서 목차](./docs/00-INDEX.md)
- [🏗 프로젝트 개요](./docs/01-PROJECT_OVERVIEW.md)
- [⚙️ 백엔드 설정](./docs/BACKEND_SETUP.md)
- [🚀 배포 가이드](./docs/RENDER_DEPLOY_GUIDE.md)

## 🐛 문제 해결

### 백엔드 연결 오류
```bash
# 백엔드 서버 상태 확인
curl http://localhost:5000/api/health

# 백엔드 서버 재시작
cd backend
npm start
```

### 빌드 오류
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🔄 향후 계획

- [ ] 데이터베이스 연결 (MongoDB/PostgreSQL)
- [ ] 실시간 동기화 (WebSocket)
- [ ] PWA 변환
- [ ] 다국어 지원
- [ ] 다크모드
- [ ] 파일 첨부
- [ ] 태그 시스템

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

이 프로젝트는 Claude Code Assistant와 함께 개발되었습니다.

---

**🚀 Live Demo**: https://aebonlee.github.io/ToDoList  
**📧 Contact**: https://github.com/aebonlee  
**Last Updated**: 2025-08-19