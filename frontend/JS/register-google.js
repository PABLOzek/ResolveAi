/* ============================================================
   register-google.js — Lógica de registro via Google (register.html)
   Resolve Aí
   ============================================================ */

function handleGoogleRegister() {
  const btn = document.querySelector('.btn-google');
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
    showToast('Conta criada com Google! 🎉', 'success');
    setTimeout(() => window.location.href = 'home.html', 800);
  }, 1400);
}
