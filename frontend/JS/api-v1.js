(() => {
  const API = window.RESOLVE_API_BASE || 'http://localhost:3000';
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = (v) => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const imgUrl = (url) => !url ? '' : (/^https?:\/\//i.test(url) || /^data:/i.test(url) ? url : `${API}${url.startsWith('/') ? '' : '/'}${url}`);
  const initials = (name) => esc((name || 'P').trim().split(/\s+/).slice(0,2).map(x => x[0] || '').join('').toUpperCase());
  async function request(path, options = {}) {
    let response;
    try {
      response = await fetch(`${API}${path}`, {
        ...options,
        headers: { ...(options.body ? {'Content-Type':'application/json'} : {}), ...(options.headers || {}) },
      });
    } catch {
      throw new Error('Não foi possível conectar à API. Confirme se o backend está executando em ' + API + '.');
    }
    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    if (!response.ok) {
      const message = data?.message;
      throw new Error(Array.isArray(message) ? message.join(' ') : (message || `Falha na API (${response.status}).`));
    }
    return data;
  }
  const get = (path) => request(path);
  const post = (path, body) => request(path, {method:'POST', body:JSON.stringify(body)});
  const put = (path, body) => request(path, {method:'PUT', body:JSON.stringify(body)});
  const patch = (path, body) => request(path, {method:'PATCH', body:JSON.stringify(body)});
  const del = (path) => request(path, {method:'DELETE'});
  const showError = (el, error) => { if (el) el.innerHTML = `<div class="empty-state"><strong>Não foi possível carregar os dados.</strong><p>${esc(error.message || error)}</p><button class="button button-outline" onclick="location.reload()">Tentar novamente</button></div>`; };
  const showToast = (message, type='info') => {
    let el = $('#apiToast');
    if (!el) { el = document.createElement('div'); el.id='apiToast'; el.className='api-toast'; document.body.appendChild(el); }
    el.textContent = message; el.dataset.type=type; el.hidden=false;
    clearTimeout(window.__resolveToastTimer);
    window.__resolveToastTimer=setTimeout(()=>{el.hidden=true;},5000);
  };
  function card(p) {
    const cats = [...new Set((p.servicos || []).map(s => s.categoria?.nome).filter(Boolean))];
    const category = cats.join(' · ') || 'Profissional';
    const photo = p.fotoPerfil ? `<img class="card-photo" src="${esc(imgUrl(p.fotoPerfil))}" alt="Foto de ${esc(p.nome)}" loading="lazy" onerror="this.style.display='none'">` : `<div class="card-photo api-placeholder" aria-hidden="true">${initials(p.nome)}</div>`;
    return `<article class="professional-card">${photo}<div class="card-body"><span class="category">${esc(category)}</span><h3>${esc(p.nome)}</h3><p class="meta">⌖ ${esc(p.cidade || 'Cidade não informada')}</p><p>${esc(p.apresentacao || 'Consulte os serviços e entre em contato diretamente.')}</p><a class="button button-outline" href="prestador-perfil.html?id=${encodeURIComponent(p.id)}">Ver perfil</a></div></article>`;
  }
  function renderCards(el, list) {
    if (!el) return;
    el.innerHTML = list.length ? list.map(card).join('') : '<div class="empty-state"><strong>Nenhum profissional encontrado.</strong><p>Cadastre profissionais ou ajuste os filtros de busca.</p><a class="button button-outline" href="gestao.html">Gerenciar cadastros</a></div>';
  }
  async function fillCategories(select, selected='') {
    if (!select) return [];
    const categories = await get('/categorias');
    select.innerHTML = `<option value="">Todas as categorias</option>` + categories.map(c => `<option value="${c.id}" ${String(c.id)===String(selected)?'selected':''}>${esc(c.nome)}</option>`).join('');
    return categories;
  }
  async function bootHome() {
    const grid = $('#homeProfessionals');
    try {
      const [professionals, categories] = await Promise.all([get('/profissionais'), fillCategories($('#homeCategory'))]);
      renderCards(grid, professionals.slice(0, 6));
      const form=$('#homeSearch');
      form?.addEventListener('submit', e => {
        e.preventDefault();
        const q=$('#homeQuery')?.value.trim() || '';
        const c=$('#homeCategory')?.value || '';
        location.href=`resultados.html?q=${encodeURIComponent(q)}&categoria=${encodeURIComponent(c)}`;
      });
      const note=$('.demo-note');
      if(note) note.textContent = `${professionals.length} profissional(is) carregado(s) da API e do banco de dados.`;
    } catch(e) { showError(grid,e); }
  }
  async function bootResults() {
    const grid=$('#resultsProfessionals'), params=new URLSearchParams(location.search);
    const query=$('#resultsQuery'), category=$('#resultsCategory'), form=$('#resultsSearch');
    if(query) query.value=params.get('q') || '';
    try {
      await fillCategories(category, params.get('categoria') || '');
      async function update(e) {
        if(e) e.preventDefault();
        const qs=new URLSearchParams();
        if(query?.value.trim()) qs.set('nome', query.value.trim());
        if(category?.value) qs.set('categoriaId', category.value);
        try {
          grid.innerHTML='<div class="empty-state">Buscando profissionais…</div>';
          const list=await get('/profissionais'+(qs.toString()?'?'+qs.toString():''));
          renderCards(grid,list);
          const summary=$('#resultsSummary');
          if(summary) summary.textContent=`${list.length} ${list.length===1?'profissional encontrado':'profissionais encontrados'}.`;
        } catch(err) { showError(grid,err); }
      }
      form?.addEventListener('submit',update);
      category?.addEventListener('change',()=>update());
      await update();
    } catch(e) { showError(grid,e); }
  }
  async function bootProfile() {
    const target=$('#professionalProfile'); if(!target) return;
    const id=new URLSearchParams(location.search).get('id');
    if(!id) { showError(target,new Error('Nenhum profissional foi selecionado. Volte aos resultados e escolha um perfil.')); return; }
    try {
      const p=await get(`/profissionais/${encodeURIComponent(id)}`);
      document.title=`${p.nome} | Resolve Aí`;
      let phone=String(p.whatsapp || p.telefone || '').replace(/\D/g,''); if(phone && phone.length<=11) phone='55'+phone;
      const phoneLink=phone ? `<a class="contact-detail" href="https://wa.me/${esc(phone)}" target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp ↗</a>` : '';
      const services=p.servicos || [];
      const works=p.trabalhos || [];
      const photo=p.fotoPerfil ? `<img class="profile-avatar" src="${esc(imgUrl(p.fotoPerfil))}" alt="Foto de ${esc(p.nome)}" onerror="this.style.display='none'">` : `<div class="profile-avatar api-placeholder">${initials(p.nome)}</div>`;
      const cats=[...new Set(services.map(s=>s.categoria?.nome).filter(Boolean))];
      target.innerHTML=`<section class="profile-top">${photo}<div><span class="category">${esc(cats.join(' · ') || 'Profissional')}</span><h1>${esc(p.nome)}</h1><p>⌖ ${esc(p.cidade || 'Cidade não informada')}</p><p>${esc(p.apresentacao || 'Este profissional ainda não adicionou uma apresentação.')}</p><div class="profile-actions">${phoneLink}</div></div></section>
      <section class="content-card"><h2>Serviços oferecidos</h2><div class="service-list">${services.length?services.map(s=>`<div class="service-item"><strong>${esc(s.nome)}</strong><p>${esc(s.descricao)}</p><span class="muted">${esc(s.categoria?.nome || 'Categoria')}</span></div>`).join(''):'<p class="muted">Nenhum serviço cadastrado.</p>'}</div></section>
      <section class="content-card"><h2>Trabalhos realizados</h2><div class="work-grid">${works.length?works.map(w=>`<article class="work-card"><div class="work-photos">${(w.imagens||[]).map((im,i)=>`<img src="${esc(imgUrl(im.url))}" alt="${esc(im.descricao || `Imagem ${i+1} de ${w.titulo}`)}" loading="lazy" onerror="this.style.display='none'">`).join('')}</div><h3>${esc(w.titulo)}</h3><p>${esc(w.descricao)}</p>${w.dataRealizacao?`<p class="muted">${esc(w.dataRealizacao)}</p>`:''}</article>`).join(''):'<p class="muted">Este profissional ainda não cadastrou trabalhos.</p>'}</div></section>
      <section class="content-card"><h2>Contato</h2><div class="contact-grid">${phoneLink||'<p class="muted">Nenhum contato público cadastrado.</p>'}<span class="contact-detail">${esc(p.cidade || 'Cidade não informada')}</span></div></section>`;
    } catch(e) { showError(target,e); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    if($('#homeProfessionals')) bootHome();
    if($('#resultsProfessionals')) bootResults();
    if($('#professionalProfile')) bootProfile();
  });
  window.ResolveAPI={base:API,get,post,put,patch,del,fillCategories,showToast,imgUrl};
})();
