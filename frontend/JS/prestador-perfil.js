    // ── Base de dados (espelhada de home.js / resultados.js) ──
    const allPros = [
      { photo: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop&crop=faces', name: 'Carlos Silva',      role: 'Eletricista',           rating: 4.9, reviews: 128, hires: 94,  location: 'São Paulo, SP',       tags: ['Residencial','Comercial','CREA'], priceBase: 180,
        bio: 'Eletricista com mais de 12 anos de experiência em instalações residenciais e comerciais. Certificado pelo CREA e especializado em projetos elétricos de alta e baixa tensão. Atendo com agilidade, segurança e transparência. Cada serviço é executado com atenção aos detalhes e rigor técnico.' },
      { photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop&crop=faces', name: 'Roberto Alves',     role: 'Encanador',             rating: 4.8, reviews:  95, hires: 72,  location: 'Rio de Janeiro, RJ', tags: ['Hidráulica','Reformas'], priceBase: 160,
        bio: 'Encanador profissional com 8 anos de atuação em reformas e manutenção hidráulica. Especialista em detecção de vazamentos, substituição de tubulações e instalação de sistemas completos. Trabalho com materiais de qualidade e garanto prazo e limpeza no serviço.' },
      { photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=faces', name: 'Fernanda Costa',    role: 'Personal Trainer',      rating: 5.0, reviews: 210, hires: 180, location: 'Belo Horizonte, MG', tags: ['Musculação','Funcional','CREF'], priceBase: 120,
        bio: 'Personal Trainer registrada no CREF com pós-graduação em Fisiologia do Exercício. Especialista em emagrecimento, hipertrofia e treinamento funcional. Atendo presencialmente e online, com planos completamente personalizados para seu objetivo e estilo de vida.' },
      { photo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop&crop=faces', name: 'João Pereira',      role: 'Pedreiro / Construtor', rating: 4.7, reviews:  67, hires: 51,  location: 'Curitiba, PR',       tags: ['Alvenaria','Reboco','Reformas'], priceBase: 200,
        bio: 'Construtor civil com 15 anos de experiência em alvenaria, reboco, reformas e ampliações. Trabalho com equipe própria, garantindo organização, pontualidade e acabamento impecável. Da fundação ao acabamento, entrego qualidade e confiança em cada etapa da obra.' },
      { photo: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop&crop=faces', name: 'Ana Rodrigues',     role: 'Pintora',               rating: 4.9, reviews:  84, hires: 66,  location: 'Porto Alegre, RS',   tags: ['Residencial','Textura','Papel-parede'], priceBase: 140,
        bio: 'Pintora especializada em pintura residencial, texturas decorativas e aplicação de papel de parede. Com 10 anos de experiência, entrego trabalhos com acabamento sofisticado e duradouro. Utilizo materiais premium e cuido da preparação de cada superfície antes de aplicar qualquer tinta.' },
      { photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces', name: 'Dra. Paula Lima',    role: 'Fisioterapeuta',        rating: 5.0, reviews: 173, hires: 140, location: 'São Paulo, SP',       tags: ['CREFITO','Ortopedia','Domiciliar'], priceBase: 250,
        bio: 'Fisioterapeuta com registro no CREFITO e especialização em fisioterapia ortopédica e neurológica. Atendo em clínica e domicílio, com técnicas modernas de reabilitação e controle da dor. Minha prioridade é sua recuperação com segurança e qualidade de vida.' },
      { photo: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&h=400&fit=crop&crop=faces', name: 'Marcos Souza',      role: 'Veterinário',           rating: 4.8, reviews: 112, hires: 88,  location: 'Salvador, BA',       tags: ['CRMV','Pets','Domiciliar'], priceBase: 200,
        bio: 'Médico-veterinário com CRMV ativo e 9 anos de experiência em clínica de pequenos animais. Ofereço atendimento domiciliar, consultas, vacinas e acompanhamento preventivo. Trato seu pet com o mesmo cuidado e carinho que você oferece em casa.' },
      { photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces', name: 'Lúcia Ferreira',    role: 'Professora Particular', rating: 4.9, reviews: 201, hires: 165, location: 'Fortaleza, CE',      tags: ['Exatas','Vestibular','Online'], priceBase: 90,
        bio: 'Professora de Matemática e Física com 11 anos de experiência em aulas particulares e cursinhos preparatórios. Especialista em ENEM e vestibulares concorridos. Metodologia clara, dinâmica e focada no resultado do aluno. Aulas presenciais e online, com materiais personalizados.' },
      { photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=faces', name: 'Chef Tiago Melo',   role: 'Chef de Cozinha',       rating: 4.7, reviews:  58, hires: 44,  location: 'Recife, PE',         tags: ['Eventos','Italiana','Domiciliar'], priceBase: 350,
        bio: 'Chef profissional com formação na Escola de Gastronomia Senac e 7 anos de experiência em eventos, jantares particulares e gastronomia italiana. Elaboro menus exclusivos para cada ocasião, com ingredientes frescos e técnicas refinadas para surpreender seu paladar.' },
      { photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&crop=faces', name: 'Bruna Andrade',     role: 'Cabeleireira',          rating: 4.8, reviews: 147, hires: 120, location: 'São Paulo, SP',       tags: ['Coloração','Corte','Tratamentos'], priceBase: 110,
        bio: 'Cabeleireira profissional com 8 anos de experiência em cortes modernos, coloração e tratamentos capilares. Trabalho com técnicas atuais como Balayage, Babylights e tratamentos de reconstrução. Atendo em salão e a domicílio, garantindo resultado impecável e durabilidade.' },
      { photo: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop&crop=faces', name: 'Diego Nascimento',  role: 'Marceneiro',            rating: 4.9, reviews:  76, hires: 58,  location: 'Campinas, SP',       tags: ['Móveis planejados','Reparos'], priceBase: 280,
        bio: 'Marceneiro especialista em móveis planejados e reparos de alta precisão. Mais de 14 anos transformando madeira em design funcional e elegante. Trabalho com MDF, madeira maciça e compensado. Cada peça é projetada do zero, de acordo com o espaço e o gosto do cliente.' },
      { photo: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=400&fit=crop&crop=faces', name: 'Camila Torres',     role: 'Fotógrafa',             rating: 5.0, reviews: 234, hires: 198, location: 'Rio de Janeiro, RJ', tags: ['Casamentos','Eventos','Book'], priceBase: 400,
        bio: 'Fotógrafa especializada em casamentos, eventos sociais e books profissionais. Com olhar artístico apurado e equipamento profissional, capturo cada momento com emoção e autenticidade. Edição cuidadosa e entrega rápida. Seu grande dia merece ser lembrado para sempre.' },
      { photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=faces', name: 'Dr. Rafael Borges', role: 'Médico Clínico Geral',  rating: 4.9, reviews:  89, hires: 70,  location: 'Anápolis, GO',       tags: ['CRM','Domiciliar','Telemedicina'], priceBase: 300,
        bio: 'Médico clínico geral registrado no CRM com 10 anos de prática clínica. Ofereço consultas domiciliares, telemedicina e acompanhamento de saúde preventiva. Cuido dos meus pacientes com escuta ativa e diagnóstico criterioso, sempre priorizando qualidade de vida e bem-estar.' },
      { photo: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop&crop=faces', name: 'Thiago Mendonça',   role: 'Eletricista',           rating: 4.8, reviews:  61, hires: 47,  location: 'Anápolis, GO',       tags: ['Residencial','Industrial','CREA'], priceBase: 150,
        bio: 'Eletricista com CREA ativo e especialização em instalações residenciais e industriais. Presto serviços de manutenção elétrica, instalação de painéis e cabeamento estruturado. Trabalho com segurança, dentro das normas técnicas da ABNT e com garantia em todos os serviços.' },
      { photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=faces', name: 'Patrícia Vieira',   role: 'Nutricionista',         rating: 5.0, reviews: 143, hires: 118, location: 'Anápolis, GO',       tags: ['CRN','Emagrecimento','Online'], priceBase: 180,
        bio: 'Nutricionista registrada no CRN com especialização em nutrição clínica e emagrecimento. Elaboro planos alimentares completamente personalizados, baseados em evidências científicas e no estilo de vida de cada paciente. Atendo presencialmente e online.' },
      { photo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop&crop=faces', name: 'Lucas Oliveira',    role: 'Encanador',             rating: 4.7, reviews:  48, hires: 36,  location: 'Goiânia, GO',        tags: ['Hidráulica','Reformas','Emergência'], priceBase: 130,
        bio: 'Encanador com 7 anos de experiência em hidráulica residencial e comercial. Especialista em atendimentos de emergência, vazamentos, entupimentos e instalações. Atendo com rapidez, limpeza e material de qualidade. Disponível nos fins de semana e feriados para urgências.' },
      { photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces', name: 'Mariana Castro',    role: 'Psicóloga',             rating: 5.0, reviews: 197, hires: 160, location: 'Goiânia, GO',        tags: ['CRP','Ansiedade','Online'], priceBase: 220,
        bio: 'Psicóloga clínica com registro no CRP e formação em Terapia Cognitivo-Comportamental. Especialista no tratamento de ansiedade, depressão e questões relacionais. Ofereço sessões presenciais e online, em um ambiente seguro e acolhedor. Sua saúde mental é prioridade.' },
      { photo: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=400&fit=crop&crop=faces', name: 'Eduardo Faria',     role: 'Pedreiro / Construtor', rating: 4.6, reviews:  53, hires: 39,  location: 'Goiânia, GO',        tags: ['Reformas','Alvenaria','Pintura'], priceBase: 170,
        bio: 'Construtor experiente em reformas completas, alvenaria e acabamentos. Atuo em Goiânia e região há 11 anos, com equipe própria, agilidade e preço justo. Meu trabalho vai de pequenos reparos a reformas completas de ambientes residenciais e comerciais.' },
      // ── Jardinagem ───────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=faces', name: 'André Jardim',      role: 'Jardineiro',            rating: 4.8, reviews:  74, hires: 58,  location: 'Brasília, DF',       tags: ['Paisagismo','Poda','Irrigação'], priceBase: 100,
        bio: 'Jardineiro com 9 anos de experiência em manutenção, poda e paisagismo residencial e corporativo. Cuido do seu jardim com atenção e dedicação, garantindo verde saudável durante todo o ano. Trabalho com plantas nativas e exóticas, sistemas de irrigação e decoração verde.' },
      { photo: 'https://images.unsplash.com/photo-1594751684241-bcef815d4fa2?w=400&h=400&fit=crop&crop=faces', name: 'Silvia Campos',     role: 'Paisagista',            rating: 5.0, reviews: 108, hires: 91,  location: 'São Paulo, SP',       tags: ['Jardins','Projeto','Hortas'], priceBase: 200,
        bio: 'Paisagista formada com mais de 12 anos projetando jardins residenciais, corporativos e hortas urbanas. Transformo espaços simples em ambientes verdes e acolhedores. Cada projeto é personalizado do zero, respeitando o clima local, o estilo da casa e a rotina do cliente.' },
      // ── Limpeza ──────────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=faces', name: 'Cleide Moura',       role: 'Diarista / Limpeza',    rating: 4.9, reviews: 182, hires: 155, location: 'São Paulo, SP',       tags: ['Residencial','Pós-obra','Semanal'], priceBase: 150,
        bio: 'Diarista profissional com 10 anos de experiência em limpeza residencial, pós-obra e periódica. Organizada, pontual e discreta, cuido do seu espaço como se fosse o meu. Utilizo produtos de qualidade e técnicas eficientes para um resultado impecável em cada visita.' },
      { photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces', name: 'Rosana Pinto',      role: 'Diarista / Limpeza',    rating: 4.7, reviews:  93, hires: 76,  location: 'Goiânia, GO',        tags: ['Comercial','Condomínio','Periódica'], priceBase: 120,
        bio: 'Especialista em limpeza comercial e de condomínios com 7 anos de atuação. Ofereço contratos periódicos, limpeza pós-evento e manutenção regular. Meu trabalho é pautado na organização, eficiência e no uso correto de produtos para cada tipo de superfície.' },
      // ── Segurança ────────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&crop=faces', name: 'Marcus Duarte',     role: 'Vigilante / Segurança', rating: 4.7, reviews:  45, hires: 33,  location: 'Rio de Janeiro, RJ', tags: ['Eventos','Patrimonial','Armado'], priceBase: 180,
        bio: 'Vigilante certificado com curso de formação e reciclagem anuais. Atuei em segurança patrimonial, eventos e escolta. Profissional discreto, atento e comprometido com a proteção de pessoas e bens. Disponível para escalas diurnas, noturnas e fins de semana.' },
      // ── Advocacia ────────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop&crop=faces', name: 'Dra. Renata Dias',  role: 'Advogada',              rating: 4.9, reviews: 116, hires: 93,  location: 'São Paulo, SP',       tags: ['OAB','Trabalhista','Cível'], priceBase: 350,
        bio: 'Advogada inscrita na OAB com especialização em Direito Trabalhista e Cível. Mais de 12 anos de atuação em defesa de clientes em rescisões, ações indenizatórias e contratos. Atendimento humanizado, claro e estratégico. Sua causa merece dedicação total.' },
      { photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces', name: 'Dr. Fábio Assis',   role: 'Advogado',              rating: 4.8, reviews:  88, hires: 70,  location: 'Brasília, DF',       tags: ['OAB','Família','Imobiliário'], priceBase: 320,
        bio: 'Advogado com registro ativo na OAB-DF, especializado em Direito de Família e Imobiliário. Atuo em divórcios, inventários, compra e venda de imóveis e locação. Busco sempre a solução mais eficiente para meu cliente, com clareza, ética e comprometimento.' },
      // ── Contabilidade ────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=faces', name: 'Amanda Freitas',    role: 'Contadora',             rating: 4.9, reviews: 137, hires: 112, location: 'Curitiba, PR',       tags: ['CRC','MEI','Imposto de Renda'], priceBase: 220,
        bio: 'Contadora registrada no CRC com 8 anos de experiência em contabilidade para MEIs, pequenas empresas e declaração de imposto de renda de pessoa física. Organizo, regularizo e otimizo a vida fiscal dos meus clientes com agilidade e total conformidade legal.' },
      // ── Design ───────────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces', name: 'Isabela Nobre',     role: 'Designer Gráfico',      rating: 5.0, reviews: 201, hires: 175, location: 'São Paulo, SP',       tags: ['Branding','Social Media','UI/UX'], priceBase: 180,
        bio: 'Designer gráfica com 10 anos de experiência em branding, identidade visual, social media e UI/UX. Desenvolvo projetos que comunicam a essência do seu negócio com criatividade e estratégia. Cada entrega é pensada para impactar e converter, do logo ao produto digital.' },
      // ── Idiomas ──────────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=faces', name: 'Clara Whitman',     role: 'Professora de Inglês',  rating: 4.9, reviews: 165, hires: 138, location: 'Rio de Janeiro, RJ', tags: ['Conversação','TOEFL','Online'], priceBase: 95,
        bio: 'Professora de inglês fluente com vivência de 3 anos nos EUA. Especialista em conversação, preparação para TOEFL e inglês para negócios. Aulas dinâmicas, personalizadas e focadas na evolução real do aluno. Atendo online com horários flexíveis para se adaptar à sua rotina.' },
      // ── Música ───────────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces', name: 'Rafael Moura',      role: 'Professor de Música',   rating: 4.8, reviews:  79, hires: 60,  location: 'Belo Horizonte, MG', tags: ['Violão','Piano','Teoria Musical'], priceBase: 85,
        bio: 'Músico e professor com formação em Música pela UFMG e 8 anos ensinando violão, piano e teoria musical para todas as idades. Metodologia progressiva e motivadora, com repertório adaptado ao gosto do aluno. Aulas presenciais em BH e online para todo o Brasil.' },
      // ── Gastronomia ──────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=faces', name: 'Priya Santos',      role: 'Confeiteira',           rating: 5.0, reviews: 143, hires: 122, location: 'São Paulo, SP',       tags: ['Bolos','Doces Finos','Encomendas'], priceBase: 250,
        bio: 'Confeiteira profissional com formação na Escola de Gastronomia Le Cordon Bleu. Especialista em bolos decorados, doces finos e sobremesas para eventos. Cada encomenda é preparada com ingredientes selecionados e apresentação impecável. Seu evento merece um toque de sabor e elegância.' },
      // ── Moda ─────────────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces', name: 'Tereza Leal',       role: 'Costureira',            rating: 4.8, reviews:  62, hires: 48,  location: 'Porto Alegre, RS',   tags: ['Ajustes','Roupas sob medida','Reformas'], priceBase: 80,
        bio: 'Costureira com 15 anos de experiência em ajustes, confecção sob medida e reforma de peças. Especialista em roupas femininas, vestidos de festa e trajes masculinos. Trabalho com atenção aos detalhes, caimento perfeito e prazo cumprido. Seu look vai ficar exatamente como você imaginou.' },
      // ── Informática ──────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces', name: 'Bruno Techeira',    role: 'Técnico em TI',         rating: 4.9, reviews: 119, hires: 99,  location: 'Campinas, SP',       tags: ['Redes','Formatação','Suporte Remoto'], priceBase: 130,
        bio: 'Técnico em TI com certificações CompTIA e Microsoft. Presto suporte presencial e remoto para residências e empresas: formatação, configuração de redes, instalação de sistemas e recuperação de dados. Atendimento rápido, linguagem clara e preço justo.' },
      // ── Automóveis ───────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces', name: 'Sandro Melo',       role: 'Mecânico Automotivo',   rating: 4.7, reviews:  85, hires: 66,  location: 'Goiânia, GO',        tags: ['Revisão','Funilaria','Elétrica Auto'], priceBase: 200,
        bio: 'Mecânico automotivo com 13 anos de experiência em revisões preventivas, funilaria, elétrica veicular e diagnóstico computadorizado. Trabalho com todas as marcas e ofereço orçamento transparente sem surpresas. Seu carro em boas mãos, com segurança e honestidade.' },
      // ── Finanças ─────────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop&crop=faces', name: 'Nelson Queiroz',    role: 'Consultor Financeiro',  rating: 4.9, reviews:  97, hires: 79,  location: 'São Paulo, SP',       tags: ['Investimentos','Planejamento','CFP'], priceBase: 300,
        bio: 'Consultor financeiro certificado CFP® com 11 anos de atuação em planejamento financeiro pessoal e de empresas. Ajudo meus clientes a organizar finanças, montar reservas e investir com inteligência. Atendimento personalizado, sem jargões e focado nos seus objetivos de vida.' },
      // ── Engenharia ───────────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces', name: 'Eng. Marcos Lima',  role: 'Engenheiro Civil',      rating: 4.9, reviews: 104, hires: 87,  location: 'Goiânia, GO',        tags: ['CREA','Laudos','Projetos'], priceBase: 400,
        bio: 'Engenheiro Civil com CREA ativo e 14 anos de experiência em projetos estruturais, laudos técnicos e gerenciamento de obras. Atendo desde reformas residenciais até grandes empreendimentos comerciais. Comprometido com a segurança, a norma técnica e a satisfação do cliente em cada entrega.' },
      // ── Assistência Social ────────────────────────────────────────────────────
      { photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=faces', name: 'Vanessa Cruz',      role: 'Assistente Social',     rating: 5.0, reviews:  71, hires: 58,  location: 'Fortaleza, CE',      tags: ['CRESS','Família','Vulnerabilidade'], priceBase: 160,
        bio: 'Assistente Social com registro no CRESS e especialização em políticas públicas e proteção à família. Atendo casos de vulnerabilidade social, orientação familiar e acompanhamento de crianças e adolescentes. Trabalho com escuta ativa, ética e comprometimento com a transformação social.' },
    ];

    const servicePhotos = {
      'Eletricista':           ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&fit=crop','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop','https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&fit=crop'],
      'Encanador':             ['https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&fit=crop','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop','https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&fit=crop'],
      'Personal Trainer':      ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&fit=crop','https://images.unsplash.com/photo-1538805060514-97d9cc172144?w=400&fit=crop','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&fit=crop'],
      'Pedreiro / Construtor': ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&fit=crop','https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&fit=crop','https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&fit=crop'],
      'Pintora':               ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&fit=crop','https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&fit=crop','https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&fit=crop'],
      'Pintor':                ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&fit=crop','https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&fit=crop','https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&fit=crop'],
      'Fisioterapeuta':        ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&fit=crop','https://images.unsplash.com/photo-1591084728795-1149f32d9866?w=400&fit=crop','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&fit=crop'],
      'Veterinário':           ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&fit=crop','https://images.unsplash.com/photo-1534361960057-19f4434a5d18?w=400&fit=crop','https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&fit=crop'],
      'Professora Particular': ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&fit=crop','https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&fit=crop','https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&fit=crop'],
      'Chef de Cozinha':       ['https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&fit=crop','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&fit=crop','https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&fit=crop'],
      'Cabeleireira':          ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&fit=crop','https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&fit=crop','https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&fit=crop'],
      'Marceneiro':            ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&fit=crop','https://images.unsplash.com/photo-1556909114-7934bb5e29ad?w=400&fit=crop','https://images.unsplash.com/photo-1493441883193-a1b5e0f7ce8d?w=400&fit=crop'],
      'Fotógrafa':             ['https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&fit=crop','https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&fit=crop','https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&fit=crop'],
      'Médico Clínico Geral':  ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&fit=crop','https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&fit=crop','https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&fit=crop'],
      'Nutricionista':         ['https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&fit=crop','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&fit=crop','https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&fit=crop'],
      'Psicóloga':             ['https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&fit=crop','https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&fit=crop','https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&fit=crop'],
      'Jardineiro':            ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&fit=crop','https://images.unsplash.com/photo-1558618048-fbd3f3b64c8d?w=400&fit=crop','https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?w=400&fit=crop'],
      'Paisagista':            ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&fit=crop','https://images.unsplash.com/photo-1558618048-fbd3f3b64c8d?w=400&fit=crop','https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400&fit=crop'],
      'Diarista / Limpeza':    ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&fit=crop','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop','https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&fit=crop'],
      'Vigilante / Segurança': ['https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&fit=crop','https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=400&fit=crop','https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?w=400&fit=crop'],
      'Advogada':              ['https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=400&fit=crop','https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&fit=crop','https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&fit=crop'],
      'Advogado':              ['https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=400&fit=crop','https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&fit=crop','https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&fit=crop'],
      'Contadora':             ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&fit=crop','https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&fit=crop','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop'],
      'Designer Gráfico':      ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&fit=crop','https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&fit=crop','https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&fit=crop'],
      'Professora de Inglês':  ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&fit=crop','https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&fit=crop','https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&fit=crop'],
      'Professor de Música':   ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&fit=crop','https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&fit=crop','https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&fit=crop'],
      'Confeiteira':           ['https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&fit=crop','https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&fit=crop','https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&fit=crop'],
      'Costureira':            ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop','https://images.unsplash.com/photo-1537832816519-689ad163238b?w=400&fit=crop','https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&fit=crop'],
      'Técnico em TI':         ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&fit=crop','https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&fit=crop','https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&fit=crop'],
      'Mecânico Automotivo':   ['https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&fit=crop','https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&fit=crop','https://images.unsplash.com/photo-1632823471565-1ecdf5c6da3e?w=400&fit=crop'],
      'Consultor Financeiro':  ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&fit=crop','https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&fit=crop','https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&fit=crop'],
      'Engenheiro Civil':      ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&fit=crop','https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&fit=crop','https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&fit=crop'],
      'Assistente Social':     ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&fit=crop','https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&fit=crop','https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&fit=crop'],
    };

    const sampleReviews = [
      { name:'Maria Souza',   initial:'M', stars:5, date:'há 2 semanas',  text:'Profissional excepcional! Atendeu com pontualidade, resolveu tudo com perfeição e ainda tirou minhas dúvidas. Recomendo muito!' },
      { name:'Pedro Lima',    initial:'P', stars:5, date:'há 1 mês',      text:'Ótimo serviço, preço justo e atendimento de qualidade. Com certeza vou contratar novamente.' },
      { name:'Julia Rocha',   initial:'J', stars:4, date:'há 1 mês',      text:'Muito bom! Ficou acima das minhas expectativas. Apenas demorou um pouco mais do que o previsto, mas o resultado final compensou.' },
      { name:'Carlos Mendes', initial:'C', stars:5, date:'há 2 meses',    text:'Super indico! Profissional muito competente e cuidadoso. Explicou tudo o que fez e deixou o espaço limpo após o serviço.' },
    ];

    const days = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
    const defaultAvailability = [true,true,true,true,true,false,false];

    function isSubscriber() {
      try { return !!JSON.parse(sessionStorage.getItem('resolveai_user')||'{}').subscriber; } catch { return false; }
    }

    function showToast(msg, type='') {
      const existing = document.querySelector('.toast');
      if (existing) existing.remove();
      const t = document.createElement('div');
      t.className = `toast ${type}`; t.textContent = msg;
      document.body.appendChild(t);
      requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
      setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),400);},3500);
    }

    function sendMessage() {
      const name = document.getElementById('ppName').textContent;
      showToast(`Mensagem enviada para ${name}! ✉️`, 'success');
      closeContactModal();
    }

    function closeContactModal() {
      const m = document.getElementById('contactProModal');
      m.querySelector('.modal-box').style.opacity='0';
      m.querySelector('.modal-box').style.transform='translate(-50%,-50%) scale(.96)';
      setTimeout(()=>{ m.style.display='none'; },300);
    }

    function openContactModal() {
      const name = document.getElementById('ppName').textContent;
      document.getElementById('modalDesc').innerHTML = `Envie uma mensagem direta para <strong>${name}</strong>. Ele responde geralmente em menos de 1h.`;
      const m = document.getElementById('contactProModal');
      m.style.display='block';
      requestAnimationFrame(()=>{
        m.querySelector('.modal-box').style.opacity='1';
        m.querySelector('.modal-box').style.transform='translate(-50%,-50%) scale(1)';
      });
    }

    function renderContactBtn(subscriber) {
      const wrap = document.getElementById('ppContactBtnWrap');
      if (subscriber) {
        wrap.innerHTML = `<button class="btn-contact-pro" onclick="openContactModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Entrar em contato
        </button>`;
      } else {
        wrap.innerHTML = `
          <div class="pp-unlock-wrap">
            <button class="btn-contact-locked-pp" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Entrar em contato
            </button>
            <div class="pp-unlock-overlay" onclick="window.location.href='home.html#planos'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:22px;height:22px;color:var(--gray-600)"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
          <p class="pp-subscribe-hint">Assine nossos planos para entrar em contato!</p>`;
      }
    }

    function loadPro() {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('id') || '';
      const pro = allPros.find(p => p.name === nameParam) || allPros[0];

      document.title = `Resolve Aí – ${pro.name}`;

      // Avatar
      const img = document.getElementById('ppAvatarImg');
      const fb  = document.getElementById('ppAvatarFallback');
      img.src = pro.photo;
      img.onload = ()=>{ img.style.display='block'; fb.style.display='none'; };
      img.onerror= ()=>{ img.style.display='none'; fb.style.display='flex'; fb.textContent=pro.name[0]; };

      // Name / role
      document.getElementById('ppName').textContent = pro.name;
      document.getElementById('ppRole').textContent = pro.role;

      // Badges
      const stars = Math.round(pro.rating);
      document.getElementById('ppBadges').innerHTML = `
        <span class="pp-badge pp-badge-verified">✓ Verificado</span>
        <span class="pp-badge pp-badge-rating">⭐ ${pro.rating} (${pro.reviews} avaliações)</span>
        <span class="pp-badge pp-badge-hires">🔥 ${pro.hires} contratações</span>`;

      // Stats
      document.getElementById('ppRating').textContent  = pro.rating + ' ⭐';
      document.getElementById('ppReviews').textContent  = pro.reviews;
      document.getElementById('ppHires').textContent    = pro.hires;

      // Bio
      document.getElementById('ppBio').textContent = pro.bio || 'Profissional experiente e comprometido com a qualidade do serviço prestado.';

      // Preço
      document.getElementById('ppPrice').textContent = `R$ ${pro.priceBase}`;

      // Localização
      document.getElementById('ppLocation').innerHTML = `<strong>${pro.location}</strong>`;

      // Photos
      const photos = servicePhotos[pro.role] || [];
      const photosHtml = photos.slice(0,6).map(url =>
        `<div class="pp-photo"><img src="${url}" alt="Serviço" loading="lazy" onerror="this.parentElement.innerHTML='<div class=pp-photo-placeholder>📷<small>Foto</small></div>'"/></div>`
      ).join('');
      document.getElementById('ppPhotos').innerHTML = photosHtml ||
        '<div style="color:var(--gray-400);font-size:13px;grid-column:1/-1">Nenhuma foto cadastrada ainda.</div>';

      // Avaliações
      document.getElementById('ppReviewsList').innerHTML = sampleReviews.map(r => `
        <div class="pp-review">
          <div class="pp-review-header">
            <div class="pp-reviewer-avatar">${r.initial}</div>
            <div>
              <div class="pp-reviewer-name">${r.name}</div>
              <div class="pp-review-date">${r.date}</div>
            </div>
            <div class="pp-review-stars" style="margin-left:auto">${'★'.repeat(r.stars)}</div>
          </div>
          <p class="pp-review-text">${r.text}</p>
        </div>`).join('');

      // Disponibilidade
      const avail = pro.availability || defaultAvailability;
      document.getElementById('ppAvailability').innerHTML = days.map((d,i) =>
        `<span class="pp-day ${avail[i] ? 'pp-day-on' : 'pp-day-off'}">${d}</span>`
      ).join('');

      // Contact button
      renderContactBtn(isSubscriber());
    }

    document.addEventListener('DOMContentLoaded', loadPro);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeContactModal(); });
