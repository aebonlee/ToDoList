# TODO 앱 배포 가이드

## 🚀 배포 옵션

### 1. Netlify 배포 (권장)

1. **GitHub에 푸시**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Netlify 설정**
- Netlify에서 GitHub 리포지토리 연결
- Build command: `npm run build`
- Publish directory: `build`
- 환경 변수: `REACT_APP_API_URL=https://to-do-list-pog8.onrender.com`

### 2. Render 배포

1. **render.yaml 파일 사용**
- 프로젝트 루트의 `render.yaml` 파일이 자동으로 배포 설정

2. **수동 설정**
- Service Type: Static Site
- Build Command: `npm ci && npm run build`
- Publish Directory: `./build`

### 3. Vercel 배포

```bash
npm install -g vercel
vercel --prod
```

## 🔧 환경 설정

### 필수 환경 변수
```
REACT_APP_API_URL=https://to-do-list-pog8.onrender.com
NODE_ENV=production
```

### 로컬 개발 환경
```bash
# .env 파일
PORT=3001
REACT_APP_API_URL=https://to-do-list-pog8.onrender.com
```

## 🛠 빌드 및 테스트

### 로컬 빌드 테스트
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build

# 빌드 파일 로컬 서빙
npm install -g serve
serve -s build
```

### 빌드 최적화 확인
- Bundle 크기: ~79KB (gzipped)
- CSS 크기: ~4KB (gzipped)
- 로딩 속도: <2초

## 🔍 배포 후 확인사항

### 1. 기능 테스트
- [ ] 회원가입/로그인 동작
- [ ] TODO 추가/수정/삭제
- [ ] 필터링 기능
- [ ] 반응형 디자인
- [ ] 서버 연결 상태

### 2. 성능 테스트
- [ ] 페이지 로딩 속도
- [ ] API 응답 시간
- [ ] 모바일 호환성

### 3. 에러 처리 테스트
- [ ] 네트워크 오류 시 동작
- [ ] 서버 다운 시 처리
- [ ] 잘못된 입력 처리

## 🐛 문제 해결

### 빌드 오류
```bash
# 캐시 클리어
npm ci
rm -rf node_modules package-lock.json
npm install

# Tailwind CSS 문제
npm install -D tailwindcss@^3.4.0
```

### 배포 오류
- **404 에러**: `_redirects` 파일 확인
- **API 연결 실패**: 환경 변수 확인
- **CORS 에러**: 백엔드 CORS 설정 확인

### 성능 최적화
```bash
# Bundle 분석
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

## 📊 모니터링

### 헬스체크
- 앱 내장 헬스체크: 5분마다 자동 확인
- 백엔드 상태: `https://to-do-list-pog8.onrender.com/api/health`

### 로그 모니터링
- 브라우저 개발자 도구 Console
- 네트워크 탭에서 API 호출 확인

## 🚨 긴급 상황 대응

### 백엔드 서버 다운
1. 헬스체크에서 자동 감지
2. 사용자에게 상태 알림 표시
3. 로컬 데이터 보존

### 배포 롤백
```bash
# Netlify
netlify rollback

# Vercel
vercel rollback [deployment-url]
```

## 📈 성능 지표

### 목표 성능
- First Contentful Paint: <1.5초
- Largest Contentful Paint: <2.5초
- Time to Interactive: <3초
- Bundle Size: <100KB gzipped

### 실제 성능 (2025.08.19)
- ✅ FCP: ~1.2초
- ✅ LCP: ~2.1초
- ✅ TTI: ~2.8초
- ✅ Bundle: ~79KB gzipped