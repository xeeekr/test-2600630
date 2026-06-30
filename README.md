에셋 포함 프로젝트 실행 방법 (에셋 파일은 로컬 assets 폴더를 사용하도록 구성)

- 로컬 실행: Vite 기반으로 실행 권장
  1. npm init -y
  2. npm install --save-dev vite
  3. package.json에 "start": "vite"
  4. npx vite
  5. 브라우저에서 http://localhost:5173 접속

- 정적 서버로 실행 가능
  - Python: python -m http.server 8080
  - 또는 http-server 패키지로 실행

에셋 사용 여부

- assets/spritesheet.png가 존재하면, 향후 확장 시 해당 시트에서 타일/캐릭터를 잘라서 렌더링하도록 확장 가능.
- 현재 구현은 에셋 없이도 작동하는 최소 코드이며, assets가 있으면 주석 처리 부분을 켜고 로드 로직을 추가하면 됩니다.
