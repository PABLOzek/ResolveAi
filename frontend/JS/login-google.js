/* ============================================================
   login-google.js — Lógica de login via Google (index.html)
   Resolve Aí
   ============================================================ */

function handleGoogleLogin() {
  const btn = document.getElementById('btnGoogle');
  btn.textContent = 'Conectando ao Google…';
  btn.disabled = true;

  setTimeout(() => {
    const googleUser = {
      name: 'Usuário Google',
      email: 'usuario@gmail.com',
      via: 'google',
      type: 'usuario',
      cidade: '',
    };
    sessionStorage.setItem('resolveai_user', JSON.stringify(googleUser));
    showToast('Login realizado com Google! ✅', 'success');
    setTimeout(() => window.location.href = 'home.html', 800);
  }, 1400);
}
