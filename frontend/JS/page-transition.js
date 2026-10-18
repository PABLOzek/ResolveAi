/* ============================================================
   page-transition.js — Animação de transição entre páginas
   Resolve Aí
   ============================================================ */

(function () {
  'use strict';

  /* ── Configuração ── */
  const OVERLAY_DURATION_MS = 600;   // tempo que o overlay fica visível antes de navegar
  const FADE_IN_DURATION_MS = 380;   // tempo do fade-in ao chegar na nova página

  /* ── Cria o overlay no DOM ── */
  function createOverlay() {
    if (document.getElementById('page-transition-overlay')) return;

    // Resolve o caminho da logo relativo à raiz do projeto
    const logoSrc = resolveLogoPath();

    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.innerHTML = `
      <div class="pt-content">
        <div class="pt-logo-wrap">
          <div class="pt-logo-halo"></div>
          <img class="pt-logo-img" src="${logoSrc}" alt="Resolve Aí" />
        </div>
        <div class="pt-progress-track">
          <div class="pt-progress-bar"></div>
        </div>
        <span class="pt-label">
          Carregando
          <span class="pt-dots">
            <span></span><span></span><span></span>
          </span>
        </span>
      </div>
    `;

    document.body.appendChild(overlay);
  }

  /* ── Resolve o caminho da logo independentemente da página atual ── */
  function resolveLogoPath() {
    // Todas as páginas estão na raiz, então o caminho é sempre relativo à raiz
    return 'IMG/logo_resolveai.jpeg';
  }

  /* ── Mostra o overlay (saída) ── */
  function showOverlay(callback) {
    const overlay = document.getElementById('page-transition-overlay');
    if (!overlay) { callback(); return; }

    // Reinicia a barra de progresso recriando o elemento
    const track = overlay.querySelector('.pt-progress-track');
    if (track) {
      const oldBar = track.querySelector('.pt-progress-bar');
      if (oldBar) {
        const newBar = oldBar.cloneNode(true);
        track.replaceChild(newBar, oldBar);
      }
    }

    // Ativa o overlay
    overlay.classList.remove('pt-leaving');
    overlay.classList.add('pt-entering');

    setTimeout(callback, OVERLAY_DURATION_MS);
  }

  /* ── Esconde o overlay (entrada na nova página) ── */
  function hideOverlay() {
    const overlay = document.getElementById('page-transition-overlay');
    if (!overlay) return;

    overlay.classList.add('pt-leaving');
    overlay.classList.remove('pt-entering');
  }

  /* ── Intercepta cliques em links internos ── */
  function interceptLinks() {
    document.addEventListener('click', function (e) {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');

      // Ignora: âncoras internas, links externos, javascript:, mailto:, tel:
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('javascript') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('http') ||
        anchor.target === '_blank' ||
        e.ctrlKey || e.metaKey || e.shiftKey
      ) return;

      // Ignora links que abrem modal ou têm data-* especiais
      if (anchor.hasAttribute('data-modal') || anchor.hasAttribute('data-no-transition')) return;

      e.preventDefault();

      showOverlay(function () {
        window.location.href = href;
      });
    });
  }

  /* ── Animação de entrada ao carregar a página ── */
  function pageEnter() {
    document.body.classList.add('pt-page-hidden');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('pt-page-visible');
        document.body.classList.remove('pt-page-hidden');

        // Garante que o overlay suma ao chegar
        setTimeout(hideOverlay, 60);
      });
    });
  }

  /* ── Init ── */
  function init() {
    createOverlay();
    pageEnter();
    interceptLinks();
  }

  // Aguarda o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Ao usar o botão voltar/avançar do navegador
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      hideOverlay();
      document.body.classList.add('pt-page-visible');
      document.body.classList.remove('pt-page-hidden');
    }
  });

})();
