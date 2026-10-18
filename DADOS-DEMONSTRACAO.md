# Dados fictícios para demonstração — Resolve Aí

Este arquivo contém exemplos para alimentar manualmente a aplicação pela tela `frontend/gestao.html`. **Os registros não são inseridos automaticamente no banco.** Todos os nomes e dados abaixo são fictícios e destinados somente a testes acadêmicos.

## Ordem de cadastro

1. Cadastre as sete categorias.
2. Cadastre os oito usuários na seção **Usuários**.
3. Para cada usuário, crie um perfil profissional na seção **Perfil profissional**.
4. Cadastre os serviços na seção **Serviços oferecidos**.
5. Cadastre o trabalho de cada profissional na seção **Trabalhos realizados e fotografias**.
6. Confira o resultado em `home.html`, `resultados.html` e no perfil público.

A tela de gestão mostra os IDs reais gerados pelo banco. Use os itens dos seletores; **não suponha que os IDs serão 1, 2, 3...**, porque o banco pode já conter registros anteriores.

> Os CPFs abaixo são sequências fictícias de 11 dígitos. O backend atual verifica comprimento e duplicidade, mas não valida os dígitos verificadores. Não use esses valores como documentos reais. Os telefones são marcadores fictícios e não devem ser usados para contato real.

## 1. Categorias

Cadastre estas sete categorias. Se uma categoria com o mesmo nome ou sigla já existir, não a duplique; confira a lista e reutilize a existente.

| Nome | Sigla | Descrição |
|---|---|---|
| Elétrica | ELE | Instalações, reparos e manutenção elétrica residencial |
| Hidráulica | HID | Instalações e manutenção de torneiras, chuveiros e tubulações |
| Limpeza | LIM | Limpeza residencial e organização de ambientes |
| Pintura | PIN | Pintura de paredes e pequenos reparos de acabamento |
| Informática | INF | Diagnóstico, manutenção e configuração de computadores |
| Jardinagem | JAR | Cuidados com jardins, poda e manutenção de áreas verdes |
| Montagem e reparos | MON | Montagem de móveis e pequenos ajustes residenciais |

## 2. Usuários e perfis profissionais

Para cada linha, crie primeiro o usuário e depois o perfil profissional associado a ele. A cidade é obrigatória no perfil. Apresentação, telefone, WhatsApp e foto de perfil podem ser preenchidos conforme os exemplos.

| # | Nome | E-mail fictício | CPF de teste (11 dígitos) | Telefone fictício | Cidade | Apresentação profissional |
|---:|---|---|---|---|---|---|
| 1 | Carlos Mendes | carlos.mendes@example.test | 00000000001 | 00000000001 | Ceres, GO | Profissional fictício de elétrica residencial, com foco em instalações e manutenção preventiva. |
| 2 | Ana Paula Ribeiro | ana.ribeiro@example.test | 00000000002 | 00000000002 | Ceres, GO | Profissional fictícia de limpeza residencial, organização e preparação de ambientes. |
| 3 | Marcos Vinícius Lima | marcos.lima@example.test | 00000000003 | 00000000003 | Rialma, GO | Profissional fictício de hidráulica residencial, com atuação em pequenos reparos e instalações. |
| 4 | Juliana Alves Costa | juliana.costa@example.test | 00000000004 | 00000000004 | Ceres, GO | Profissional fictícia de pintura e acabamento de ambientes internos. |
| 5 | Rafael Souza Martins | rafael.martins@example.test | 00000000005 | 00000000005 | Goianésia, GO | Profissional fictício de informática, diagnóstico de computadores e configuração de sistemas. |
| 6 | Fernanda Oliveira Santos | fernanda.santos@example.test | 00000000006 | 00000000006 | Uruana, GO | Profissional fictícia de jardinagem e manutenção de pequenos jardins residenciais. |
| 7 | Pedro Henrique Rocha | pedro.rocha@example.test | 00000000007 | 00000000007 | Rialma, GO | Profissional fictício de pequenos reparos e montagem de itens residenciais. |
| 8 | Camila Ferreira Nunes | camila.nunes@example.test | 00000000008 | 00000000008 | Ceres, GO | Profissional fictícia de manutenção residencial, com serviços básicos de instalação e reparo. |

