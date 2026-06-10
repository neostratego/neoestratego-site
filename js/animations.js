/* ═══════════════════════════════════════════════════════════════
   NEOSTRATEGO — Core JS
   Navbar · Fade-in · FAQ · Forms · Countdown · Audio Player
   ═══════════════════════════════════════════════════════════════ */

window.addEventListener('load', () => {
  // Activar animaciones solo cuando JS está completamente listo
  document.body.classList.add('js-loaded');

  /* ══ 1. NAVBAR — scroll blur + hamburger ══════════════════════ */
  const navbar  = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
    });
    // cerrar al hacer click en un link móvil
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── Active nav link por sección visible ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href]');

  const markActive = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      const href = l.getAttribute('href');
      l.classList.toggle('active',
        href === '#' + current || href === current + '.html' ||
        (href.includes(current) && current !== '')
      );
    });
  };
  window.addEventListener('scroll', markActive, { passive: true });
  markActive();

  /* ══ 2. FADE-IN observer ══════════════════════════════════════ */
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px 0px 0px', threshold: 0 });

  document.querySelectorAll('.js-fade-in').forEach(el => observer.observe(el));

  /* ══ 3. FAQ ACCORDION ═════════════════════════════════════════ */
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // cerrar todos
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ══ 4. CONTACT FORM ══════════════════════════════════════════ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;

      // Validación básica
      contactForm.querySelectorAll('[required]').forEach(field => {
        const parent = field.closest('.form-field');
        if (!field.value.trim()) {
          parent.classList.add('has-error');
          valid = false;
        } else {
          parent.classList.remove('has-error');
        }
      });

      // Email validate
      const emailField = contactForm.querySelector('[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.closest('.form-field').classList.add('has-error');
        valid = false;
      }

      if (!valid) return;

      const btn = contactForm.querySelector('[type="submit"]');
      const successMsg = document.getElementById('contact-success');
      btn.textContent = 'ENVIANDO...';
      btn.disabled = true;

      // Simula envío (reemplazar con endpoint real)
      await new Promise(r => setTimeout(r, 1200));

      contactForm.style.display = 'none';
      if (successMsg) successMsg.classList.add('visible');
    });

    // Clear error on input
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.closest('.form-field')?.classList.remove('has-error');
      });
    });
  }

  /* ══ 5. REGISTRO FORM (neoeventos) ═══════════════════════════ */
  const regForm = document.getElementById('reg-form');
  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;

      regForm.querySelectorAll('[required]').forEach(field => {
        const parent = field.closest('.form-field');
        if (!field.value.trim()) {
          parent.classList.add('has-error');
          valid = false;
        } else {
          parent.classList.remove('has-error');
        }
      });

      if (!valid) return;

      const btn = regForm.querySelector('[type="submit"]');
      const successMsg = document.getElementById('reg-success');
      btn.textContent = 'PROCESANDO...';
      btn.disabled = true;

      await new Promise(r => setTimeout(r, 1200));

      regForm.style.display = 'none';
      if (successMsg) successMsg.classList.add('visible');
    });

    regForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.closest('.form-field')?.classList.remove('has-error');
      });
    });
  }

  /* ══ 6. NEWSLETTER FORM ═══════════════════════════════════════ */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn   = form.querySelector('button');
      if (!input.value.trim()) return;
      btn.textContent = '...';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 900));
      input.value = '';
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = 'SUSCRIBIR'; btn.disabled = false; }, 2500);
    });
  });

  /* ══ 7. COUNTDOWN ═════════════════════════════════════════════ */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    // Fecha objetivo: primer sábado 90 días desde hoy
    const target = new Date();
    target.setDate(target.getDate() + 90);
    target.setHours(9, 0, 0, 0);

    const pad = n => String(n).padStart(2, '0');

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        countdownEl.innerHTML = '<span class="section-label">¡Evento en curso!</span>';
        return;
      }
      const d  = Math.floor(diff / 864e5);
      const h  = Math.floor((diff % 864e5) / 36e5);
      const m  = Math.floor((diff % 36e5) / 6e4);
      const s  = Math.floor((diff % 6e4) / 1e3);

      document.getElementById('cd-days')?.setAttribute('data-val', pad(d));
      document.getElementById('cd-hours')?.setAttribute('data-val', pad(h));
      document.getElementById('cd-mins')?.setAttribute('data-val', pad(m));
      document.getElementById('cd-secs')?.setAttribute('data-val', pad(s));

      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = el.getAttribute('data-val');
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ══ 8. AUDIO PLAYER ══════════════════════════════════════════ */
  const playerEl = document.getElementById('audio-player');
  if (playerEl) {
    let currentAudio = null;
    let currentSrc   = null;
    let isPlaying    = false;

    const playBtn   = document.getElementById('player-play');
    const fill      = document.getElementById('player-fill');
    const track     = document.getElementById('player-track');
    const timeEl    = document.getElementById('player-time');
    const durationEl = document.getElementById('player-duration');
    const titleEl   = document.getElementById('player-title');
    const epEl      = document.getElementById('player-ep');

    const formatTime = secs => {
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      return `${m}:${String(s).padStart(2,'0')}`;
    };

    const updateFill = () => {
      if (!currentAudio || !currentAudio.duration) return;
      const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
      fill.style.width = pct + '%';
      timeEl.textContent  = formatTime(currentAudio.currentTime);
      durationEl.textContent = formatTime(currentAudio.duration);
      // persistencia
      localStorage.setItem('neo_audio_pos_' + currentSrc, currentAudio.currentTime);
    };

    const setPlayIcon = playing => {
      playBtn.innerHTML = playing
        ? `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="4" height="14" rx="1" fill="#0A1A2F"/><rect x="11" y="2" width="4" height="14" rx="1" fill="#0A1A2F"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 2l13 7-13 7V2z" fill="#0A1A2F"/></svg>`;
    };

    const playEpisode = (src, title, ep) => {
      if (currentSrc !== src) {
        if (currentAudio) { currentAudio.pause(); }
        currentAudio = new Audio(src);
        currentSrc   = src;

        // Restaurar posición
        const saved = localStorage.getItem('neo_audio_pos_' + src);
        if (saved) currentAudio.currentTime = parseFloat(saved);

        currentAudio.addEventListener('timeupdate', updateFill);
        currentAudio.addEventListener('ended', () => {
          isPlaying = false;
          setPlayIcon(false);
        });
      }

      if (titleEl) titleEl.textContent = title;
      if (epEl) epEl.textContent = ep;

      if (isPlaying && currentSrc === src) {
        currentAudio.pause();
        isPlaying = false;
      } else {
        currentAudio.play().catch(() => {});
        isPlaying = true;
      }
      setPlayIcon(isPlaying);
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // Botón play principal
    if (playBtn) {
      setPlayIcon(false);
      playBtn.addEventListener('click', () => {
        if (!currentAudio) return;
        if (isPlaying) {
          currentAudio.pause();
          isPlaying = false;
        } else {
          currentAudio.play().catch(() => {});
          isPlaying = true;
        }
        setPlayIcon(isPlaying);
      });
    }

    // Barra de progreso clickeable
    if (track) {
      track.addEventListener('click', e => {
        if (!currentAudio || !currentAudio.duration) return;
        const rect = track.getBoundingClientRect();
        const pct  = (e.clientX - rect.left) / rect.width;
        currentAudio.currentTime = pct * currentAudio.duration;
        updateFill();
      });
    }

    // Botones play de episodios
    document.querySelectorAll('[data-play-src]').forEach(btn => {
      btn.addEventListener('click', () => {
        const src   = btn.dataset.playSrc;
        const title = btn.dataset.playTitle || 'Episodio';
        const ep    = btn.dataset.playEp    || 'EP';
        playEpisode(src, title, ep);
      });
    });

    // Teclado: espacio = play/pause
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (!currentAudio) return;
        if (isPlaying) { currentAudio.pause(); isPlaying = false; }
        else { currentAudio.play().catch(() => {}); isPlaying = true; }
        setPlayIcon(isPlaying);
      }
    });
  }

  /* ══ 9. SMOOTH PAGE TRANSITIONS ══════════════════════════════ */
  const overlay = document.querySelector('.page-overlay');
  if (overlay) {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto') ||
          href.startsWith('tel') || link.target === '_blank') return;

      link.addEventListener('click', e => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => { window.location.href = href; }, 280);
      });
    });

    // fade-in al cargar
    window.addEventListener('load', () => {
      overlay.classList.remove('active');
    });
  }

});
