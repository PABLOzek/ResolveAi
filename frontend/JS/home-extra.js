/* ============================================================
   home-extra.js — Scripts inline extraídos do home.html
   (Banner de localização, Planos de Usuário, Planos de Prestador)
   Resolve Aí
   ============================================================ */

// ---- Banner de localização ----
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('locationBanner');
  if (!banner) return;
  const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
  const hasCity   = !!user.cidade;
  const hasCoords = !!sessionStorage.getItem('resolveai_coords');
  const dismissed = sessionStorage.getItem('locationBannerDismissed');
  if (!hasCity && !hasCoords && !dismissed) {
    banner.style.display = 'flex';
  }
});

function allowLocationFromBanner() {
  dismissLocationBanner();
  requestGeolocation();
}

function dismissLocationBanner() {
  sessionStorage.setItem('locationBannerDismissed', '1');
  const banner = document.getElementById('locationBanner');
  if (banner) banner.style.display = 'none';
}

// ---- Planos do Usuário ----
var billingAnual = false;

function abrirPlanosUsuario() {
  var modal = document.getElementById('planosUsuarioModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharPlanosUsuario() {
  var modal = document.getElementById('planosUsuarioModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function toggleBilling() {
  billingAnual = !billingAnual;
  var sw          = document.getElementById('billingSwitch');
  var labelMes    = document.getElementById('toggleLabelMes');
  var labelAno    = document.getElementById('toggleLabelAno');
  var priceBasico = document.getElementById('priceBasico');
  var pricePremium= document.getElementById('pricePremium');
  var noteBasico  = document.getElementById('noteBasico');
  var notePremium = document.getElementById('notePremium');

  if (billingAnual) {
    sw.classList.add('annual');
    labelMes.classList.remove('active');
    labelAno.classList.add('active');
    priceBasico.textContent  = '18,32';
    pricePremium.textContent = '24,65';
    noteBasico.style.display   = 'block';
    notePremium.style.display  = 'block';
  } else {
    sw.classList.remove('annual');
    labelMes.classList.add('active');
    labelAno.classList.remove('active');
    priceBasico.textContent  = '19,99';
    pricePremium.textContent = '25,99';
    noteBasico.style.display   = 'none';
    notePremium.style.display  = 'none';
  }
}

function assinar(plano) {
  var periodo = billingAnual ? 'anual' : 'mensal';
  showToast('Redirecionando para o plano ' + plano + ' (' + periodo + ')… 🚀', 'success');
  setTimeout(function() { fecharPlanosUsuario(); }, 1800);
}

// ---- Plano do Prestador ----
var billingAnualPrest = false;

function abrirPlanosPrestador() {
  var modal = document.getElementById('planosPrestadorModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharPlanosPrestador() {
  var modal = document.getElementById('planosPrestadorModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function toggleBillingPrestador() {
  billingAnualPrest = !billingAnualPrest;
  var sw       = document.getElementById('billingSwitchPrest');
  var labelMes = document.getElementById('toggleLabelMesPrest');
  var labelAno = document.getElementById('toggleLabelAnoPrest');
  var price    = document.getElementById('pricePrestador');
  var note     = document.getElementById('notePrestador');

  if (billingAnualPrest) {
    sw.classList.add('annual');
    labelMes.classList.remove('active');
    labelAno.classList.add('active');
    price.textContent = '30,99';
    note.style.display = 'block';
  } else {
    sw.classList.remove('annual');
    labelMes.classList.add('active');
    labelAno.classList.remove('active');
    price.textContent = '32,99';
    note.style.display = 'none';
  }
}

function assinarPrestador() {
  var periodo = billingAnualPrest ? 'anual' : 'mensal';
  showToast('Redirecionando para o Prestador Pro (' + periodo + ')… 🚀', 'success');
  setTimeout(function() { fecharPlanosPrestador(); }, 1800);
}

// ---- Fechar modais com Escape ----
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { fecharPlanosUsuario(); fecharPlanosPrestador(); }
});
