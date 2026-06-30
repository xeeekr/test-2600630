(() => {
  const cols = 20;
  const rows = 12;
  const tile = 40; // px
  const player = { x: Math.floor(cols / 2), y: Math.floor(rows / 2) };

  const gridEl = document.getElementById("grid");
  // 그리드 생성(에셋 없이 기본 도형으로 표현)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = document.createElement("div");
      t.className = "grid-tile";
      gridEl.appendChild(t);
    }
  }

  const playerEl = document.getElementById("player");
  function renderPlayer() {
    // 탑뷰, 중앙 기준으로 위치 이동
    const px = player.x;
    const py = player.y;
    // 좌상단 기준으로 위치 계산
    const left = px * tile + tile * 0.5;
    const top = py * tile + tile * 0.5;
    playerEl.style.left = left + "px";
    playerEl.style.top = top + "px";
  }

  // 초기 위치 렌더링
  renderPlayer();

  // WASD 이동 처리
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    let moved = false;
    if (key === "w") {
      if (player.y > 0) {
        player.y -= 1;
        moved = true;
      }
    }
    if (key === "a") {
      if (player.x > 0) {
        player.x -= 1;
        moved = true;
      }
    }
    if (key === "s") {
      if (player.y < rows - 1) {
        player.y += 1;
        moved = true;
      }
    }
    if (key === "d") {
      if (player.x < cols - 1) {
        player.x += 1;
        moved = true;
      }
    }

    if (moved) {
      renderPlayer();
    }
  });

  // 확대/축소: 마우스 휠로 확대/축소(레이아웃은 기본 도형에 의해 제어)
  let scale = 1;
  window.addEventListener(
    "wheel",
    (e) => {
      if (!e.ctrlKey) return; // Ctrl 누르면 확대
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      scale += -delta * 0.1;
      scale = Math.max(0.5, Math.min(2.0, scale));
      gridEl.style.transform = `scale(${scale})`;
      // 플레이어 위치는 월드 좌표 기준으로 유지되도록 별도 처리 필요 시 확장 가능
    },
    { passive: false },
  );

  // 포커스: 게임 영역에 포커스 주기
  const game = document.getElementById("game");
  game.focus();
})();
