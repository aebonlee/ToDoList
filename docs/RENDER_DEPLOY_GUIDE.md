# 📚 Render.com 배포 가이드

## 🎯 배포 URL
- **프론트엔드**: https://todolist-dhlt.onrender.com
- **백엔드**: https://todolist-dhlt-gc0d.onrender.com (예정)

## ⚠️ 중요 수정사항

### Status 127 오류 해결
React 앱의 Render 배포 시 발생하는 Status 127 오류는 다음과 같이 해결됩니다:

1. **Build Command 수정**: `npm ci && npm run build`
2. **환경 변수 설정**: `REACT_APP_API_URL` 올바른 백엔드 URL
3. **Static Site 설정**: `render.yaml` 파일 사용
4. **SPA 라우팅**: `_redirects` 파일로 클라이언트 라우팅 지원

## 🚀 빠른 시작 (Quick Deploy)

### 1단계: Render.com 계정 생성
1. [Render.com](https://render.com) 접속
2. **Sign up** 클릭
3. GitHub 계정으로 로그인 (권장)

### 2단계: 새 웹 서비스 생성
1. 대시보드에서 **New +** 버튼 클릭
2. **Static Site** 선택

### 3단계: GitHub 저장소 연결
1. **Connect GitHub Account** 클릭
2. `aebonlee/ToDoList` 저장소 선택
3. **Connect** 클릭

### 4단계: 서비스 설정
```yaml
Name: todolist-dhlt
Environment: Static Site
Branch: main
Build Command: npm ci && npm run build
Publish Directory: build
```

### 5단계: 환경 변수 설정
| Key | Value |
|-----|-------|
| REACT_APP_API_URL | https://todolist-dhlt-gc0d.onrender.com |
| NODE_ENV | production |

### 6단계: 배포
1. **Create Static Site** 클릭
2. 배포 진행 상황 모니터링 (약 5-10분 소요)
3. 빌드 성공 시 자동으로 URL 생성

## 📋 render.yaml 설정 (자동 배포)

이미 `render.yaml` 파일이 설정되어 있어 자동으로 구성됩니다:

```yaml
services:
  - type: web
    name: todolist-dhlt
    env: static
    buildCommand: npm ci && npm run build
    staticPublishPath: ./build
    pullRequestPreviewsEnabled: true
    headers:
      - path: /*
        name: X-Robots-Tag
        value: noindex
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: REACT_APP_API_URL
        value: https://todolist-dhlt-gc0d.onrender.com
      - key: NODE_ENV
        value: production
```

## 🔧 수동 설정 (대시보드 사용)

### 1. Render Dashboard 접속
- URL: https://dashboard.render.com
- 로그인 후 대시보드 확인

### 2. 서비스 생성
1. **New** → **Static Site**
2. 저장소 선택:
   - Public Git repository 선택
   - URL: `https://github.com/aebonlee/ToDoList`

### 3. 빌드 및 배포 설정
```
Name: todolist-dhlt
Region: Oregon (US West) 또는 가까운 지역
Branch: main
Root Directory: (비워둠)
Build Command: npm ci && npm run build
Publish Directory: build
```

### 4. 고급 설정
- **Auto-Deploy**: Yes (main 브랜치 푸시 시 자동 배포)
- **Pull Request Previews**: Enabled
- **Clear Build Cache**: 필요시 사용

## 🌐 Custom Domain 설정 (선택사항)

### 도메인 추가
1. Settings → Custom Domains
2. Add Custom Domain 클릭
3. 도메인 입력 (예: todo.yourdomain.com)
4. DNS 설정:
   ```
   Type: CNAME
   Name: todo
   Value: todolist-dhlt.onrender.com
   ```

## 📊 배포 상태 확인

### 빌드 로그 확인
1. Render Dashboard → 서비스 선택
2. **Events** 탭에서 빌드 진행 상황 확인
3. **Logs** 탭에서 상세 로그 확인

### 예상 빌드 출력
```
==> Cloning from https://github.com/aebonlee/ToDoList
==> Checking out commit abc123...
==> Detected Node version 18.x
==> Running build command 'npm ci && npm run build'
==> Installing dependencies...
==> Creating optimized production build...
==> Build successful!
==> Uploading build...
==> Your site is live! 🎉
```

## 🚨 문제 해결

### 1. 빌드 실패
```bash
# package.json 확인
"scripts": {
  "build": "react-scripts build"
}

# Node 버전 확인 (18.x 권장)
```

### 2. 환경 변수 오류
- Dashboard → Environment 확인
- REACT_APP_API_URL이 정확한지 확인

### 3. 404 오류
- SPA 라우팅을 위한 rewrite 규칙 확인
- render.yaml의 routes 섹션 확인

### 4. 느린 초기 로딩
- Render 무료 플랜은 비활성 후 sleep 모드
- 첫 접속 시 10-30초 소요 (cold start)
- 유료 플랜으로 업그레이드 고려

## 🔄 재배포 방법

### 자동 재배포 (GitHub 연동)
```bash
git add .
git commit -m "feat: 새 기능 추가"
git push origin main
# Render가 자동으로 감지하고 재배포
```

### 수동 재배포
1. Render Dashboard → 서비스 선택
2. **Manual Deploy** → **Deploy latest commit**

### 캐시 초기화 후 재배포
1. Settings → Clear build cache
2. Manual Deploy 실행

## 📈 성능 최적화

### 빌드 최적화
```json
// package.json
"scripts": {
  "build": "GENERATE_SOURCEMAP=false react-scripts build"
}
```

### 캐싱 헤더 설정
```yaml
headers:
  - path: /static/*
    name: Cache-Control
    value: public, max-age=31536000, immutable
```

## 🔐 보안 설정

### 환경 변수 보호
- 민감한 정보는 Environment Variables에만 저장
- .env 파일은 .gitignore에 추가
- API 키는 절대 코드에 하드코딩하지 않음

### HTTPS 강제
- Render는 기본적으로 HTTPS 제공
- HTTP → HTTPS 자동 리다이렉트

## 📱 모니터링

### Health Check
- Render 자동 health check 활성화
- 5분마다 상태 확인
- 실패 시 알림 설정 가능

### 알림 설정
1. Settings → Notifications
2. Email/Slack/Discord 알림 설정
3. 배포 성공/실패 알림 수신

## 💰 요금제

### Free Tier (무료)
- 750시간/월 무료 사용
- 자동 sleep 모드 (30분 비활성)
- SSL 인증서 포함
- 100GB 대역폭

### Starter ($7/월)
- Sleep 모드 없음
- 더 빠른 빌드
- 커스텀 도메인 무제한
- 우선 지원

## 🎯 배포 체크리스트

- [ ] GitHub 저장소 준비 완료
- [ ] render.yaml 파일 확인
- [ ] 환경 변수 설정 완료
- [ ] 빌드 명령어 테스트
- [ ] Render 계정 생성
- [ ] 서비스 생성 및 연결
- [ ] 첫 배포 성공
- [ ] 라이브 사이트 확인

---

**🚀 배포 URL**: https://todolist-dhlt.onrender.com

**📝 참고**: 
- Render 무료 플랜은 비활성 시 자동 sleep 모드 진입
- 첫 접속 시 10-30초 정도 소요될 수 있음
- 지속적인 서비스를 원한다면 유료 플랜 고려

**🔗 유용한 링크**:
- [Render Documentation](https://render.com/docs)
- [Render Status Page](https://status.render.com)
- [Render Community](https://community.render.com)