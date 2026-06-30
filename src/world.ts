export type Tile = {
  id: number;
  w: number;
  h: number;
  color: string;
  walkable: boolean;
  x: number;
  y: number;
};
export class World {
  private tiles: Tile[][] = [];
  private cols: number;
  private rows: number;
  private tileW: number = 32;
  private tileH: number = 32;

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.generate();
  }

  private generate() {
    for (let y = 0; y < this.rows; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < this.cols; x++) {
        const isWall =
          x === 0 || y === 0 || x === this.cols - 1 || y === this.rows - 1;
        row.push({
          id: isWall ? 1 : 0,
          w: this.tileW,
          h: this.tileH,
          color: isWall ? "#555" : (x + y) % 3 === 0 ? "#e6e6e6" : "#dcdcdc",
          walkable: !isWall,
          x,
          y,
        });
      }
      this.tiles.push(row);
    }
  }

  isWalkableWorldCoord(x: number, y: number, size: number): boolean {
    const tx = Math.floor(x / this.tileW);
    const ty = Math.floor(y / this.tileH);
    if (tx < 0 || ty < 0 || ty >= this.rows || tx >= this.cols) return false;
    return this.tiles[ty][tx].walkable;
  }

  render(ctx: CanvasRenderingContext2D, camera: any) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const t = this.tiles[y][x];
        const pos = camera.worldToScreen(x * this.tileW, y * this.tileH);
        ctx.fillStyle = t.color;
        ctx.fillRect(pos.x, pos.y, t.w * camera.zoom, t.h * camera.zoom);
      }
    }
  }
}
