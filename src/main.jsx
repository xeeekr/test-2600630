import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const WORLD_SIZE = 2400;
const PLAYER_SIZE = 46;
const SPEED = 260;
const MIN_ZOOM = 0.55;
const MAX_ZOOM = 2.2;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function App() {
  const [pos, setPos] = useState({ x: WORLD_SIZE / 2, y: WORLD_SIZE / 2 });
  const [zoom, setZoom] = useState(1);
  const keys = useRef(new Set());
  const lastTime = useRef(performance.now());

  const objects = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: 120 + ((i * 317) % (WORLD_SIZE - 240)),
    y: 120 + ((i * 191) % (WORLD_SIZE - 240)),
    size: 22 + ((i * 11) % 42),
    kind: i % 5 === 0 ? 'rock' : i % 3 === 0 ? 'bush' : 'tree'
  })), []);

  useEffect(() => {
    const down = (e) => {
      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright', '+', '=', '-'].includes(k)) e.preventDefault();
      if (k === '+' || k === '=') setZoom((z) => clamp(Number((z + 0.1).toFixed(2)), MIN_ZOOM, MAX_ZOOM));
      else if (k === '-') setZoom((z) => clamp(Number((z - 0.1).toFixed(2)), MIN_ZOOM, MAX_ZOOM));
      else keys.current.add(k);
    };
    const up = (e) => keys.current.delete(e.key.toLowerCase());
    const wheel = (e) => {
      e.preventDefault();
      setZoom((z) => clamp(Number((z + (e.deltaY < 0 ? 0.08 : -0.08)).toFixed(2)), MIN_ZOOM, MAX_ZOOM));
    };
    window.addEventListener('keydown', down, { passive: false });
    window.addEventListener('keyup', up);
    window.addEventListener('wheel', wheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('wheel', wheel);
    };
  }, []);

  useEffect(() => {
    let frame;
    const loop = (time) => {
      const dt = Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;
      const k = keys.current;
      let dx = 0;
      let dy = 0;
      if (k.has('w') || k.has('arrowup')) dy -= 1;
      if (k.has('s') || k.has('arrowdown')) dy += 1;
      if (k.has('a') || k.has('arrowleft')) dx -= 1;
      if (k.has('d') || k.has('arrowright')) dx += 1;
      if (dx || dy) {
        const len = Math.hypot(dx, dy);
        setPos((p) => ({
          x: clamp(p.x + (dx / len) * SPEED * dt, PLAYER_SIZE, WORLD_SIZE - PLAYER_SIZE),
          y: clamp(p.y + (dy / len) * SPEED * dt, PLAYER_SIZE, WORLD_SIZE - PLAYER_SIZE)
        }));
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="viewport">
      <section className="world" style={{ width: WORLD_SIZE, height: WORLD_SIZE, transform: `translate(calc(50vw - ${pos.x * zoom}px), calc(50vh - ${pos.y * zoom}px)) scale(${zoom})` }}>
        <div className="border" />
        {objects.map((o) => <div key={o.id} className={`obj ${o.kind}`} style={{ left: o.x, top: o.y, width: o.size, height: o.size }} />)}
      </section>
      <div className="player"><div className="face" /></div>
      <aside className="hud"><strong>Top View</strong><span>Move: WASD / Arrow keys</span><span>Zoom: Wheel / +/-</span><span>Zoom {Math.round(zoom * 100)}%</span></aside>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
