    /* ─────────────────────────────────────────
       DADOS MOCK
    ───────────────────────────────────────── */
    const CONVERSATIONS = [
      {
        id: 1,
        name: 'Carlos Andrade',
        role: 'Eletricista',
        photo: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=100&h=100&fit=crop&crop=faces',
        status: 'online',
        lastMsg: 'Posso ir amanhã às 14h, fica bem?',
        time: 'agora',
        unread: 2,
        premium: true,
        messages: [
          { id:1, from:'them', text:'Olá! Vi que você precisa de um eletricista. Posso ajudar!', time:'09:10' },
          { id:2, from:'me',   text:'Oi Carlos, sim! Tenho um problema na instalação da sala.', time:'09:12' },
          { id:3, from:'them', text:'Pode me descrever o problema? É um curto ou falta de energia?', time:'09:14' },
          { id:4, from:'me',   text:'Acho que é um curto no quadro de energia. Fica cheirando a queimado às vezes.', time:'09:15' },
          { id:5, from:'them', text:'Entendido! Isso precisa de atenção urgente mesmo. Posso ir amanhã às 14h, fica bem?', time:'09:17' },
        ]
      },
      {
        id: 2,
        name: 'Mariana Castro',
        role: 'Psicóloga',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces',
        status: 'away',
        lastMsg: 'Ótimo, te aguardo na sessão de quinta!',
        time: '14min',
        unread: 0,
        premium: true,
        messages: [
          { id:1, from:'them', text:'Bom dia! Confirmando nossa sessão de quinta-feira às 10h.', time:'08:00' },
          { id:2, from:'me',   text:'Bom dia! Confirmo sim, estarei lá.', time:'08:30' },
          { id:3, from:'them', text:'Ótimo, te aguardo na sessão de quinta!', time:'08:32' },
        ]
      },
      {
        id: 3,
        name: 'Chef Tiago Melo',
        role: 'Chef de Cozinha',
        photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=faces',
        status: 'offline',
        lastMsg: 'Vou montar o cardápio e te envio em breve.',
        time: '2h',
        unread: 0,
        premium: true,
        messages: [
          { id:1, from:'me',   text:'Oi Tiago! Quero contratar você para um jantar de 20 pessoas no sábado.', time:'11:00' },
          { id:2, from:'them', text:'Que ótimo! Alguma preferência de culinária? Tenho especialidade em italiana e mediterrânea.', time:'11:20' },
          { id:3, from:'me',   text:'Italiana seria perfeito! Algo sofisticado mas sem exageros.', time:'11:22' },
          { id:4, from:'them', text:'Vou montar o cardápio e te envio em breve.', time:'11:45' },
        ]
      },
      {
        id: 4,
        name: 'Patrícia Vieira',
        role: 'Nutricionista',
        photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop&crop=faces',
        status: 'online',
        lastMsg: 'Seu plano alimentar está pronto!',
        time: '3h',
        unread: 1,
        premium: true,
        messages: [
          { id:1, from:'them', text:'Olá! Finalizei a análise dos seus resultados de exames.', time:'07:30' },
          { id:2, from:'them', text:'Seu plano alimentar está pronto! Quando posso te enviar?', time:'07:31' },
          { id:3, from:'me',   text:'Pode enviar agora mesmo! Estou ansioso.', time:'09:00' },
        ]
      },
      {
        id: 5,
        name: 'Camila Torres',
        role: 'Fotógrafa',
        photo: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=100&h=100&fit=crop&crop=faces',
        status: 'offline',
        lastMsg: 'As fotos do seu evento ficaram lindas!',
        time: 'ontem',
        unread: 0,
        premium: true,
        messages: [
          { id:1, from:'them', text:'Oi! Acabei de editar as fotos do seu evento.', time:'Ontem 18:00' },
          { id:2, from:'them', text:'As fotos do seu evento ficaram lindas! Vou enviar o link do álbum.', time:'Ontem 18:01' },
          { id:3, from:'me',   text:'Que ótima notícia! Mal posso esperar para ver 😍', time:'Ontem 19:30' },
        ]
      },
    ];

    let activeConv = null;
    let currentFilter = 'all';
    let typingTimeout;

    /* ─────────────────────────────────────────
       INIT
    ───────────────────────────────────────── */
    function init() {
      loadUserName();
      checkSubscription();
      renderList(CONVERSATIONS);
    }

    function loadUserName() {
      try {
        const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
        document.getElementById('userNameNav').textContent = user.name || 'Usuário';
      } catch {}
    }

    function isSubscriber() {
      try {
        const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
        return !!user.subscriber;
      } catch { return false; }
    }

    function checkSubscription() {
      if (!isSubscriber()) {
        document.getElementById('subscribeWall').classList.add('show');
      }
    }

    /* ─────────────────────────────────────────
       RENDER SIDEBAR
    ───────────────────────────────────────── */
    function renderList(convs) {
      const container = document.getElementById('convList');
      container.innerHTML = '';

      if (!convs.length) {
        container.innerHTML = `<div style="padding:32px 20px;text-align:center;color:var(--gray-400);font-size:13px;">Nenhuma conversa encontrada</div>`;
        return;
      }

      convs.forEach(c => {
        const statusClass = c.status === 'online' ? 'online' : c.status === 'away' ? 'away' : 'offline';
        const isActive = activeConv && activeConv.id === c.id ? 'active' : '';
        const unreadHtml = c.unread > 0 ? `<span class="conv-badge">${c.unread}</span>` : '';
        const unreadClass = c.unread > 0 ? 'unread' : '';

        container.innerHTML += `
          <div class="conv-item ${isActive}" onclick="openConversation(${c.id})" data-id="${c.id}" data-status="${c.status}">
            <div class="conv-avatar">
              <img src="${c.photo}" alt="${c.name}" />
              <span class="conv-status-dot ${statusClass}"></span>
            </div>
            <div class="conv-info">
              <div class="conv-top">
                <span class="conv-name">${c.name}</span>
                <span class="conv-time">${c.time}</span>
              </div>
              <div class="conv-role">${c.role}</div>
              <div class="conv-bottom">
                <span class="conv-last-msg ${unreadClass}">${c.lastMsg}</span>
                ${unreadHtml}
              </div>
            </div>
          </div>
        `;
      });
    }

    /* ─────────────────────────────────────────
       ABRIR CONVERSA
    ───────────────────────────────────────── */
    function openConversation(id) {
      if (!isSubscriber()) {
        document.getElementById('subscribeWall').classList.add('show');
        return;
      }

      activeConv = CONVERSATIONS.find(c => c.id === id);
      if (!activeConv) return;

      // Zerar não lidas
      activeConv.unread = 0;

      // Atualizar sidebar highlight
      document.querySelectorAll('.conv-item').forEach(el => {
        el.classList.toggle('active', +el.dataset.id === id);
        if (+el.dataset.id === id) {
          el.querySelector('.conv-badge')?.remove();
          const msgEl = el.querySelector('.conv-last-msg');
          if (msgEl) msgEl.classList.remove('unread');
        }
      });

      // Mostrar chat
      document.getElementById('chatEmpty').style.display = 'none';
      const chatActive = document.getElementById('chatActive');
      chatActive.style.display = 'flex';

      // Header
      document.getElementById('chatHeaderPhoto').src = activeConv.photo;
      document.getElementById('chatHeaderPhoto').alt = activeConv.name;
      document.getElementById('chatHeaderName').textContent = activeConv.name;

      const dot = document.getElementById('chatHeaderDot');
      const statusText = document.getElementById('chatHeaderStatus');
      dot.className = 'chat-header-status-dot';

      if (activeConv.status === 'online') {
        dot.classList.add('online');
        statusText.textContent = 'Online agora';
        statusText.className = 'chat-header-status-text online';
      } else if (activeConv.status === 'away') {
        dot.classList.add('away');
        statusText.textContent = 'Visto há 14 min';
        statusText.className = 'chat-header-status-text';
      } else {
        dot.classList.add('offline');
        statusText.textContent = 'Visto há 2 horas';
        statusText.className = 'chat-header-status-text';
      }

      renderMessages();

      // Mobile: ocultar sidebar
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.add('hidden');
        document.getElementById('btnMobileBack').style.display = 'flex';
      }
    }

    /* ─────────────────────────────────────────
       RENDERIZAR MENSAGENS
    ───────────────────────────────────────── */
    function renderMessages() {
      if (!activeConv) return;
      const container = document.getElementById('chatMessages');
      container.innerHTML = '';

      // Date divider
      container.innerHTML += `
        <div class="msg-date-divider"><span>Hoje</span></div>
      `;

      activeConv.messages.forEach(msg => {
        const isMine = msg.from === 'me';
        container.innerHTML += `
          <div class="msg-row ${isMine ? 'mine' : 'theirs'}">
            ${!isMine ? `<div class="msg-avatar"><img src="${activeConv.photo}" alt="${activeConv.name}" /></div>` : ''}
            <div>
              <div class="msg-bubble">${escapeHtml(msg.text)}</div>
              <div class="msg-meta">
                <span class="msg-time">${msg.time}</span>
                ${isMine ? `<svg class="msg-read-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
              </div>
            </div>
          </div>
        `;
      });

      scrollToBottom(container);
    }

    function scrollToBottom(container) {
      container = container || document.getElementById('chatMessages');
      container.scrollTop = container.scrollHeight;
    }

    /* ─────────────────────────────────────────
       ENVIAR MENSAGEM
    ───────────────────────────────────────── */
    function sendMessage() {
      if (!activeConv) return;
      const input = document.getElementById('msgInput');
      const text = input.value.trim();
      if (!text) return;

      const now = new Date();
      const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

      const newMsg = { id: Date.now(), from: 'me', text, time };
      activeConv.messages.push(newMsg);

      // Atualizar last msg no sidebar
      activeConv.lastMsg = text;
      activeConv.time = 'agora';
      updateSidebarItem(activeConv);

      // Limpar input
      input.value = '';
      input.style.height = 'auto';

      renderMessages();

      // Simular digitação e resposta automática
      if (activeConv.status === 'online') {
        simulateReply();
      }
    }

    function simulateReply() {
      const container = document.getElementById('chatMessages');
      clearTimeout(typingTimeout);

      // Mostrar typing
      const typingEl = document.createElement('div');
      typingEl.className = 'typing-indicator';
      typingEl.id = 'typingIndicator';
      typingEl.innerHTML = `
        <div class="msg-avatar"><img src="${activeConv.photo}" alt="${activeConv.name}" /></div>
        <div class="typing-dots"><span></span><span></span><span></span></div>
      `;
      container.appendChild(typingEl);
      scrollToBottom(container);

      typingTimeout = setTimeout(() => {
        document.getElementById('typingIndicator')?.remove();

        const replies = [
          'Entendido! Vou verificar minha agenda.',
          'Perfeito! Pode contar comigo.',
          'Ótimo! Assim que tiver mais detalhes me avise.',
          'Combinado! Te confirmo em breve.',
          'Claro! Fico à disposição para ajudar.'
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

        activeConv.messages.push({ id: Date.now(), from: 'them', text: reply, time });
        activeConv.lastMsg = reply;
        activeConv.time = 'agora';
        updateSidebarItem(activeConv);
        renderMessages();
      }, 2200);
    }

    function updateSidebarItem(conv) {
      const item = document.querySelector(`.conv-item[data-id="${conv.id}"]`);
      if (item) {
        item.querySelector('.conv-last-msg').textContent = conv.lastMsg;
        item.querySelector('.conv-time').textContent = conv.time;
      }
    }

    function handleEnter(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }

    function autoResize(el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 100) + 'px';
    }

    /* ─────────────────────────────────────────
       FILTROS
    ───────────────────────────────────────── */
    function filterTab(btn, filter) {
      currentFilter = filter;
      document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    }

    function filterConversations() {
      applyFilters();
    }

    function applyFilters() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      let result = CONVERSATIONS.filter(c => {
        const matchText = c.name.toLowerCase().includes(query) || c.role.toLowerCase().includes(query);
        const matchTab  = currentFilter === 'all'    ? true
                        : currentFilter === 'unread' ? c.unread > 0
                        : currentFilter === 'online' ? c.status === 'online'
                        : true;
        return matchText && matchTab;
      });
      renderList(result);
    }

    /* ─────────────────────────────────────────
       MOBILE
    ───────────────────────────────────────── */
    function closeMobileChat() {
      document.getElementById('sidebar').classList.remove('hidden');
      document.getElementById('chatActive').style.display = 'none';
      document.getElementById('chatEmpty').style.display = 'flex';
      document.getElementById('btnMobileBack').style.display = 'none';
      activeConv = null;
    }

    function viewProfile() {
      if (activeConv) window.location.href = `prestador-perfil.html`;
    }

    /* ─────────────────────────────────────────
       NAVBAR MENU
    ───────────────────────────────────────── */
    function toggleUserMenu() {
      document.getElementById('userMenu').classList.toggle('open');
    }
    document.addEventListener('click', e => {
      if (!e.target.closest('.navbar-user')) {
        document.getElementById('userMenu').classList.remove('open');
      }
    });

    /* ─────────────────────────────────────────
       SUBSCRIPTION
    ───────────────────────────────────────── */
    function subscribeNow() {
      try {
        const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
        user.subscriber = true;
        sessionStorage.setItem('resolveai_user', JSON.stringify(user));
      } catch {}
      document.getElementById('subscribeWall').classList.remove('show');
      showToast('Assinatura ativada! 🎉 Agora você pode conversar com prestadores.', 'success');
    }

    /* ─────────────────────────────────────────
       UTILITÁRIOS
    ───────────────────────────────────────── */
    function escapeHtml(text) {
      return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function showToast(msg, type) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.className = 'toast' + (type ? ' ' + type : '');
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 3500);
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.getElementById('subscribeWall').classList.remove('show');
    });

    /* ─────────────────────────────────────────
       PATCHEAR "CONVERSAR COM PRESTADOR"
       Verifica premium antes de abrir chat
    ───────────────────────────────────────── */
    window.openChatWithPrestador = function(prestadorName, isPremium) {
      if (isPremium && isSubscriber()) {
        window.location.href = 'conversas.html';
      } else if (!isPremium) {
        // Manter comportamento original (modal de contato)
        return false; // indica que deve usar comportamento padrão
      } else {
        // Tem premium mas usuário não é assinante
        document.getElementById('subscribeWall').classList.add('show');
      }
    };

    init();
