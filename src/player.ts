import { World } from "./world";

export class Player {
  public x: number;
  public y: number;
  public size: number = 14;
  public speed: number = 120;
  private color: string = "#00a6ff";

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(dir: { x: number; y: number }, dt: number, world: World) {
    const len = Math.hypot(dir.x, dir.y) || 1;
    const vx = (dir.x / len) * this.speed;
    const vy = (dir.y / len) * this.speed;
    const nx = this.x + vx * dt;
    const ny = this.y + vy * dt;
    if (world.isWalkableWorldCoord(nx, ny, this.size)) {
      this.x = nx;
      this.y = ny;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: any) {
    const p = camera.worldToScreen(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, this.size * camera.zoom, 0, Math.PI * 2);
    ctx.fill();
  }
}
