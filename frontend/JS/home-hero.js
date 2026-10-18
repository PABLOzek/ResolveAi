    // Hero magazine slideshow
    let heroSlide = 0;
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots   = document.querySelectorAll('.hero-dot');
    function goHeroSlide(n) {
      heroSlides[heroSlide].classList.remove('hero-slide-active');
      heroDots[heroSlide].classList.remove('hero-dot-active');
      heroSlide = (n + heroSlides.length) % heroSlides.length;
      heroSlides[heroSlide].classList.add('hero-slide-active');
      heroDots[heroSlide].classList.add('hero-dot-active');
    }
    if (heroSlides.length > 0) {
      setInterval(() => goHeroSlide(heroSlide + 1), 5000);
    }

    // ===== MODAIS DO FOOTER =====
    function abrirModal(id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function fecharModal(id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.plans-modal.open').forEach(function(m) { fecharModal(m.id); });
      }
    });
