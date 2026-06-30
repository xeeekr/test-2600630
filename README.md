에셋 포함 여부에 상관없이 테스트 가능한 탑뷰 줌 가능 프로토타입

- 에셋이 없으면 기본 도형으로 렌더링됩니다.
- W/A/S/D 또는 방향키로 플레이어를 이동시키고, 마우스 휠 또는 +/− 키로 줌 제어가 가능합니다.

실행 방법

- 로컬에서 Vite로 실행 권장:
  1. npm init -y
  2. npm install --save-dev vite
  3. in package.json: "start": "vite"
  4. npm run start
  5. 브라우저에서 http://localhost:5173
- 간단한 HTTP 서버로도 가능: Python http.server 등

에셋 로딩 확장 포인트

- assets 폴더에 spritesheet.png 등을 두고 AssetLoader를 활용해 타일/캐릭터를 스프라이트 시트로 교체 가능.
- 현재 구현은 에셋이 없을 때도 정상 동작하도록 되어 있습니다.
