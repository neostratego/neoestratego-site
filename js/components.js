/* ═══════════════════════════════════════════════════════════════
   NEOSTRATEGO — Shared Components (Navbar + Footer)
   Inyectados en cada página vía JS para evitar duplicar HTML
   ═══════════════════════════════════════════════════════════════ */

(function () {

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { href: 'index.html',       label: 'INICIO' },
    { href: 'neolab.html',      label: 'NEOLAB' },
    { href: 'neomedia.html',    label: 'NEOMEDIA' },
    { href: 'neoeventos.html',  label: 'NEOEVENTOS' },
    { href: 'research.html',    label: 'INVESTIGACIÓN' },
    { href: 'about.html',       label: 'NOSOTROS' },
  ];

  const navHTML = `
<nav class="navbar" role="navigation" aria-label="Navegación principal">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="NEOSTRATEGO — Inicio" style="display:flex;align-items:center;gap:0.8rem;text-decoration:none">
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="64" height="64" rx="8" fill="#0A1A2F"/>
        <line x1="12" y1="12" x2="12" y2="52" stroke="#00C9FF" stroke-width="6" stroke-linecap="round"/>
        <line x1="12" y1="12" x2="52" y2="52" stroke="#00C9FF" stroke-width="6" stroke-linecap="round"/>
        <line x1="52" y1="12" x2="52" y2="52" stroke="#00C9FF" stroke-width="6" stroke-linecap="round"/>
        <circle cx="38" cy="28" r="5" fill="#8A2BE2" opacity="0.9"/>
      </svg>
      <span style="font-family:'Oswald',sans-serif;font-size:1.05rem;font-weight:600;letter-spacing:0.2em;color:#fff;text-transform:uppercase">NEOSTRATEGO</span>
    </a>
    <div class="nav-links" role="list">
      ${navLinks.map(l => `<a href="${l.href}" class="nav-link${currentPage === l.href ? ' active' : ''}" role="listitem">${l.label}</a>`).join('')}
    </div>
    <a href="contact.html" class="btn-outline">INICIAR PROYECTO</a>
    <button class="nav-hamburger" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile-menu" role="list" aria-label="Menú móvil">
    ${navLinks.map(l => `<a href="${l.href}" class="nav-link" role="listitem">${l.label}</a>`).join('')}
    <a href="contact.html" class="btn-hero" style="align-self:flex-start">INICIAR PROYECTO</a>
  </div>
</nav>
<div class="page-overlay" aria-hidden="true"></div>`;

  const footerHTML = `
<hr class="gradient-line">
<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <a href="index.html" class="nav-logo" aria-label="NEOSTRATEGO" style="display:flex;align-items:center;gap:0.7rem">
      <svg width="26" height="26" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="64" height="64" rx="8" fill="#0A1A2F"/>
        <line x1="12" y1="12" x2="12" y2="52" stroke="#00C9FF" stroke-width="6" stroke-linecap="round"/>
        <line x1="12" y1="12" x2="52" y2="52" stroke="#00C9FF" stroke-width="6" stroke-linecap="round"/>
        <line x1="52" y1="12" x2="52" y2="52" stroke="#00C9FF" stroke-width="6" stroke-linecap="round"/>
        <circle cx="38" cy="28" r="5" fill="#8A2BE2" opacity="0.9"/>
      </svg>
      <span>NEOSTRATEGO</span>
    </a>
    <div class="footer-links" role="list">
      ${navLinks.map(l => `<a href="${l.href}" class="nav-link" role="listitem">${l.label}</a>`).join('')}
    </div>
    <div class="footer-socials">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="LinkedIn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Twitter / X">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#B0B0B0">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="YouTube">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0B0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#B0B0B0" stroke="none"/>
        </svg>
      </a>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">&copy; ${new Date().getFullYear()} NEOSTRATEGO S.A.S. — Quito · Buenos Aires · São Paulo · LATAM</span>
    <span class="footer-copy">Todos los derechos reservados.</span>
  </div>
</footer>
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  // Inyectar al final del body
  document.body.insertAdjacentHTML('beforeend', footerHTML);

})();
    <span class="footer-copy">Todos los derechos reservados.</span>
  </div>
</footer>`;

  // WhatsApp flotante (FASE 10A - implementación robusta)
  const waHTML = `
<a href="https://wa.me/593958824142?text=Vi%20neostratego.com%20y%20quiero%20info"
   target="_blank" rel="noopener noreferrer"
   class="wa-float" aria-label="Escríbenos por WhatsApp">
  <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
    <path fill="#fff" d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2 7.7L.5 31.5l8-2.1c2.2
    1.2 4.8 1.9 7.5 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.4
    0-4.7-.6-6.7-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A12.8 12.8 0 0 1 3.2 16C3.2 8.9 8.9
    3.2 16 3.2S28.8 8.9 28.8 16 23.1 28.8 16 28.8zm7-9.5c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.3.4-1
    1.2-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4
    0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.2
    0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.4 3.6 1.6 3.9c.2.3 2.7 4.2 6.6 5.9.9.4 1.6.6
    2.2.8.9.3 1.8.2 2.4.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5z"/>
  </svg>
</a>`;
  
  // Inyectar al inicio del body
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  // Inyectar footer al final del body
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  // Inyectar WhatsApp flotante
  document.body.insertAdjacentHTML('beforeend', waHTML);
