에셋 포함 여부에 상관없이 테스트 가능한 탑뷰 줌 가능 프로토타입

- 에셋이 없어도 기본 도형으로 렌더링됩니다.
- W/A/S/D 또는 방향키로 플레이어를 이동시키고, 마우스 휠 또는 +/− 키로 줌 제어가 가능합니다.

실행 방법

- 로컬에서 Vite 기반 실행 권장:
  1. npm init -y
  2. npm install --save-dev vite
  3. package.json에 "start": "vite" 추가
  4. npm run start
  5. 브라우저에서 http://localhost:5173
- Cloudflare Pages/GitHub Pages 배포는 빌드 명령을 vite build로 설정하고 dist를 출력 디렉토리로 사용합니다.
