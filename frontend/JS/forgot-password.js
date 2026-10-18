/* ============================================================
   forgot-password.js — Lógica da página de recuperação de senha
   Resolve Aí
   ============================================================ */

function handleForgotPassword() {
  const email = document.getElementById('resetEmail').value.trim();
  if (!isValidEmail(email)) { showToast('Informe um e-mail válido.', 'error'); return; }
  const btn = document.querySelector('#stepRequest .btn-primary');
  btn.textContent = 'Enviando…'; btn.disabled = true;
  setTimeout(() => {
    document.getElementById('stepRequest').style.display = 'none';
    document.getElementById('stepSuccess').style.display = 'block';
  }, 1500);
}
