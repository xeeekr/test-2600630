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

    // 에셋 로더를 시도해도 없으면 기본 도형으로 그리도록 설계
    this.world = new World(40, 30);
    this.player = new Player(20 * 32, 15 * 32);
    this.camera = new Camera(window.innerWidth, window.innerHeight);

    this.input = new Input();

    // 반응형 크기
    window.addEventListener("resize", () => this.resize());
    this.resize();
  }

  resize() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.camera.viewportW = window.innerWidth;
    this.camera.viewportH = window.innerHeight;
  }

  start() {
    const loop = (t: number) => {
      const dt = this.lastTime
        ? Math.min(0.033, (t - this.lastTime) / 1000)
        : 0;
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 에셋 로더가 성공했을 때는 에셋 우선, 실패 시 기본 도형으로 렌더링하도록 World/Player 클래스가 처리합니다.
    this.world.render(this.ctx, this.camera);
    this.player.render(this.ctx, this.camera);

    // 간단 UI: 줌 값
    this.ctx.fillStyle = "rgba(0,0,0,0.5)";
    this.ctx.font = "14px sans-serif";
    this.ctx.fillText(`Zoom: ${this.camera.zoom.toFixed(2)}`, 10, 20);
  }
}
