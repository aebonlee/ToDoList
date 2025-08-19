# GitHub 푸시 가이드

## 📋 사전 준비사항

### 1. GitHub 저장소 생성
1. [GitHub](https://github.com) 로그인
2. 우측 상단 `+` 버튼 → `New repository` 클릭
3. Repository 설정:
   - **Repository name**: `todo-app`
   - **Description**: "Modern TODO Application with React, TypeScript, and Backend Integration"
   - **Public/Private**: 원하는 대로 선택
   - **Initialize with README**: ❌ 체크하지 않음 (이미 로컬에 있음)
   - **Add .gitignore**: ❌ 체크하지 않음
   - **Add a license**: MIT 또는 원하는 라이센스 선택

4. `Create repository` 클릭

## 🚀 푸시 명령어

### 2. 로컬 저장소와 GitHub 연결

GitHub 저장소를 생성한 후, 아래 명령어를 실행하세요:

```bash
# 현재 디렉토리 확인
cd C:\Users\ASUS\todo-app

# 기존 원격 저장소 제거 (있는 경우)
git remote remove origin

# 새 원격 저장소 추가 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git

# 또는 SSH 사용 시
git remote add origin git@github.com:YOUR_USERNAME/todo-app.git

# 원격 저장소 확인
git remote -v

# 메인 브랜치 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 🔐 인증 처리

### GitHub 인증 방법

#### 옵션 1: Personal Access Token (권장)
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. `Generate new token` 클릭
3. 권한 설정:
   - `repo` (전체 선택)
   - `workflow` (선택사항)
4. Token 생성 후 복사
5. 푸시 시 비밀번호 대신 토큰 사용

```bash
# HTTPS로 푸시 시
Username: YOUR_USERNAME
Password: YOUR_PERSONAL_ACCESS_TOKEN
```

#### 옵션 2: SSH Key
```bash
# SSH 키 생성 (이미 있으면 건너뛰기)
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH 키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH and GPG keys → New SSH key
# 복사한 키 붙여넣기
```

## 📝 현재 커밋 상태

현재 저장소에는 다음 커밋들이 준비되어 있습니다:

```
73c4c06 docs: Add comprehensive development documentation
b865278 feat: Complete TODO app with backend integration
eec8421 Initialize project using Create React App
```

## ✅ 푸시 후 확인사항

1. **GitHub 저장소 확인**
   - 모든 파일이 업로드되었는지 확인
   - README.md가 올바르게 표시되는지 확인
   - dev/ 폴더의 문서들이 잘 보이는지 확인

2. **Actions 탭 (있는 경우)**
   - CI/CD 워크플로우가 있다면 정상 실행 확인

3. **Settings → Pages**
   - GitHub Pages 배포를 원한다면 설정
   - Source: Deploy from a branch
   - Branch: main / root

## 🌐 배포 옵션

### GitHub Pages (정적 호스팅)
```bash
# gh-pages 브랜치로 빌드 배포
npm run build
npx gh-pages -d build
```

### Netlify 연동
1. [Netlify](https://netlify.com)에서 `Import from Git` 선택
2. GitHub 저장소 연결
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. 환경 변수 설정:
   - `REACT_APP_API_URL`: `https://to-do-list-pog8.onrender.com`

### Vercel 연동
```bash
# Vercel CLI 사용
npx vercel --prod
```

## 🔧 문제 해결

### 권한 오류
```bash
# 토큰 재설정
git config --global credential.helper manager
git push -u origin main
# 새 토큰으로 다시 인증
```

### 충돌 발생 시
```bash
# 원격 저장소 내용 확인
git fetch origin
git status

# 로컬이 최신이면 강제 푸시 (주의!)
git push -f origin main

# 또는 병합
git pull origin main --allow-unrelated-histories
git push origin main
```

### 큰 파일 오류
```bash
# node_modules가 포함된 경우
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push origin main
```

## 📊 저장소 정보

### 포함된 내용
- ✅ 완전한 React + TypeScript 앱
- ✅ 7개의 개발 문서 (dev/ 폴더)
- ✅ 배포 설정 파일들
- ✅ README 및 가이드

### 제외된 내용 (.gitignore)
- ❌ node_modules/
- ❌ build/ (필요시 별도 배포)
- ❌ .env (보안상 제외)

## 🎯 다음 단계

1. **GitHub 저장소 생성** ✅
2. **원격 저장소 연결** ✅
3. **코드 푸시** ✅
4. **README 확인** ✅
5. **배포 설정** (선택사항)
6. **협업자 초대** (선택사항)

---

**준비 완료!** 위 가이드를 따라 GitHub에 푸시하세요. 🚀