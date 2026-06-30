import { defineConfig } from "vite";

export default defineConfig(async () => {
  // Cloudflare Vite 플러그인을 ESM 방식으로 동적으로 불러오기
  let cloudflarePlugin;
  try {
    const mod = await import("@cloudflare/vite-plugin");
    cloudflarePlugin = mod.cloudflare ? mod.cloudflare() : null;
  } catch (e) {
    console.warn("@cloudflare/vite-plugin import 실패:", e);
  }

  return {
    plugins: [
      // 플러그인이 있을 때만 추가
      ...(cloudflarePlugin ? [cloudflarePlugin] : []),
    ],
    // 필요한 경우 공통 설정 추가
    server: {
      port: 5173,
      host: true,
    },
    build: {
      outDir: "dist",
    },
  };
});
