import { Player } from "./player";
import { Camera } from "./camera";
import { World } from "./world";
import { Input } from "./input";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private camera: Camera;
  private world: World;
  private input: Input;
  private lastTime: number = 0;

  constructor() {
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas2D not supported");
    this.ctx = ctx;
    this.player = new Player(0, 0);
    this.camera = new Camera(this.canvas.width, this.canvas.height);
    this.world = new World(40, 30); // 40x30 타일 맵
    this.input = new Input();

    // 화면 중앙에 초기 위치
    this.player.x = 20 * 32;
    this.player.y = 15 * 32;

    // 반응형 사이즈
    window.addEventListener("resize", () => this.resize());
    this.resize();
  }

  resize() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    // 실제 렌더링 좌표는 캔버스 좌표 시스템에 의존하므로 뷰포트도 재설정 가능
    this.camera.viewportW = window.innerWidth;
    this.camera.viewportH = window.innerHeight;
  }

  start() {
    const loop = (t: number) => {
      const dt = this.lastTime ? Math.min(0.033, (t - this.lastTime) / 1000) : 0;
      this.lastTime = t;
      this.update(dt);
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  update(dt: number) {
    const dir = this.input.getDirection();
    this.player.move(dir, dt, this.world);
    this.camera.centerOn(this.player);
    this.camera.updateZoom(this.input.zoomDelta);
    this.input.resetDelta();
  }

  render() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 렌더 순서: 월드(타일), 플레이어
    this.world.render(ctx, this.camera);
    this.player.render(ctx, this.camera);

    // 줌 상태 텍스트 예시 (선택)
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.font = "14px sans-serif";
    ctx.fillText(`Zoom: ${this.camera.zoom.toFixed(2)}`, 10, 20);
  }
}
