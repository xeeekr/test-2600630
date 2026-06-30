# Top View WASD Game

Cloudflare Pages + GitHub 연동 배포용 Vite/React 프로젝트입니다.

## 기능
- 탑뷰 고정 시점
- WASD / 방향키 이동
- 캐릭터 화면 정중앙 고정
- 월드가 캐릭터 이동에 따라 반대로 스크롤
- 확대/축소 지원: 마우스 휠 또는 +/- 키
- 외부 에셋 없이 CSS/SVG 스타일로 화면 표시

## 로컬 실행
```bash
npm install
npm run dev
```

## 빌드
```bash
npm run build
```

## Cloudflare Pages 설정
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: 프로젝트 루트

## GitHub 업로드
압축을 풀고 저장소 루트에 파일을 올린 뒤 Cloudflare Pages에서 재배포하면 됩니다.
