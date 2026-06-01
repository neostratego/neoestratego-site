/**
 * crystal-anim.js
 * Animación fluida del arte de cristal en el hero — canvas con blend mode screen
 */
(function () {
  'use strict';

  const heroArt = document.querySelector('.hero-art');
  if (!heroArt) return;

  /* ── Crear canvas ──────────────────────────────────────────── */
  heroArt.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  heroArt.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, cx = 0, cy = 0;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const rect = heroArt.getBoundingClientRect();
    W = canvas.width  = rect.width  * DPR;
    H = canvas.height = rect.height * DPR;
    cx = W * 0.54;
    cy = H * 0.44;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── Utilidades de color ───────────────────────────────────── */
  function hex(h) {
    const n = parseInt(h.replace('#',''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(h, a) { const [r,g,b] = hex(h); return `rgba(${r},${g},${b},${a.toFixed(3)})`; }

  /* ── Definición de rayos ───────────────────────────────────── */
  //   angle: dirección base en grados (0=derecha, 180=izquierda)
  //   len:   longitud como fracción del lado menor del canvas
  //   spr:   ángulo de apertura del rayo en grados
  //   c0/c1: color inicio/fin
  //   ph:    fase de tiempo individual
  const BEAMS = [
    { angle: 212, len: 1.25, spr: 16, c0: '#00e5ff', c1: '#0033cc', ph: 0.00 }, // cyan principal ↖
    { angle: 198, len: 0.95, spr: 11, c0: '#00ccff', c1: '#001199', ph: 1.10 }, // teal ←
    { angle: 232, len: 0.85, spr: 10, c0: '#5500ff', c1: '#220077', ph: 2.20 }, // púrpura ↙
    { angle: 252, len: 0.75, spr: 15, c0: '#9900ff', c1: '#440044', ph: 0.70 }, // magenta ↓
    { angle: 186, len: 0.65, spr:  8, c0: '#00e0ff', c1: '#002299', ph: 1.80 }, // acento fino ←
    { angle: 285, len: 0.55, spr: 18, c0: '#cc00ff', c1: '#660033', ph: 0.40 }, // magenta ↓→
  ];

  /* ── Dibujar rayo ──────────────────────────────────────────── */
  function drawBeam(angleDeg, length, spreadDeg, c0, c1, alpha) {
    const a  = (angleDeg * Math.PI) / 180;
    const sp = (spreadDeg * Math.PI) / 180;
    const ex = cx + Math.cos(a) * length;
    const ey = cy + Math.sin(a) * length;
    const hw = Math.tan(sp / 2) * length;
    const px = Math.cos(a + Math.PI / 2);
    const py = Math.sin(a + Math.PI / 2);

    const grad = ctx.createLinearGradient(cx, cy, ex, ey);
    grad.addColorStop(0,    rgba(c0, alpha));
    grad.addColorStop(0.45, rgba(c1, alpha * 0.45));
    grad.addColorStop(1,    rgba(c1, 0));

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ex + px * hw, ey + py * hw);
    ctx.lineTo(ex - px * hw, ey - py * hw);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /* ── Dibujar glow radial ───────────────────────────────────── */
  function drawGlow(x, y, r, color, alpha) {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0,   rgba(color, alpha));
    grad.addColorStop(0.5, rgba(color, alpha * 0.35));
    grad.addColorStop(1,   rgba(color, 0));
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* ── Loop de animación ─────────────────────────────────────── */
  let start = null;

  function render(ts) {
    if (!start) start = ts;
    const t = (ts - start) / 1000; // segundos

    ctx.clearRect(0, 0, W, H);

    const minDim = Math.min(W, H);

    /* Movimiento global: rotación muy lenta (±2°) + escala suave */
    const globalRot   = Math.sin(t * 0.11)  * (2.2  * Math.PI / 180);
    const globalScale = 1 + Math.sin(t * 0.17) * 0.022;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(globalRot);
    ctx.scale(globalScale, globalScale);
    ctx.translate(-cx, -cy);

    /* Glows de fondo */
    const pMag  = 0.38 + Math.sin(t * 0.19 + 1.0) * 0.11;
    const pBlue = 0.20 + Math.sin(t * 0.15 + 2.5) * 0.07;
    const pCyan = 0.12 + Math.sin(t * 0.23)        * 0.04;

    drawGlow(W * 0.78, H * 0.80, minDim * 0.60, '#8800cc', pMag);
    drawGlow(W * 0.86, H * 0.12, minDim * 0.40, '#0044ff', pBlue);
    drawGlow(cx,       cy,       minDim * 0.30, '#00aaff', pCyan);

    /* Rayos individuales */
    BEAMS.forEach(b => {
      const len   = minDim * (b.len + Math.sin(t * 0.13 + b.ph) * 0.06);
      const alpha = 0.70   +          Math.sin(t * 0.18 + b.ph) * 0.14;
      const ang   = b.angle +         Math.sin(t * 0.09 + b.ph * 0.8) * 1.8;

      /* Doble pasada: difusa + definida */
      ctx.save();
      ctx.filter = 'blur(18px)';
      drawBeam(ang, len * 1.12, b.spr + 6, b.c0, b.c1, alpha * 0.55);
      ctx.filter = 'none';
      ctx.restore();

      drawBeam(ang, len, b.spr, b.c0, b.c1, alpha);
    });

    ctx.restore();

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
