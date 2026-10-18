/* ============================================================
   profile.js — Lógica da página de perfil do usuário
   Resolve Aí
   ============================================================ */

// ── Toggle senha ──
function togglePwd(id, btn) {
  const inp = document.getElementById(id);
  const hidden = inp.type === 'password';
  inp.type = hidden ? 'text' : 'password';
  btn.style.color = hidden ? 'var(--yellow-500)' : 'var(--gray-400)';
}

// ── Força da nova senha ──
function onNewPwdInput(val) {
  markDirty();
  const fill = document.getElementById('pwdStrFill');
  const lbl  = document.getElementById('pwdStrLbl');
  let sc = 0;
  if (val.length >= 8)           sc++;
  if (/[A-Z]/.test(val))        sc++;
  if (/[a-z]/.test(val))        sc++;
  if (/\d/.test(val))           sc++;
  if (/[^A-Za-z0-9]/.test(val)) sc++;
  const cfgs = [
    { p:'0%',   c:'transparent',       t:'' },
    { p:'25%',  c:'#ef4444',           t:'🔴 Muito fraca' },
    { p:'50%',  c:'#f97316',           t:'🟠 Fraca' },
    { p:'75%',  c:'var(--yellow-400)', t:'🟡 Média' },
    { p:'90%',  c:'#22c55e',           t:'🟢 Forte' },
    { p:'100%', c:'var(--green-500)',  t:'✅ Muito forte' },
  ];
  const cfg = cfgs[sc] || cfgs[0];
  fill.style.width = cfg.p; fill.style.background = cfg.c;
  lbl.textContent  = cfg.t; lbl.style.color = cfg.c;
}

// ── Dirty state ──
let isDirty = false;
function markDirty() {
  isDirty = true;
  document.getElementById('actionRow').style.display = 'flex';
}

// ── Foto de perfil ──
function handleAvatarChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('Imagem muito grande. Máx. 5 MB.', 'error'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    const img = document.getElementById('avatarImg');
    const fb  = document.getElementById('avatarFallback');
    img.src = ev.target.result;
    img.style.display = 'block';
    fb.style.display  = 'none';
    sessionStorage.setItem('resolveai_avatar', ev.target.result);
    markDirty();
    showToast('Foto atualizada! Salve para confirmar.', '');
  };
  reader.readAsDataURL(file);
}

