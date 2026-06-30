export class Camera {
  public zoom: number = 1;
  public x: number = 0;
  public y: number = 0;
  public viewportW: number;
  public viewportH: number;

  constructor(viewportW: number, viewportH: number) {
    this.viewportW = viewportW;
    this.viewportH = viewportH;
  }

  centerOn(target: { x: number; y: number }) {
    this.x = target.x;
    this.y = target.y;
  }

  updateZoom(delta: number) {
    if (delta === 0) return;
    const factor = delta > 0 ? 1.08 : 0.92;
    this.zoom = Math.max(0.5, Math.min(2.5, this.zoom * factor));
  }

  worldToScreen(wx: number, wy: number): { x: number; y: number } {
    const sx = (wx - this.x) * this.zoom + this.viewportW / 2;
    const sy = (wy - this.y) * this.zoom + this.viewportH / 2;
    return { x: sx, y: sy };
  }
}
