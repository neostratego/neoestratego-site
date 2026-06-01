/**
 * smoke-bg.js — Animated purple smoke/bokeh background
 * Inspired by Avid wallpaper aesthetic
 */

(function () {
  const canvas = document.getElementById('smoke-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // --- Blob definition ---
  // Colors sampled from the Avid wallpaper
  const COLORS = [
    { r: 120, g: 30,  b: 220 }, // deep violet
    { r: 160, g: 40,  b: 230 }, // medium purple
    { r: 180, g: 60,  b: 240 }, // bright violet
    { r: 100, g: 20,  b: 180 }, // dark purple
    { r: 200, g: 100, b: 255 }, // soft lavender highlight
  ];

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createBlob() {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x:       rand(0.3, 1.1),   // normalized 0-1 (can be slightly offscreen)
      y:       rand(0.4, 1.1),
      r:       rand(0.18, 0.42), // radius as fraction of min(W,H)
      opacity: rand(0.08, 0.22),
      color:   c,
      // Slow drift velocities (normalized per second)
      vx:      rand(-0.012, 0.012),
      vy:      rand(-0.010, 0.010),
      // Phase for sinusoidal wobble
      phaseX:  rand(0, Math.PI * 2),
      phaseY:  rand(0, Math.PI * 2),
      freqX:   rand(0.00015, 0.00035),
      freqY:   rand(0.00012, 0.00030),
      ampX:    rand(0.04, 0.10),
      ampY:    rand(0.03, 0.08),
      // Opacity pulsing
      baseOpacity: rand(0.08, 0.22),
      opFreq:  rand(0.00008, 0.00020),
      opAmp:   rand(0.03, 0.07),
    };
  }

  const NUM_BLOBS = 7;
  const blobs = Array.from({ length: NUM_BLOBS }, createBlob);

  let lastTime = null;

  function draw(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = timestamp - lastTime; // ms
    lastTime = timestamp;

    const W = canvas.width;
    const H = canvas.height;
    const minDim = Math.min(W, H);

    // Clear with solid black
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, W, H);

    // Draw each blob
    blobs.forEach(b => {
      // Update position with sinusoidal drift
      b.phaseX += b.freqX * dt;
      b.phaseY += b.freqY * dt;

      const px = (b.x + Math.sin(b.phaseX) * b.ampX) * W;
      const py = (b.y + Math.sin(b.phaseY) * b.ampY) * H;
      const radius = b.r * minDim;

      // Pulsing opacity
      const alpha = b.baseOpacity + Math.sin(b.phaseX * 1.3) * b.opAmp;

      // Radial gradient for soft glow
      const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
      const { r, g, bl_ } = { r: b.color.r, g: b.color.g, bl_: b.color.b };
      grad.addColorStop(0,   `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${Math.min(alpha * 1.6, 0.45)})`);
      grad.addColorStop(0.4, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha})`);
      grad.addColorStop(1,   `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);

      ctx.save();
      ctx.globalCompositeOperation = 'screen'; // additive blend for glow
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
