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
<!-- WhatsApp flotante (FASE 3) -->
<a href="https://wa.me/593958824142?text=Vi%20neoestratego-site%20y%20quiero%20info" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Contactar por WhatsApp" style="position:fixed;bottom:24px;right:24px;background:#25D366;border-radius:50%;width:56px;height:56px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:9999;transition:transform 0.2s ease,box-shadow 0.2s ease">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style="margin-top:2px">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
</a>`;

  // Inyectar al inicio del body
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  // Inyectar al final del body
  document.body.insertAdjacentHTML('beforeend', footerHTML);

})();
