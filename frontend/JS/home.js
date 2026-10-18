/* ============================================================
   home.js — Lógica da página inicial
   Resolve Aí
   ============================================================ */

// Fotos: Unsplash — licença gratuita (unsplash.com/license)
const professionals = [
  { photo: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200&h=200&fit=crop&crop=faces', name: 'Carlos Silva',      role: 'Eletricista',           rating: 4.9, reviews: 128, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['Residencial', 'Comercial', 'CREA'] },
  { photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop&crop=faces', name: 'Roberto Alves',     role: 'Encanador',             rating: 4.8, reviews:  95, location: 'Rio de Janeiro, RJ', city: 'rio de janeiro',  state: 'rj', tags: ['Hidráulica', 'Reformas'] },
  { photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=faces', name: 'Fernanda Costa',    role: 'Personal Trainer',      rating: 5.0, reviews: 210, location: 'Belo Horizonte, MG', city: 'belo horizonte',  state: 'mg', tags: ['Musculação', 'Funcional', 'CREF'] },
  { photo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop&crop=faces', name: 'João Pereira',      role: 'Pedreiro / Construtor', rating: 4.7, reviews:  67, location: 'Curitiba, PR',       city: 'curitiba',        state: 'pr', tags: ['Alvenaria', 'Reboco', 'Reformas'] },
  { photo: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&h=200&fit=crop&crop=faces', name: 'Ana Rodrigues',     role: 'Pintora',               rating: 4.9, reviews:  84, location: 'Porto Alegre, RS',   city: 'porto alegre',    state: 'rs', tags: ['Residencial', 'Textura', 'Papel-parede'] },
  { photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=faces', name: 'Dra. Paula Lima',    role: 'Fisioterapeuta',        rating: 5.0, reviews: 173, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['CREFITO', 'Ortopedia', 'Domiciliar'] },
  { photo: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=200&h=200&fit=crop&crop=faces', name: 'Marcos Souza',      role: 'Veterinário',           rating: 4.8, reviews: 112, location: 'Salvador, BA',        city: 'salvador',        state: 'ba', tags: ['CRMV', 'Pets', 'Domiciliar'] },
  { photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces', name: 'Lúcia Ferreira',    role: 'Professora Particular', rating: 4.9, reviews: 201, location: 'Fortaleza, CE',      city: 'fortaleza',       state: 'ce', tags: ['Exatas', 'Vestibular', 'Online'] },
  { photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=faces', name: 'Chef Tiago Melo',   role: 'Chef de Cozinha',       rating: 4.7, reviews:  58, location: 'Recife, PE',         city: 'recife',          state: 'pe', tags: ['Eventos', 'Italiana', 'Domiciliar'] },
  { photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop&crop=faces', name: 'Bruna Andrade',     role: 'Cabeleireira',          rating: 4.8, reviews: 147, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['Coloração', 'Corte', 'Tratamentos'] },
  { photo: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&h=200&fit=crop&crop=faces', name: 'Diego Nascimento',  role: 'Marceneiro',            rating: 4.9, reviews:  76, location: 'Campinas, SP',       city: 'campinas',        state: 'sp', tags: ['Móveis planejados', 'Reparos'] },
  { photo: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=200&h=200&fit=crop&crop=faces', name: 'Camila Torres',     role: 'Fotógrafa',             rating: 5.0, reviews: 234, location: 'Rio de Janeiro, RJ', city: 'rio de janeiro',  state: 'rj', tags: ['Casamentos', 'Eventos', 'Book'] },
  // ── Goiás ──────────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=faces', name: 'Dr. Rafael Borges', role: 'Médico Clínico Geral',  rating: 4.9, reviews:  89, location: 'Anápolis, GO',       city: 'anápolis',        state: 'go', tags: ['CRM', 'Domiciliar', 'Telemedicina'] },
  { photo: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&crop=faces', name: 'Thiago Mendonça',   role: 'Eletricista',           rating: 4.8, reviews:  61, location: 'Anápolis, GO',       city: 'anápolis',        state: 'go', tags: ['Residencial', 'Industrial', 'CREA'] },
  { photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&h=200&fit=crop&crop=faces', name: 'Patrícia Vieira',   role: 'Nutricionista',         rating: 5.0, reviews: 143, location: 'Anápolis, GO',       city: 'anápolis',        state: 'go', tags: ['CRN', 'Emagrecimento', 'Online'] },
  { photo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop&crop=faces', name: 'Lucas Oliveira',    role: 'Encanador',             rating: 4.7, reviews:  48, location: 'Goiânia, GO',        city: 'goiânia',         state: 'go', tags: ['Hidráulica', 'Reformas', 'Emergência'] },
  { photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces', name: 'Mariana Castro',    role: 'Psicóloga',             rating: 5.0, reviews: 197, location: 'Goiânia, GO',        city: 'goiânia',         state: 'go', tags: ['CRP', 'Ansiedade', 'Online'] },
  { photo: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=200&h=200&fit=crop&crop=faces', name: 'Eduardo Faria',     role: 'Pedreiro / Construtor', rating: 4.6, reviews:  53, location: 'Goiânia, GO',        city: 'goiânia',         state: 'go', tags: ['Reformas', 'Alvenaria', 'Pintura'] },
  // ── Jardinagem ─────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop&crop=faces', name: 'André Jardim',      role: 'Jardineiro',            rating: 4.8, reviews:  74, location: 'Brasília, DF',       city: 'brasília',        state: 'df', tags: ['Paisagismo', 'Poda', 'Irrigação'] },
  { photo: 'https://images.unsplash.com/photo-1594751684241-bcef815d4fa2?w=200&h=200&fit=crop&crop=faces', name: 'Silvia Campos',     role: 'Paisagista',            rating: 5.0, reviews: 108, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['Jardins', 'Projeto', 'Hortas'] },
  // ── Limpeza ────────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=faces', name: 'Cleide Moura',       role: 'Diarista / Limpeza',    rating: 4.9, reviews: 182, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['Residencial', 'Pós-obra', 'Semanal'] },
  { photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces', name: 'Rosana Pinto',      role: 'Diarista / Limpeza',    rating: 4.7, reviews:  93, location: 'Goiânia, GO',        city: 'goiânia',         state: 'go', tags: ['Comercial', 'Condomínio', 'Periódica'] },
  // ── Segurança ──────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop&crop=faces', name: 'Marcus Duarte',     role: 'Vigilante / Segurança', rating: 4.7, reviews:  45, location: 'Rio de Janeiro, RJ', city: 'rio de janeiro',  state: 'rj', tags: ['Eventos', 'Patrimonial', 'Armado'] },
  // ── Advocacia ──────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=200&h=200&fit=crop&crop=faces', name: 'Dra. Renata Dias',  role: 'Advogada',              rating: 4.9, reviews: 116, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['OAB', 'Trabalhista', 'Cível'] },
  { photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces', name: 'Dr. Fábio Assis',   role: 'Advogado',              rating: 4.8, reviews:  88, location: 'Brasília, DF',       city: 'brasília',        state: 'df', tags: ['OAB', 'Família', 'Imobiliário'] },
  // ── Contabilidade ──────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=faces', name: 'Amanda Freitas',    role: 'Contadora',             rating: 4.9, reviews: 137, location: 'Curitiba, PR',       city: 'curitiba',        state: 'pr', tags: ['CRC', 'MEI', 'Imposto de Renda'] },
  // ── Design ─────────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces', name: 'Isabela Nobre',     role: 'Designer Gráfico',      rating: 5.0, reviews: 201, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['Branding', 'Social Media', 'UI/UX'] },
  // ── Idiomas ────────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=faces', name: 'Clara Whitman',     role: 'Professora de Inglês',  rating: 4.9, reviews: 165, location: 'Rio de Janeiro, RJ', city: 'rio de janeiro',  state: 'rj', tags: ['Conversação', 'TOEFL', 'Online'] },
  // ── Música ─────────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces', name: 'Rafael Moura',      role: 'Professor de Música',   rating: 4.8, reviews:  79, location: 'Belo Horizonte, MG', city: 'belo horizonte',  state: 'mg', tags: ['Violão', 'Piano', 'Teoria Musical'] },
  // ── Gastronomia ────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces', name: 'Priya Santos',      role: 'Confeiteira',           rating: 5.0, reviews: 143, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['Bolos', 'Doces Finos', 'Encomendas'] },
  // ── Moda ───────────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces', name: 'Tereza Leal',       role: 'Costureira',            rating: 4.8, reviews:  62, location: 'Porto Alegre, RS',   city: 'porto alegre',    state: 'rs', tags: ['Ajustes', 'Roupas sob medida', 'Reformas'] },
  // ── Informática ────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces', name: 'Bruno Techeira',    role: 'Técnico em TI',         rating: 4.9, reviews: 119, location: 'Campinas, SP',       city: 'campinas',        state: 'sp', tags: ['Redes', 'Formatação', 'Suporte Remoto'] },
  // ── Automóveis ─────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=faces', name: 'Sandro Melo',       role: 'Mecânico Automotivo',   rating: 4.7, reviews:  85, location: 'Goiânia, GO',        city: 'goiânia',         state: 'go', tags: ['Revisão', 'Funilaria', 'Elétrica Auto'] },
  // ── Finanças ───────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=faces', name: 'Nelson Queiroz',    role: 'Consultor Financeiro',  rating: 4.9, reviews:  97, location: 'São Paulo, SP',       city: 'são paulo',       state: 'sp', tags: ['Investimentos', 'Planejamento', 'CFP'] },
  // ── Engenharia ─────────────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces', name: 'Eng. Marcos Lima',  role: 'Engenheiro Civil',      rating: 4.9, reviews: 104, location: 'Goiânia, GO',        city: 'goiânia',         state: 'go', tags: ['CREA', 'Laudos', 'Projetos'] },
  // ── Assistência Social ─────────────────────────────────────────────────────
  { photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=faces', name: 'Vanessa Cruz',      role: 'Assistente Social',     rating: 5.0, reviews:  71, location: 'Fortaleza, CE',      city: 'fortaleza',       state: 'ce', tags: ['CRESS', 'Família', 'Vulnerabilidade'] },
];

// ── Mapeamento de cidades → estado (para cidades não cadastradas) ──────────
const cityToState = {
  'anápolis': 'go', 'goiânia': 'go', 'aparecida de goiânia': 'go', 'rio verde': 'go',
  'são paulo': 'sp', 'campinas': 'sp', 'santos': 'sp', 'sorocaba': 'sp', 'ribeirão preto': 'sp',
  'rio de janeiro': 'rj', 'niterói': 'rj', 'duque de caxias': 'rj',
  'belo horizonte': 'mg', 'uberlândia': 'mg', 'contagem': 'mg', 'juiz de fora': 'mg',
  'curitiba': 'pr', 'londrina': 'pr', 'maringá': 'pr',
  'porto alegre': 'rs', 'caxias do sul': 'rs', 'pelotas': 'rs',
  'salvador': 'ba', 'feira de santana': 'ba',
  'fortaleza': 'ce', 'caucaia': 'ce',
  'recife': 'pe', 'caruaru': 'pe',
  'manaus': 'am', 'belém': 'pa', 'florianópolis': 'sc', 'natal': 'rn',
  'maceió': 'al', 'teresina': 'pi', 'campo grande': 'ms', 'cuiabá': 'mt',
  'porto velho': 'ro', 'macapá': 'ap', 'boa vista': 'rr', 'palmas': 'to',
  'brasília': 'df', 'aracaju': 'se', 'joão pessoa': 'pb', 'são luís': 'ma',
  'vitória': 'es', 'macaé': 'rj',
};

// ── Mapeamento de sigla → nome do estado ──────────────────────────────────
const stateNames = {
  go:'Goiás', sp:'São Paulo', rj:'Rio de Janeiro', mg:'Minas Gerais',
  pr:'Paraná', rs:'Rio Grande do Sul', ba:'Bahia', ce:'Ceará',
  pe:'Pernambuco', sc:'Santa Catarina', df:'Distrito Federal',
  es:'Espírito Santo', am:'Amazonas', pa:'Pará', ma:'Maranhão',
  pi:'Piauí', rn:'Rio Grande do Norte', pb:'Paraíba', al:'Alagoas',
  se:'Sergipe', mt:'Mato Grosso', ms:'Mato Grosso do Sul',
  to:'Tocantins', ro:'Rondônia', ac:'Acre', am2:'Amazonas', ap:'Amapá', rr:'Roraima',
};

// ============================================================
// GEOLOCALIZAÇÃO — detecta cidade ao carregar a home
// ============================================================

/** Retorna a cidade guardada na sessão (cadastro ou geo) */
function getUserCity() {
  try {
    const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
    if (user.cidade) return user.cidade.toLowerCase().split(',')[0].trim();
  } catch {}
  try {
    const coords = JSON.parse(sessionStorage.getItem('resolveai_coords') || '{}');
    if (coords.city) return coords.city.toLowerCase().split(',')[0].trim();
  } catch {}
  return null;
}

/** Infere sigla do estado a partir do nome da cidade */
function getStateFromCity(city) {
  if (!city) return null;
  const c = city.toLowerCase().trim();
  if (cityToState[c]) return cityToState[c];
  // tenta encontrar pelo campo state nos próprios profissionais
  const match = professionals.find(p => p.city === c);
  return match ? match.state : null;
}

/**
 * Solicita geolocalização do navegador, faz reverse geocoding e
 * atualiza o carrossel com profissionais da cidade/estado detectado.
 */
function requestGeolocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    async pos => {
      try {
        const { latitude, longitude } = pos.coords;
        const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=pt`);
        const data = await res.json();
        const addr = data.address || {};
        const city = (addr.city || addr.town || addr.village || addr.county || '').toLowerCase();
        const stateCode = (addr.state_code || '').replace('BR-','').toLowerCase();
        if (city) {
          const displayCity = stateCode ? `${capitalize(city)}, ${stateCode.toUpperCase()}` : capitalize(city);
          sessionStorage.setItem('resolveai_coords', JSON.stringify({ lat: latitude, lng: longitude, city: displayCity, state: stateCode }));
          const locInput = document.querySelector('.search-location-wrap input');
          if (locInput && !locInput.value) locInput.value = displayCity;
          rebuildCarouselForCity(city, stateCode);
          updateCarouselTitle(city, stateCode, displayCity);
        }
      } catch { /* falha silenciosa */ }
    },
    () => {},
    { timeout: 8000 }
  );
}

/**
 * Ordena profissionais em 3 níveis de proximidade:
 *   1º — mesma cidade
 *   2º — mesmo estado (mas cidade diferente)
 *   3º — todo o resto
 */
function getSortedProfessionals(userCity, userState) {
  if (!userCity && !userState) return professionals;

  const uc = (userCity  || '').toLowerCase().trim();
  const us = (userState || getStateFromCity(uc) || '').toLowerCase().trim();

  const sameCity  = professionals.filter(p => p.city  === uc);
  const sameState = professionals.filter(p => p.state === us && p.city !== uc);
  const others    = professionals.filter(p => p.state !== us && p.city !== uc);

  return [...sameCity, ...sameState, ...others];
}

/**
 * Atualiza o subtítulo do carrossel indicando com precisão
 * se encontrou profissionais na cidade, no estado ou no geral.
 */
function updateCarouselTitle(userCity, userState, displayCity) {
  const desc = document.querySelector('#profissionais .section-desc');
  if (!desc) return;

  const uc = (userCity  || '').toLowerCase().trim();
  const us = (userState || getStateFromCity(uc) || '').toLowerCase().trim();
  const hasCityMatch  = professionals.some(p => p.city  === uc);
  const hasStateMatch = professionals.some(p => p.state === us);

  if (!uc && !us) {
    desc.textContent = 'Veja quem está disponível agora na sua região';
    return;
  }

  if (hasCityMatch) {
    desc.textContent = `Profissionais disponíveis em ${displayCity || capitalize(uc)}`;
  } else if (hasStateMatch) {
    const stateName = stateNames[us] || us.toUpperCase();
    desc.textContent = `Sem resultados em ${capitalize(uc)} — mostrando profissionais de ${stateName}`;
  } else {
    desc.textContent = `Profissionais disponíveis próximos a você`;
  }
}

/** Reconstrói o carrossel com lista ordenada por proximidade */
function rebuildCarouselForCity(city, state) {
  const sorted = getSortedProfessionals(city, state);
  buildCarousel(sorted);
  startAutoSlide();
}

// ============================================================
// CARROSSEL — usa translateX no wrapper do track
// ============================================================
let currentSlide = 0;
let autoSlideInterval = null;

function getVisibleCount() {
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function buildCarousel(list) {
  list = list || getSortedProfessionals(getUserCity()) || professionals;
  const track = document.getElementById('carouselTrack');
  const dots  = document.getElementById('carouselDots');
  if (!track) return;

  currentSlide = 0;
  track.innerHTML = '';
  track.style.transition = 'none';
  track.style.transform  = 'translateX(0)';

  list.forEach(pro => {
    const card = document.createElement('div');
    card.className = 'pro-card';
    card.style.cursor = 'pointer';
    card.onclick = function(e) { if (!e.target.closest('button')) { const slug = pro.name.toLowerCase().replace(/[^a-z0-9]/g,'-'); window.location.href='prestador-perfil.html?id='+encodeURIComponent(pro.name); } };
    const stars    = '★'.repeat(Math.round(pro.rating)) + '☆'.repeat(5 - Math.round(pro.rating));
    const tagsHTML = pro.tags.map(t => `<span class="pro-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="pro-avatar-img-wrap">
        <img class="pro-avatar-img" src="${pro.photo}" alt="${pro.name}" loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=pro-avatar-fallback>${pro.name[0]}</div>'" />
      </div>
      <div class="pro-name">${pro.name}</div>
      <div class="pro-role">${pro.role}</div>
      <div class="pro-rating">
        <span class="stars">${stars}</span>
        <strong>${pro.rating}</strong>
        <span>(${pro.reviews} avaliações)</span>
      </div>
      <div class="pro-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;display:inline;vertical-align:middle;margin-right:4px;color:#9ca3af"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${pro.location}</div>
      <div class="pro-tags">${tagsHTML}</div>
      <button class="btn-primary" onclick="contactPro('${pro.name}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 9.11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.81 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.92z"/></svg>Entrar em contato
      </button>
    `;
    track.appendChild(card);
  });

  // Dots
  if (dots) {
    const pages = Math.ceil(list.length / getVisibleCount());
    dots.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dots.appendChild(dot);
    }
  }
}

function goToSlide(index) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const visible  = getVisibleCount();
  const totalCards = track.children.length;
  const pages    = Math.ceil(totalCards / visible);
  currentSlide   = ((index % pages) + pages) % pages;

  const CARD_W   = 260;
  const CARD_GAP = 20;
  const offset   = -(currentSlide * visible * (CARD_W + CARD_GAP));

  track.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
  track.style.transform  = `translateX(${offset}px)`;

  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function slideCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const pages = Math.ceil(track.children.length / getVisibleCount());
  goToSlide((currentSlide + direction + pages) % pages);
}

// ============================================================
// AUTO-SLIDE
// ============================================================
function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => slideCarousel(1), 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;
}

// ============================================================
// VERIFICAÇÃO DE ASSINATURA
// ============================================================
function isSubscriber() {
  try {
    const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
    return !!user.subscriber;
  } catch { return false; }
}

function openSubscribeWall() {
  const old = document.getElementById('subscribeWallModal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'subscribeWallModal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9200;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s ease;pointer-events:auto;';
  modal.innerHTML = `
    <div onclick="closeSubscribeWall()" style="position:absolute;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(5px)"></div>
    <div style="position:relative;z-index:1;background:#fff;border-radius:28px;padding:44px 36px 36px;max-width:420px;width:calc(100% - 32px);text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.18);transform:translateY(24px) scale(.97);transition:transform .35s cubic-bezier(.34,1.56,.64,1)" id="subscribeWallBox">
      <button onclick="closeSubscribeWall()" style="position:absolute;top:14px;right:14px;background:#f3f4f6;border:none;width:32px;height:32px;border-radius:50%;font-size:14px;cursor:pointer;color:#4b5563">✕</button>
      <div style="font-size:52px;margin-bottom:12px">🔐</div>
      <h2 style="font-family:'Nunito',sans-serif;font-size:22px;font-weight:900;color:#111827;margin-bottom:10px">Recurso exclusivo para assinantes</h2>
      <p style="font-size:14px;color:#6b7280;line-height:1.6;margin-bottom:24px">Para entrar em contato com os prestadores você precisa de uma assinatura ativa. Escolha o plano ideal e comece agora!</p>
      <div style="display:flex;gap:12px;margin-bottom:20px">
        <div onclick="selectWallPlan(this)" class="wall-plan wall-plan-selected" style="flex:1;border:2px solid #facc15;border-radius:20px;padding:16px 10px;cursor:pointer;background:#fefce8;text-align:center;transition:all .2s">
          <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:14px;color:#1f2937">📺 Básico</div>
          <div style="font-size:19px;font-weight:900;color:#ca8a04;margin:4px 0;font-family:'Nunito',sans-serif">R$ 19,99<span style="font-size:12px;font-weight:600;color:#9ca3af">/mês</span></div>
          <div style="font-size:11px;color:#6b7280;line-height:1.4">Acesso aos prestadores, filtros e negociação direta. Sem taxas no Pix.</div>
        </div>
        <div onclick="selectWallPlan(this)" class="wall-plan" style="flex:1;border:2px solid #e5e7eb;border-radius:20px;padding:16px 10px;cursor:pointer;text-align:center;transition:all .2s">
          <div style="font-family:'Nunito',sans-serif;font-weight:900;font-size:14px;color:#1f2937">🌟 Premium</div>
          <div style="font-size:19px;font-weight:900;color:#ca8a04;margin:4px 0;font-family:'Nunito',sans-serif">R$ 25,99<span style="font-size:12px;font-weight:600;color:#9ca3af">/mês</span></div>
          <div style="font-size:11px;color:#6b7280;line-height:1.4">Tudo do Básico + verificados, isenção de taxas e sem anúncios.</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <button class="btn-primary" style="width:100%;padding:15px;font-size:15px;border-radius:9999px" onclick="subscribeFromWall()">Assinar agora 🚀</button>
        <button class="btn-secondary" style="width:100%;justify-content:center" onclick="closeSubscribeWall();window.location.href='home.html#planos'">Ver todos os planos</button>
      </div>
      <p style="font-size:11px;color:#9ca3af;margin-top:12px">🔒 Cancele quando quiser, sem multas ou burocracia.</p>
    </div>`;
  document.body.appendChild(modal);
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    setTimeout(() => { const box = document.getElementById('subscribeWallBox'); if (box) box.style.transform = 'translateY(0) scale(1)'; }, 10);
  });
}

function selectWallPlan(el) {
  document.querySelectorAll('.wall-plan').forEach(p => {
    p.style.borderColor = '#e5e7eb';
    p.style.background  = '#fff';
  });
  el.style.borderColor = '#facc15';
  el.style.background  = '#fefce8';
}

function subscribeFromWall() {
  try {
    const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
    user.subscriber = true;
    sessionStorage.setItem('resolveai_user', JSON.stringify(user));
  } catch {}
  closeSubscribeWall();
  showToast('Assinatura ativada! Agora você pode contatar prestadores.', 'success');
}

function closeSubscribeWall() {
  const modal = document.getElementById('subscribeWallModal');
  if (!modal) return;
  modal.style.opacity = '0';
  setTimeout(() => modal.remove(), 300);
}

// ============================================================
// MODAL DE CONTATO
// ============================================================
function contactPro(name, isPremium) {
  // Verifica assinatura antes de permitir contato
  if (!isSubscriber()) {
    openSubscribeWall();
    return;
  }

  // Se o prestador tem assinatura Premium, redireciona para o chat
  if (isPremium) {
    window.location.href = 'conversas.html';
    return;
  }

  // Registra estatística de contato
  try {
    const stats = JSON.parse(sessionStorage.getItem('resolveai_stats') || '{"contatos":0,"buscas":[],"cidades":[]}');
    stats.contatos = (stats.contatos || 0) + 1;
    sessionStorage.setItem('resolveai_stats', JSON.stringify(stats));
  } catch {}

  const old = document.getElementById('contactModal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'contactModal';
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeContactModal()"></div>
    <div class="modal-box">
      <button class="modal-close" onclick="closeContactModal()">✕</button>
      <div class="modal-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;color:#374151"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 9.11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.81 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.92z"/></svg></div>
      <h2 class="modal-title">Entrar em contato</h2>
      <p class="modal-desc">Você deseja contatar <strong>${name}</strong>.<br>Como prefere se comunicar?</p>
      <div class="modal-actions">
        <button class="btn-primary" onclick="window.location.href='conversas.html'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Conversar no Chat
        </button>
        <button class="btn-secondary" onclick="showToast('Mensagem enviada para ' + name + '!','success'); closeContactModal()" style="margin-top:8px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>Enviar e-mail
        </button>
      </div>
      <p class="modal-note">Seus dados de contato cadastrados serão compartilhados com o prestador.</p>
    </div>
  `;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('open'));
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  modal.classList.remove('open');
  setTimeout(() => modal.remove(), 300);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeContactModal(); closeSubscribeWall(); } });

// ============================================================
// BUSCA
// ============================================================
function trackSearch(query, city) {
  try {
    const stats = JSON.parse(sessionStorage.getItem('resolveai_stats') || '{"contatos":0,"buscas":[],"cidades":[]}');
    if (query) stats.buscas = [...(stats.buscas || []), query];
    if (city)  stats.cidades = [...(stats.cidades || []), city];
    sessionStorage.setItem('resolveai_stats', JSON.stringify(stats));
  } catch {}
}

function handleSearch() {
  const q    = document.getElementById('heroSearch')?.value.trim();
  const city = document.querySelector('.search-location-wrap input')?.value.trim();
  if (!q) { showToast('Digite o serviço que você procura', ''); return; }
  trackSearch(q, city);
  const params = new URLSearchParams({ q, city: city || '' });
  window.location.href = `resultados.html?${params.toString()}`;
}

function quickSearch(el) {
  const q = el.textContent.replace(/[^\w\sÀ-ÿ]/g, '').trim();
  const city = document.querySelector('.search-location-wrap input')?.value.trim();
  trackSearch(q, city);
  const params = new URLSearchParams({ q, city: city || '' });
  window.location.href = `resultados.html?${params.toString()}`;
}

function handleSpecificSearch() {
  const q    = document.getElementById('specificSearch')?.value.trim();
  const city = document.querySelector('.search-location-wrap input')?.value.trim();
  if (!q) { showToast('Descreva o serviço que você procura', ''); return; }
  trackSearch(q, city);
  const params = new URLSearchParams({ q, city: city || '' });
  window.location.href = `resultados.html?${params.toString()}`;
}

function filterByCategory(cat) {
  const params = new URLSearchParams({ q: cat, city: '' });
  window.location.href = `resultados.html?${params.toString()}`;
}

// ============================================================
// MENU DO USUÁRIO
// ============================================================
function toggleUserMenu() {
  document.getElementById('userMenu')?.classList.toggle('open');
}

document.addEventListener('click', e => {
  const avatar = document.getElementById('userAvatar');
  const menu   = document.getElementById('userMenu');
  if (menu && avatar && !avatar.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
  }
});

function toggleMobileMenu() {
  const links = document.querySelector('.navbar-links');
  if (!links) return;
  const open = links.style.display === 'flex';
  links.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:68px;left:0;right:0;background:white;padding:20px 24px;box-shadow:0 8px 24px rgba(0,0,0,.12);z-index:99;gap:4px;';
}

// ============================================================
// FILTROS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// ============================================================
// ANIMAÇÕES DE ENTRADA
// ============================================================
function initAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.category-card, .step-card').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(el);
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const userCity  = getUserCity();
  const userState = getStateFromCity(userCity);

  // Preenche campo de localização hero com cidade da sessão
  const locInput = document.querySelector('.search-location-wrap input');
  if (locInput && userCity) {
    try {
      const user = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
      locInput.value = user.cidade || capitalize(userCity);
    } catch { locInput.value = capitalize(userCity); }
  }

  // Monta carrossel já ordenado pelos 3 níveis de proximidade
  buildCarousel(getSortedProfessionals(userCity, userState));

  // Atualiza título com precisão (cidade / estado / genérico)
  if (userCity) {
    try {
      const user  = JSON.parse(sessionStorage.getItem('resolveai_user') || '{}');
      const disp  = user.cidade || capitalize(userCity);
      updateCarouselTitle(userCity, userState, disp);
    } catch { updateCarouselTitle(userCity, userState, capitalize(userCity)); }
  }

  initAnimations();
  startAutoSlide();

  // Solicita geolocalização em segundo plano para refinar
  requestGeolocation();

  const track = document.getElementById('carouselTrack');
  if (track) {
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) slideCarousel(diff > 0 ? 1 : -1);
    }, { passive: true });
  }
});

window.addEventListener('resize', () => {
  const uc = getUserCity();
  buildCarousel(getSortedProfessionals(uc, getStateFromCity(uc)));
  startAutoSlide();
});


// ============================================================
// HELPERS
// ============================================================
function capitalize(str) {
  return (str || '').replace(/\b\w/g, c => c.toUpperCase());
}
