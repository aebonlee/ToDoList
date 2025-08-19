🚀 Render.com 배포 방법

  방법 1: 자동 배포 (권장)

  1. Render.com 접속: https://render.com
  2. New → Static Site 클릭
  3. GitHub 연결: aebonlee/ToDoList 저장소 선택
  4. 자동 설정: render.yaml 파일이 자동으로 설정 적용

  방법 2: Blueprint 사용

  1. Render Dashboard에서 New → Blueprint
  2. Repository URL: https://github.com/aebonlee/ToDoList
  3. Connect 클릭 → 자동 구성

  📱 배포 설정 요약

  서비스명: todolist-dhlt
  URL: https://todolist-dhlt.onrender.com
  빌드 명령: npm ci && npm run build
  배포 디렉토리: build
  백엔드 API: https://to-do-list-pog8.onrender.com

  ⚡ 빠른 시작 체크리스트

  - Render.com 계정 생성
  - GitHub 저장소 연결
  - 서비스 이름 확인: todolist-dhlt
  - 환경 변수 설정 확인
  - 첫 배포 시작 (5-10분 소요)
  - https://todolist-dhlt.onrender.com 접속 확인

  📊 예상 배포 시간

  - 첫 배포: 5-10분
  - 재배포: 2-5분
  - Cold Start: 10-30초 (무료 플랜)

  🔄 자동 재배포

  GitHub main 브랜치에 푸시하면 자동으로 재배포됩니다:
  git push origin main

  📚 상세 가이드

  RENDER_DEPLOY_GUIDE.md 파일에 다음 내용이 포함되어 있습니다:
  - 단계별 배포 안내
  - 문제 해결 방법
  - 성능 최적화 팁
  - 커스텀 도메인 설정
  - 모니터링 설정

  🌐 배포 URL

  https://todolist-dhlt.onrender.com

  모든 설정이 완료되었습니다! Render.com에서 위 단계를 따라 배포하시면 됩니다. 🚀
