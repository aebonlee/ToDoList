# GitHub Pages 설정 가이드

## 🚨 현재 상황
- ✅ `gh-pages` 브랜치에 빌드 파일 배포 완료
- ✅ 프로덕션 빌드 성공 (79.96 kB gzipped)
- ⚠️ GitHub Pages 설정이 자동으로 활성화되지 않음

## 🔧 수동 설정 방법

### 1. GitHub 저장소 접속
1. 브라우저에서 https://github.com/aebonlee/ToDoList 접속
2. 로그인 확인

### 2. Settings 메뉴 접속
1. 저장소 상단의 **Settings** 탭 클릭
2. 왼쪽 사이드바에서 **Pages** 메뉴 클릭

### 3. GitHub Pages 설정
1. **Source** 섹션에서:
   - `Deploy from a branch` 선택
2. **Branch** 섹션에서:
   - Branch: `gh-pages` 선택
   - Folder: `/ (root)` 선택
3. **Save** 버튼 클릭

### 4. 배포 대기
- 설정 후 1-5분 정도 소요
- 녹색 체크마크가 나타나면 배포 완료

## 🌐 배포 완료 후 확인

### 접속 URL
https://aebonlee.github.io/ToDoList

### 예상되는 화면
- ✅ React TODO 앱 로딩
- ✅ 사용자 인증 (로그인/회원가입) 화면
- ✅ 반응형 디자인
- ⚠️ 백엔드 서버 연결 상태에 따라 기능 제한 가능

## 📊 배포된 앱 정보

### 기술 스택
- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Bundle Size**: 79.96 kB (gzipped)
- **Backend**: https://to-do-list-pog8.onrender.com

### 주요 기능
- **사용자 인증**: JWT 기반 로그인/회원가입
- **TODO 관리**: CRUD 작업 (생성/읽기/수정/삭제)
- **필터링**: 전체/진행중/완료 상태별 보기
- **반응형**: 모바일/태블릿/데스크톱 지원

## 🔄 재배포 방법

### 코드 수정 후 재배포
```bash
# 1. 코드 수정 후
npm run deploy

# 또는 단계별
npm run build
npx gh-pages -d build
```

### Git 커밋 후 재배포
```bash
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
npm run deploy
```

## 🚨 문제 해결

### 페이지가 README만 보이는 경우
1. Settings > Pages에서 Source가 `gh-pages` 브랜치로 설정되었는지 확인
2. Actions 탭에서 배포 진행상황 확인
3. 5-10분 대기 후 재접속

### 백엔드 연결 오류 시
- Render 무료 계정의 경우 서버 sleep 모드 가능
- 첫 접속 시 1-2분 대기 필요
- 앱 내 "다시 시도" 버튼 클릭

### 캐시 문제 해결
```bash
# 브라우저 캐시 강제 새로고침
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

## 📱 모바일 테스트
- 스마트폰 브라우저에서 https://aebonlee.github.io/ToDoList 접속
- 터치 인터페이스 정상 작동 확인
- 반응형 레이아웃 확인

---

**🎯 배포 완료!** 위 단계를 따라 GitHub Pages를 설정하면 라이브 사이트를 확인할 수 있습니다.