### Fotos de perfil

As fotos são opcionais. Para a demonstração, use imagens que o grupo tenha autorização para utilizar ou imagens de demonstração criadas para o projeto. Não use fotografias pessoais de terceiros sem autorização. Formatos aceitos: JPG/JPEG, PNG e WEBP; até 3 MB por arquivo.

O WhatsApp dos exemplos não é um contato real. Se o grupo preencher o campo, o botão externo poderá abrir um link, mas o número fictício não deve ser tratado como canal de contato válido.

## 3. Serviços oferecidos

Cadastre os serviços somente depois de criar o perfil profissional correspondente. Em cada linha, selecione a categoria e o profissional pelo nome nos campos da tela de gestão.

| Profissional | Serviço | Categoria | Descrição |
|---|---|---|---|
| Carlos Mendes | Instalação de chuveiro | Elétrica | Instalação e conferência da ligação elétrica de chuveiro residencial. |
| Carlos Mendes | Troca de tomadas e interruptores | Elétrica | Substituição de tomadas e interruptores com verificação de funcionamento. |
| Carlos Mendes | Revisão de pontos de iluminação | Elétrica | Verificação e substituição de componentes simples de iluminação residencial. |
| Ana Paula Ribeiro | Limpeza residencial completa | Limpeza | Limpeza geral de cômodos, superfícies e áreas de uso comum. |
| Ana Paula Ribeiro | Limpeza de cozinha | Limpeza | Limpeza de bancadas, armários externos, pia e superfícies da cozinha. |
| Ana Paula Ribeiro | Organização de ambientes | Limpeza | Organização básica de objetos e preparação de cômodos. |
| Marcos Vinícius Lima | Troca de torneira | Hidráulica | Retirada de torneira antiga e instalação de uma nova peça compatível. |
| Marcos Vinícius Lima | Reparo de vazamento simples | Hidráulica | Inspeção e reparo de vazamentos acessíveis em conexões residenciais. |
| Marcos Vinícius Lima | Instalação de sifão | Hidráulica | Instalação ou substituição de sifão de pia e verificação de vedação. |
| Juliana Alves Costa | Pintura de quarto | Pintura | Preparação básica e pintura de paredes de quarto residencial. |
| Juliana Alves Costa | Pintura de parede de destaque | Pintura | Pintura de uma parede interna com cor escolhida pelo cliente. |
| Juliana Alves Costa | Retoques de acabamento | Pintura | Retoques localizados e correções simples de acabamento. |
| Rafael Souza Martins | Diagnóstico de computador lento | Informática | Verificação de causas comuns de lentidão em computador. |
| Rafael Souza Martins | Instalação de programas | Informática | Instalação e configuração de programas compatíveis com o equipamento. |
| Rafael Souza Martins | Limpeza lógica e organização | Informática | Organização de arquivos e verificação de programas desnecessários. |
| Fernanda Oliveira Santos | Manutenção de jardim | Jardinagem | Limpeza e manutenção de canteiros e pequenos jardins residenciais. |
| Fernanda Oliveira Santos | Poda de plantas ornamentais | Jardinagem | Poda básica de plantas ornamentais conforme seu tipo e condição. |
| Fernanda Oliveira Santos | Plantio de mudas | Jardinagem | Preparação de local e plantio de mudas em canteiros ou vasos. |
| Pedro Henrique Rocha | Montagem de prateleira | Montagem e reparos | Montagem e fixação de prateleira em parede adequada, com conferência do nivelamento. |
| Pedro Henrique Rocha | Montagem de móvel simples | Montagem e reparos | Montagem de móvel residencial simples conforme as instruções do fabricante. |
| Pedro Henrique Rocha | Ajustes simples em portas | Montagem e reparos | Ajustes simples em dobradiças e ferragens acessíveis de portas internas. |
| Camila Ferreira Nunes | Instalação de suporte de parede | Montagem e reparos | Instalação de suporte compatível com a parede e o peso do objeto. |
| Camila Ferreira Nunes | Montagem de móvel compacto | Montagem e reparos | Montagem de móvel compacto para uso residencial, seguindo as instruções do fabricante. |

