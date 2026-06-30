export class AssetLoader {
  private images: Map<string, HTMLImageElement> = new Map();

  constructor() {}

  load(url: string, key: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject(new Error("No URL"));
        return;
      }
      const img = new Image();
      img.onload = () => {
        this.images.set(key, img);
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error(`Failed to load ${url}`));
      };
      img.src = url;
    });
  }

  get(key: string): HTMLImageElement | undefined {
    return this.images.get(key);
  }

  // 에셋 로드 예시: 필요 시 확장
}
