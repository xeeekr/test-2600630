import { World } from "./world";

export class Player {
  public x: number;
  public y: number;
  public size: number = 16;
  public speed: number = 120; // 픽셀/초
  private color: string = "#00f";

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(dir: { x: number; y: number }, dt: number, world: World) {
    const len = Math.hypot(dir.x, dir.y) || 1;
    const vx = (dir.x / len) * this.speed;
    const vy = (dir.y / len) * this.speed;
    const newX = this.x + vx * dt;
    const newY = this.y + vy * dt;

    // 간단한 충돌 검사 (타일 단위)
    if (world.isWalkableWorldCoord(newX, newY, this.size)) {
      this.x = newX;
      this.y = newY;
    } else {
      // 간단 반사 처리 생략, 벽에 붙지 않도록 제한
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: any) {
    // 화면 좌표로 변환한 캐릭터
    const p = camera.worldToScreen(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, this.size * camera.zoom * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // 머리 위 작은 포인터로 방향감 각주 (생략 가능)
  }
}