**Nota de coerência:** foi incluída uma sétima categoria, `Montagem e reparos` (sigla `MON`), para classificar corretamente os serviços de Pedro e Camila sem misturá-los com Hidráulica ou Elétrica.

## 4. Trabalhos realizados e fotografias

Cadastre um trabalho por profissional. A data é opcional; use uma data fictícia ou deixe-a em branco. Cada trabalho aceita até cinco imagens, com até 3 MB por arquivo.

| Profissional | Título do trabalho | Descrição | Sugestão de fotografia |
|---|---|---|---|
| Carlos Mendes | Instalação elétrica residencial de demonstração | Exemplo de instalação e organização de um ponto de iluminação em ambiente residencial fictício. | Foto demonstrativa de um interruptor e ponto de luz instalados, sem pessoas ou endereço identificável. |
| Ana Paula Ribeiro | Limpeza de cozinha de demonstração | Exemplo de limpeza de superfícies e organização de bancada em uma cozinha fictícia. | Foto demonstrativa de bancada limpa e organizada. |
| Marcos Vinícius Lima | Troca de torneira de demonstração | Exemplo de substituição de torneira e conferência de vedação em pia fictícia. | Foto demonstrativa de torneira instalada em uma pia. |
| Juliana Alves Costa | Pintura de quarto de demonstração | Exemplo de pintura de parede interna com acabamento uniforme. | Foto demonstrativa de parede recém-pintada, sem endereço identificável. |
| Rafael Souza Martins | Manutenção de computador de demonstração | Exemplo de computador revisado e organizado para uso doméstico. | Foto demonstrativa de computador e bancada de manutenção, sem dados pessoais na tela. |
| Fernanda Oliveira Santos | Organização de jardim de demonstração | Exemplo de canteiro organizado e plantas ornamentais cuidadas. | Foto demonstrativa de canteiro ou vasos de plantas. |
| Pedro Henrique Rocha | Montagem residencial de demonstração | Exemplo de montagem de prateleira ou móvel simples em ambiente fictício. | Foto demonstrativa de prateleira montada, sem pessoas nem endereço. |
| Camila Ferreira Nunes | Pequeno reparo residencial de demonstração | Exemplo de reparo simples e acabamento em ambiente residencial fictício. | Foto demonstrativa do resultado final do reparo. |

Use imagens autorizadas pelo grupo. A coluna de fotografias contém **sugestões**, não arquivos incluídos neste projeto. O cadastro só exibirá fotografias se os arquivos forem realmente selecionados e enviados pela tela de gestão.

## 5. Como conferir cada cadastro

Depois de cadastrar cada profissional:

1. Confira se o usuário e o perfil aparecem nas listas de gestão.
2. Confirme que os serviços estão associados ao profissional correto e às categorias esperadas.
3. Confira o trabalho na lista de trabalhos.
4. Abra `home.html` e `resultados.html`.
5. Pesquise o nome e filtre pela categoria do serviço.
6. Abra o perfil público e verifique serviços, trabalho e imagens.
7. Atualize a página.
8. Reinicie o backend e confira novamente.

Se um cadastro falhar, leia a mensagem mostrada pela tela e o terminal do backend. Não repita várias vezes sem verificar se o primeiro envio já criou o registro.

## 6. Importante sobre IDs e dados antigos

O banco original pode conter categorias e registros antigos. Os IDs são gerados pelo banco e podem não começar em 1. Sempre selecione os registros pelos campos de seleção da tela de gestão e confira os nomes exibidos.

Se o grupo quiser uma base de demonstração limpa, siga a seção 14 do README principal para criar um arquivo SQLite separado. Não apague o banco original nem substitua uma base compartilhada sem backup.