// ── Salvar perfil ──
function saveProfile() {
  const name    = document.getElementById('profileName').value.trim();
  const cidade  = document.getElementById('profileCidade').value.trim();
  const curPwd  = document.getElementById('currentPwd').value;
  const newPwd  = document.getElementById('newPwd').value;
  const confPwd = document.getElementById('confirmPwd').value;

  if (!name || name.length < 2) { showToast('Informe seu nome completo.', 'error'); return; }

  if (newPwd || curPwd || confPwd) {
    if (!curPwd) { showToast('Informe sua senha atual para alterá-la.', 'error'); return; }
    if (newPwd.length < 8) { showToast('A nova senha deve ter ao menos 8 caracteres.', 'error'); return; }
    if (newPwd !== confPwd) { showToast('As novas senhas não coincidem.', 'error'); return; }
  }

  const btn = document.getElementById('btnSave');
  btn.textContent = 'Salvando…'; btn.disabled = true;

  setTimeout(() => {
    const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
    user.name   = name;
    user.cidade = cidade;
    if (newPwd) user.passwordChanged = true;
    sessionStorage.setItem('resolveai_user', JSON.stringify(user));

    ['currentPwd','newPwd','confirmPwd'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('pwdStrFill').style.width = '0%';
    document.getElementById('pwdStrLbl').textContent  = '';

    isDirty = false;
    document.getElementById('actionRow').style.display = 'none';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Salvar alterações';
    btn.disabled = false;

    showToast('Perfil atualizado com sucesso! ✅', 'success');
    setTimeout(() => window.location.href = 'home.html', 1200);
  }, 900);
}

function cancelChanges() {
  isDirty = false;
  document.getElementById('actionRow').style.display = 'none';
  loadProfile();
  showToast('Alterações descartadas.', '');
}

// ── Carregar dados do perfil ──
function loadProfile() {
  const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');

  document.getElementById('profileName').value   = user.name   || '';
  document.getElementById('profileEmail').value  = user.email  || user.identifier || '';
  document.getElementById('profileCidade').value = user.cidade || '';

  if (user.via === 'google') {
    document.getElementById('googleBadge').style.display = 'inline-flex';
  }

  const savedAvatar = sessionStorage.getItem('resolveai_avatar');
  const img = document.getElementById('avatarImg');
  const fb  = document.getElementById('avatarFallback');
  if (savedAvatar || user.photo) {
    img.src = savedAvatar || user.photo;
    img.style.display = 'block';
    fb.style.display  = 'none';
  } else {
    fb.textContent = (user.name || 'U')[0].toUpperCase();
  }

  const joined = sessionStorage.getItem('resolveai_joined') || new Date().toISOString();
  if (!sessionStorage.getItem('resolveai_joined'))
    sessionStorage.setItem('resolveai_joined', joined);
  const d = new Date(joined);
  document.getElementById('memberSince').textContent =
    `Membro desde ${d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
}

// ── Estatísticas ──
function loadStats() {
  const stats = JSON.parse(sessionStorage.getItem('resolveai_stats') || '{"contatos":0,"buscas":[],"cidades":[]}');

  document.getElementById('statContatos').textContent = stats.contatos || 0;
  document.getElementById('statBuscas').textContent   = stats.buscas?.length  || 0;
  const uniqueCities = [...new Set((stats.cidades || []).map(c => c.toLowerCase()))];
  document.getElementById('statCidades').textContent  = uniqueCities.length;

  const svcEl = document.getElementById('topServices');
  if (stats.buscas && stats.buscas.length > 0) {
    const freq = {};
    stats.buscas.forEach(b => { freq[b] = (freq[b] || 0) + 1; });
    const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0, 5);
    const max = sorted[0]?.[1] || 1;
    svcEl.innerHTML = sorted.map(([svc, cnt], i) => `
      <li>
        <span class="rank">${i+1}. ${svc}</span>
        <div class="stats-bar-wrap"><div class="stats-bar" style="width:${Math.round(cnt/max*100)}%"></div></div>
        <span class="stats-count">${cnt}x</span>
      </li>`).join('');
  }

  const citEl = document.getElementById('topCities');
  if (stats.cidades && stats.cidades.length > 0) {
    const freq = {};
    stats.cidades.forEach(c => { const k = c.toLowerCase(); freq[k] = (freq[k]||0)+1; });
    const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const max = sorted[0]?.[1] || 1;
    const cap = s => s.replace(/\b\w/g, c => c.toUpperCase());
    citEl.innerHTML = sorted.map(([city, cnt], i) => `
      <li>
        <span class="rank">${i+1}. ${cap(city)}</span>
        <div class="stats-bar-wrap"><div class="stats-bar" style="width:${Math.round(cnt/max*100)}%"></div></div>
        <span class="stats-count">${cnt}x</span>
      </li>`).join('');
  }
}

// ── Anima contadores ──
function animateCounters() {
  const els = [
    { el: document.getElementById('statContatos'), target: parseInt(document.getElementById('statContatos').textContent) || 0 },
    { el: document.getElementById('statBuscas'),   target: parseInt(document.getElementById('statBuscas').textContent)   || 0 },
    { el: document.getElementById('statCidades'),  target: parseInt(document.getElementById('statCidades').textContent)  || 0 },
  ];
  els.forEach(({ el, target }) => {
    if (target === 0) return;
    let cur = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur;
      if (cur >= target) clearInterval(timer);
    }, 30);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  loadStats();
  setTimeout(animateCounters, 300);
});
