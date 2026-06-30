# Top View WASD Game

Cloudflare Pages 정적 배포용 Vite/React 프로젝트입니다. Workers/Wrangler 배포 명령을 사용하지 마세요.

## 기능

- 탑뷰 고정 시점
- WASD / 방향키 이동
- 캐릭터 화면 정중앙 고정
- 확대/축소: 마우스 휠 또는 +/- 키
- 외부 에셋 없이 CSS 기반 월드/캐릭터 표시

## 로컬 실행

```bash
npm install
npm run dev
```

## Cloudflare Pages 설정

- Framework preset: `Vite`
- Build command: `npm run build` 또는 `bun run build`
- Build output directory: `dist`
- Deploy command / 사용자 deploy command: 비워두기

## 주의

`npx wrangler deploy`는 Workers 배포용입니다. Pages 정적 사이트에서는 사용하지 않습니다.a
