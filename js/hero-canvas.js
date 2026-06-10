/* ═══════════════════════════════════════════════════════════════
   NEOSTRATEGO — Hero Canvas: Red de nodos geopolítica
   ═══════════════════════════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes, animId;

  const CYAN   = '#00C9FF';
  const PURPLE = '#8A2BE2';
  const NODE_COUNT = 55;
  const MAX_DIST    = 160;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function mkNode() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 2 + 1,
      color: Math.random() > 0.6 ? PURPLE : CYAN,
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: NODE_COUNT }, mkNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Líneas entre nodos cercanos
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0,201,255,${0.25 * (1 - d / MAX_DIST)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Nodos
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function update() {
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
  }

  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  // Pausa cuando no es visible (performance)
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!animId) loop(); }
    else { cancelAnimationFrame(animId); animId = null; }
  });
  obs.observe(canvas);

  window.addEventListener('resize', () => { resize(); }, { passive: true });

  init();
  loop();
})();
