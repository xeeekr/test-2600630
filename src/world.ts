export type Tile = { id: number; w: number; h: number; color: string; walkable: boolean; x: number; y: number };
export class World {
  private tiles: Tile[][] = [];
  private cols: number;
  private rows: number;

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.generateTestMap();
  }

  private generateTestMap() {
    for (let y = 0; y < this.rows; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < this.cols; x++) {
        const isWall = x === 0 || y === 0 || x === this.cols - 1 || y === this.rows - 1 || (x % 7 === 0 && y % 5 === 0);
        row.push({
          id: isWall ? 1 : 0,
          w: 32,
          h: 32,
          color: isWall ? "#555" : "#ddd",
          walkable: !isWall,
          x, y
        });
      }
      this.tiles.push(row);
    }
  }

  isWalkableWorldCoord(x: number, y: number, size: number): boolean {
    const tileX = Math.floor(x / 32);
    const tileY = Math.floor(y / 32);
    if (tileX < 0 || tileY < 0 || tileX >= this.cols || tileY >= this.rows) return false;
    return this.tiles[tileY][tileX].walkable;
  }

  render(ctx: CanvasRenderingContext2D, camera: any) {
    // 보이는 부분만 렌더링 간단 구현
    const w = this.cols, h = this.rows;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const t = this.tiles[y][x];
        const p = camera.worldToScreen(x * t.w, y * t.h);
        ctx.fillStyle = t.color;
        ctx.fillRect(p.x - 0.5, p.y - 0.5, t.w * camera.zoom, t.h * camera.zoom);
      }
    }
  }
}
