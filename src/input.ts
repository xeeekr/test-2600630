export class Input {
  private keys = new Set<string>();
  public zoomDelta: number = 0;

  constructor() {
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      this.keys.add(k);
      if (k === "+" || k === "=") this.zoomDelta = 1;
      if (k === "-") this.zoomDelta = -1;
    });
    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) this.zoomDelta = -1;
      else if (e.deltaY < 0) this.zoomDelta = 1;
    });
  }

  getDirection() {
    const d: { x: number; y: number } = { x: 0, y: 0 };
    if (this.keys.has("w") || this.keys.has("arrowup")) d.y -= 1;
    if (this.keys.has("s") || this.keys.has("arrowdown")) d.y += 1;
    if (this.keys.has("a") || this.keys.has("arrowleft")) d.x -= 1;
    if (this.keys.has("d") || this.keys.has("arrowright")) d.x += 1;
    return d;
  }

  resetDelta() {
    this.zoomDelta = 0;
  }
}
