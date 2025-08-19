# 🚀 백엔드 서버 설정 가이드

## 📊 현재 상황

백엔드 서버가 성공적으로 구성되었습니다!

### ✅ 작동 확인
- **로컬 서버**: http://localhost:5000
- **헬스체크**: http://localhost:5000/api/health
- **상태**: 정상 작동 중

## 🔧 백엔드 구조

### 기술 스택
- **Node.js** + **Express**
- **JWT** 인증
- **bcrypt** 비밀번호 암호화
- **CORS** 설정
- **In-memory** 데이터 저장 (데모용)

### API 엔드포인트

#### 인증 API
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/profile` - 프로필 조회
- `POST /api/auth/logout` - 로그아웃

#### TODO API
- `GET /api/todos` - 할 일 목록 조회
- `POST /api/todos` - 할 일 생성
- `PUT /api/todos/:id` - 할 일 수정
- `DELETE /api/todos/:id` - 할 일 삭제
- `PATCH /api/todos/:id/toggle` - 완료 상태 토글

## 🌐 Render.com 백엔드 배포

### 1. 백엔드 코드 GitHub에 푸시
```bash
cd backend
git init
git add .
git commit -m "Initial backend setup"
git remote add origin https://github.com/YOUR_USERNAME/todo-backend.git
git push -u origin main
```

### 2. Render에서 새 서비스 생성
1. [Render.com](https://render.com) 접속
2. **New** → **Web Service**
3. GitHub 저장소 연결
4. 설정:
   - **Name**: todolist-backend-dhlt
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. 환경 변수 설정
| Key | Value |
|-----|-------|
| NODE_ENV | production |
| JWT_SECRET | (Generate 버튼 클릭) |
| PORT | 5000 |

### 4. 배포 완료 후 URL 업데이트
백엔드가 배포되면 프론트엔드의 환경 변수를 업데이트:
```
REACT_APP_API_URL=https://todolist-backend-dhlt.onrender.com
```

## 💻 로컬 개발

### 백엔드 실행
```bash
cd backend
npm install
npm start
```

### 프론트엔드 실행
```bash
cd ..
npm start
```

## 🔒 보안 주의사항

1. **JWT_SECRET**: 프로덕션에서는 강력한 비밀 키 사용
2. **CORS**: 프로덕션에서는 특정 도메인만 허용
3. **데이터베이스**: 실제 서비스에서는 MongoDB, PostgreSQL 등 사용
4. **HTTPS**: 프로덕션에서는 필수

## 📝 현재 백엔드 특징

### 장점
- ✅ 간단하고 빠른 설정
- ✅ 모든 기본 기능 구현
- ✅ JWT 인증 시스템
- ✅ RESTful API 설계

### 제한사항
- ⚠️ In-memory 저장 (서버 재시작 시 데이터 초기화)
- ⚠️ 단일 서버 인스턴스
- ⚠️ 파일 업로드 미지원

## 🚀 다음 단계

1. **데이터베이스 연결**
   - MongoDB Atlas 또는 PostgreSQL 추가
   - Prisma 또는 Mongoose ORM 사용

2. **기능 확장**
   - 비밀번호 재설정
   - 이메일 인증
   - 소셜 로그인

3. **성능 최적화**
   - Redis 캐싱
   - Rate limiting
   - 압축 미들웨어

## 🎯 현재 작동 상태

```json
{
  "status": "ok",
  "backend": "http://localhost:5000",
  "frontend": "http://localhost:3001",
  "deployment": {
    "frontend": "https://aebonlee.github.io/ToDoList",
    "backend": "배포 예정"
  }
}
```

---

백엔드 서버가 정상적으로 작동 중입니다! 🎉