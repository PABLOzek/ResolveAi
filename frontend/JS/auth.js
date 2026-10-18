/* ============================================================
   auth.js — Lógica de autenticação (login, cadastro, utilitários)
   Resolve Aí
   ============================================================ */

// ---- Utilitários ----

/**
 * Exibe uma notificação toast na tela
 * @param {string} message - Texto da notificação
 * @param {'success'|'error'|''} type - Tipo visual
 */
function showToast(message, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/**
 * Mostra ou oculta a senha de um campo
 * @param {string} inputId - ID do campo de senha
 * @param {HTMLElement} btn - Botão de toggle
 */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.title = isHidden ? 'Ocultar senha' : 'Mostrar senha';
  btn.style.color = isHidden ? 'var(--yellow-500)' : 'var(--gray-400)';
}

/**
 * Aplica máscara de CPF ao campo
 * @param {HTMLInputElement} input
 */
function maskCPF(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  input.value = v;
}

/**
 * Valida se o CPF digitado é válido
 * @param {string} cpf
 * @returns {boolean}
 */
function isValidCPF(cpf) {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let rem = (sum * 10) % 11;
  if (rem >= 10) rem = 0;
  if (rem !== parseInt(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  rem = (sum * 10) % 11;
  if (rem >= 10) rem = 0;
  return rem === parseInt(digits[10]);
}

/**
 * Verifica se o e-mail tem formato válido
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ---- Força da senha ----

/**
 * Avalia e exibe a força da senha em tempo real
 * @param {string} password
 */
function checkPasswordStrength(password) {
  const fill  = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  if (!fill || !label) return;

  let score = 0;
  if (password.length >= 8)                          score++;
  if (/[A-Z]/.test(password))                       score++;
  if (/[a-z]/.test(password))                       score++;
  if (/\d/.test(password))                          score++;
  if (/[^A-Za-z0-9]/.test(password))               score++;

  const configs = [
    { pct: '0%',   color: 'transparent',          text: '' },
    { pct: '25%',  color: '#ef4444',              text: '🔴 Muito fraca' },
    { pct: '50%',  color: '#f97316',              text: '🟠 Fraca' },
    { pct: '75%',  color: 'var(--yellow-400)',    text: '🟡 Média' },
    { pct: '90%',  color: '#22c55e',              text: '🟢 Forte' },
    { pct: '100%', color: 'var(--green-500)',     text: '✅ Muito forte' },
  ];

  const cfg = configs[score] || configs[0];
  fill.style.width      = cfg.pct;
  fill.style.background = cfg.color;
  label.textContent     = cfg.text;
  label.style.color     = cfg.color;
}

/**
 * Tenta detectar a cidade do usuário via Geolocation API + reverse geocoding
 */
function detectarLocalizacao() {
  if (!navigator.geolocation) {
    showToast('Geolocalização não suportada neste navegador.', 'error');
    return;
  }
  const cidadeInput = document.getElementById('cidade');
  if (cidadeInput) { cidadeInput.placeholder = 'Detectando…'; cidadeInput.disabled = true; }

  navigator.geolocation.getCurrentPosition(
    async pos => {
      try {
        const { latitude, longitude } = pos.coords;
        const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=pt`);
        const data = await res.json();
        const addr = data.address || {};
        const city = addr.city || addr.town || addr.village || addr.county || '';
        const state = addr.state_code || addr.state || '';
        if (cidadeInput) {
          cidadeInput.value    = city ? (state ? `${city}, ${state}` : city) : '';
          cidadeInput.disabled = false;
          cidadeInput.placeholder = 'Ex: São Paulo, SP';
        }
        // Salva coords para uso na home
        sessionStorage.setItem('resolveai_coords', JSON.stringify({ lat: latitude, lng: longitude, city: cidadeInput?.value || '' }));
        showToast('Localização detectada! 📍', 'success');
      } catch {
        if (cidadeInput) { cidadeInput.disabled = false; cidadeInput.placeholder = 'Ex: São Paulo, SP'; }
        showToast('Não foi possível obter a cidade. Digite manualmente.', 'error');
      }
    },
    () => {
      if (cidadeInput) { cidadeInput.disabled = false; cidadeInput.placeholder = 'Ex: São Paulo, SP'; }
      showToast('Permissão de localização negada. Digite sua cidade.', 'error');
    },
    { timeout: 10000 }
  );
}



/**
 * Exibe ou oculta o campo de profissão de acordo com o tipo selecionado
 */
function handleAccountType() {
  const isPrestador  = document.getElementById('typePrestador')?.checked;
  const profGroup    = document.getElementById('profissaoGroup');
  const profInput    = document.getElementById('profissao');
  if (!profGroup) return;

  if (isPrestador) {
    profGroup.style.display = 'block';
    if (profInput) profInput.required = true;
  } else {
    profGroup.style.display = 'none';
    if (profInput) { profInput.required = false; profInput.value = ''; }
  }
}

// ---- Login ----

/**
 * Processa o formulário de login
 */
function handleLogin() {
  const identifier = document.getElementById('identifier')?.value.trim();
  const password   = document.getElementById('password')?.value;

  if (!identifier) { showToast('Informe seu e-mail ou CPF.', 'error'); return; }
  if (!password)   { showToast('Informe sua senha.', 'error'); return; }

  // Simula autenticação (em produção conectaria a uma API real)
  const btn = document.querySelector('.auth-card .btn-primary');
  if (btn) { btn.textContent = 'Entrando…'; btn.disabled = true; }

  setTimeout(() => {
    // Salva dados de sessão simulados
    const userName = identifier.includes('@') ? identifier.split('@')[0] : 'Usuário';
    sessionStorage.setItem('resolveai_user', JSON.stringify({
      name: capitalize(userName),
      identifier,
      type: 'usuario',
    }));

    showToast('Login realizado com sucesso! ✅', 'success');
    setTimeout(() => window.location.href = 'home.html', 800);
  }, 1200);
}

// ---- Cadastro ----

/**
 * Processa o formulário de cadastro
 */
function handleRegister() {
  const accountType    = document.querySelector('input[name="accountType"]:checked')?.value;
  const fullName       = document.getElementById('fullName')?.value.trim();
  const email          = document.getElementById('email')?.value.trim();
  const cpf            = document.getElementById('cpf')?.value;
  const cidade         = document.getElementById('cidade')?.value.trim();
  const profissao      = document.getElementById('profissao')?.value.trim();
  const password       = document.getElementById('regPassword')?.value;
  const confirmPass    = document.getElementById('confirmPassword')?.value;
  const termsAccepted  = document.getElementById('terms')?.checked;

  // Validações
  if (!accountType)                   { showToast('Selecione o tipo de conta.', 'error'); return; }
  if (!fullName || fullName.length < 3){ showToast('Informe seu nome completo.', 'error'); return; }
  if (!isValidEmail(email))           { showToast('Informe um e-mail válido.', 'error'); return; }
  if (!isValidCPF(cpf))               { showToast('Informe um CPF válido.', 'error'); return; }
  if (!cidade || cidade.length < 2)   { showToast('Informe sua cidade.', 'error'); return; }
  if (accountType === 'prestador' && !profissao) { showToast('Informe sua profissão.', 'error'); return; }
  if (!password || password.length < 8){ showToast('A senha deve ter pelo menos 8 caracteres.', 'error'); return; }
  if (password !== confirmPass)       { showToast('As senhas não coincidem.', 'error'); return; }
  if (!termsAccepted)                 { showToast('Aceite os termos para continuar.', 'error'); return; }

  const btn = document.querySelector('.register-card .btn-primary');
  if (btn) { btn.textContent = 'Criando conta…'; btn.disabled = true; }

  setTimeout(() => {
    sessionStorage.setItem('resolveai_user', JSON.stringify({
      name: fullName,
      email,
      cpf,
      cidade,
      type: accountType,
      profissao: accountType === 'prestador' ? profissao : null,
    }));

    showToast('Conta criada com sucesso! 🎉', 'success');
    setTimeout(() => window.location.href = 'home.html', 800);
  }, 1400);
}

// ---- Helpers ----

/**
 * Capitaliza a primeira letra de cada palavra
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

// ---- Inicia dados do usuário na home ----
document.addEventListener('DOMContentLoaded', () => {
  const userEl = document.getElementById('userNameNav');
  if (userEl) {
    const raw  = sessionStorage.getItem('resolveai_user');
    const user = raw ? JSON.parse(raw) : null;
    userEl.textContent = user?.name ? user.name.split(' ')[0] : 'Minha conta';
  }
});
