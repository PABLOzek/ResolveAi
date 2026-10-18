# Resolve Aí — Manual operacional do projeto (Fase 2)

Projeto Integrador de Engenharia de Software — 6º período

Este README foi preparado a partir da inspeção do código presente neste pacote. Ele documenta o que existe no projeto, como executar a aplicação e como verificar os resultados sem apagar dados por engano.

> **Estado da validação:** os arquivos e configurações foram inspecionados e os scripts JavaScript podem ser verificados localmente. A compilação NestJS, os testes automatizados e o fluxo ponta a ponta ainda precisam ser executados com as dependências instaladas. Consulte a seção **18. Testes e critérios de conclusão**.

## 1. Apresentação do Resolve Aí

O Resolve Aí é uma plataforma para aproximar pessoas que procuram serviços locais de profissionais autônomos ou especializados. O visitante pode consultar profissionais, pesquisar por nome, filtrar por categoria, abrir o perfil público, conhecer serviços e trabalhos anteriores e usar o contato externo informado pelo profissional.

### Incluído nesta versão

- Listagem de profissionais carregados da API.
- Busca por nome e filtro por categoria com base nos serviços associados.
- Perfil público com apresentação, cidade, serviços, trabalhos e fotografias.
- Cadastro e consulta de categorias, usuários, profissionais, serviços e trabalhos pela tela de gestão.
- Armazenamento dos registros em SQLite.
- Armazenamento local de novas fotografias na pasta `uploads`.
- Edição de categorias, atualização de perfil profissional e exclusão de alguns tipos de registro conforme a interface e a API.

### Fora do escopo ou ainda limitado

- Não há autenticação real com senha nem autorização de usuários.
- A tela de gestão e as rotas de escrita não são protegidas por login.
- Não há contratação, pagamento ou chat interno.
- O cadastro comum não substitui um sistema de autenticação: a sessão do navegador guarda apenas o identificador e o nome da conta para permitir que a página de perfil encontre a conta criada naquela sessão.
- O projeto ainda não deve ser publicado como serviço de produção na internet.

## 2. Tecnologias utilizadas

| Parte | Tecnologia | Função |
|---|---|---|
| Frontend | HTML, CSS e JavaScript | Páginas, formulários, busca e renderização dos dados |
| Backend | NestJS e TypeScript | API REST e regras de negócio |
| Persistência | SQLite com `better-sqlite3` | Armazenamento dos registros |
| Mapeamento objeto-relacional | TypeORM | Relaciona entidades TypeScript às tabelas SQLite |
| Servidor estático local | Python 3 `http.server` | Serve os arquivos do frontend durante a demonstração |
| Imagens | Sistema de arquivos | Armazena os arquivos enviados; o banco guarda seus caminhos |

O Python serve apenas os arquivos estáticos do frontend. A lógica da API continua em NestJS/TypeScript e os registros são persistidos no SQLite.

## 3. Requisitos para executar

- Node.js compatível com as dependências. O lockfile exige Node `20.x`, `22.x`, `23.x`, `24.x`, `25.x` ou `26.x` para `better-sqlite3`; o NestJS 11 exige Node 20 ou superior. Use preferencialmente uma versão LTS compatível, como Node 22.
- npm, instalado junto com Node.js.
- Python 3, para a forma de execução do frontend descrita neste manual.
- Navegador atualizado.
- Espaço em disco para dependências, banco e fotografias.

Confira as instalações:

```bash
node -v
npm -v
python --version
```

No Windows, se `python` não funcionar, tente:

```powershell
py --version
```

## 4. Como obter e preparar o projeto

1. Extraia o ZIP em uma pasta local, por exemplo `C:\Projetos\Resolve-Ai`.
2. Abra o Visual Studio Code.
3. Selecione **Arquivo > Abrir Pasta** e escolha a pasta extraída.
4. Localize a pasta `PI-backend-main`. Ela contém `package.json`, `package-lock.json`, `src`, `database` e `frontend`.
5. Abra o terminal integrado do VS Code em **Terminal > Novo Terminal**.
6. Antes de executar comandos do backend, confirme que o terminal está dentro de `PI-backend-main`.

A estrutura principal é:

```text
PI-backend-main/
├── src/
│   ├── usuario/
│   ├── profissional/
│   ├── categoria/
│   ├── servico/
│   ├── trabalho-realizado/
│   ├── common/
│   └── database/
├── database/
│   ├── resolve-ai.sqlite
│   └── resolve-ai.original.sqlite
├── uploads/
│   ├── profissionais/
│   └── trabalhos/
├── frontend/
│   ├── index.html
│   ├── home.html
│   ├── resultados.html
│   ├── prestador-perfil.html
│   ├── register.html
│   ├── profile.html
│   ├── gestao.html
│   ├── JS/
│   └── CSS/
├── test/
├── package.json
├── package-lock.json
├── COMECE-AQUI.txt
└── ROTEIRO-DEMONSTRACAO.md
```

Algumas pastas de `uploads` podem ser criadas somente quando a aplicação recebe a primeira imagem.

## 5. Como instalar as dependências

No terminal, dentro de `PI-backend-main`, execute:

```bash
npm ci
```

`npm ci` instala as versões registradas no `package-lock.json`. A primeira instalação pode demorar, pois o projeto inclui dependências do NestJS, TypeORM e um driver SQLite nativo.

Se a instalação falhar:

1. Leia as primeiras mensagens de erro, não apenas a última linha.
2. Confira `node -v` e `npm -v`.
3. Confirme que o terminal está na pasta que contém `package.json` e `package-lock.json`.
4. Confira a conexão com a internet e tente novamente após resolver a causa.
5. Não apague `package-lock.json` nem o banco como primeira tentativa.

## 6. Como executar o backend

Abra um terminal na pasta `PI-backend-main` e execute:

```bash
npm run start:dev
```

O script real está definido no `package.json` como `nest start --watch`. Mantenha esse terminal aberto enquanto utilizar a aplicação.

Por padrão, o backend informa que a API está disponível em:

```text
http://127.0.0.1:3000
```

A API usa a porta `3000` por padrão e o host `127.0.0.1`. O host restringe a escuta à própria máquina, adequado para uma demonstração local. As variáveis `PORT` e `HOST` podem alterar esses valores.

Se o terminal informar que a porta está ocupada, encerre a aplicação anterior ou configure outra porta e atualize a URL em `frontend/JS/api-config.js`.

## 7. Como executar o frontend

O frontend é estático. Ele precisa de outro terminal, separado do backend.

### Windows

Abra um segundo terminal e execute:

```powershell
cd frontend
py -m http.server 8000
```

Esse `cd frontend` deve ser executado a partir da pasta `PI-backend-main`. Se o comando `py` não existir, use `python -m http.server 8000`.

### Linux/macOS

No segundo terminal:

```bash
cd frontend
python3 -m http.server 8000
```

Mantenha esse terminal aberto.

### Endereços de acesso

| O que abrir | Endereço |
|---|---|
| Página de entrada | `http://localhost:8000/index.html` |
| Página inicial com profissionais | `http://localhost:8000/home.html` |
| Resultados da busca | `http://localhost:8000/resultados.html` |
| Perfil público | `http://localhost:8000/prestador-perfil.html?id=ID_DO_PROFISSIONAL` |
| Cadastro de conta | `http://localhost:8000/register.html` |
| Meu perfil profissional | `http://localhost:8000/profile.html` |
| Gestão de cadastros | `http://localhost:8000/gestao.html` |
| API | `http://127.0.0.1:3000` |

Substitua `ID_DO_PROFISSIONAL` pelo ID real exibido na tela de gestão ou retornado pela API.

A URL-base da API é centralizada em `frontend/JS/api-config.js`:

```javascript
window.RESOLVE_API_BASE = window.RESOLVE_API_BASE || 'http://localhost:3000';
```

Se o backend estiver em outra porta ou máquina, ajuste essa constante. Para uso em outro computador, lembre-se de que `127.0.0.1` representa a própria máquina; a configuração de rede precisa ser feita conscientemente e não se deve expor esta API desprotegida à internet.

## 8. Como verificar se tudo está funcionando

Faça esta conferência em ordem:

- [ ] O terminal do backend informa que a API iniciou sem erro.
- [ ] O terminal do frontend informa que está servindo na porta 8000.
- [ ] `index.html` abre no navegador.
- [ ] `gestao.html` mostra o status de conexão com a API.
- [ ] As categorias e os registros existentes são exibidos na gestão.
- [ ] Uma nova categoria é salva e continua listada depois de atualizar a tela.
- [ ] Um usuário é cadastrado sem duplicar e-mail ou CPF.
- [ ] Um perfil profissional é vinculado ao usuário selecionado.
- [ ] Um serviço pode ser associado a uma categoria e a um profissional existentes.
- [ ] Um trabalho é salvo e suas fotografias aparecem no perfil público.
- [ ] O profissional aparece em `home.html`.
- [ ] A busca por nome e o filtro por categoria retornam o profissional correto.
- [ ] O perfil público mostra apresentação, serviços, trabalhos e contato disponível.
- [ ] Depois de atualizar a página, os dados continuam presentes.
- [ ] Depois de parar e reiniciar o backend, os registros e as fotografias continuam acessíveis.

Se uma etapa falhar, anote o erro exibido no navegador e no terminal do backend. Não apague o banco para tentar corrigir um erro de conexão.

## 9. Como funciona o modelo de dados

Os nomes e os relacionamentos abaixo correspondem às entidades encontradas em `src/`.

| Entidade | Para que serve | Relação principal |
|---|---|---|
| `Usuario` | Dados gerais da conta: nome, e-mail, CPF, telefone e data de nascimento | Pode ter um perfil profissional |
| `Profissional` | Informações públicas e profissionais: cidade, apresentação, foto, telefone e WhatsApp | Relaciona-se opcionalmente a um usuário e possui serviços e trabalhos |
| `Categoria` | Classificação dos serviços, com nome, sigla e descrição | Pode classificar muitos serviços |
| `Servico` | Um tipo de serviço que o profissional oferece | Pertence a uma categoria e a um profissional |
| `TrabalhoRealizado` | Um trabalho anterior que o profissional deseja exibir no portfólio | Pertence a um profissional e pode ter várias imagens |
| `TrabalhoImagem` | Caminho, descrição e ordem de uma imagem do trabalho | Pertence a um trabalho realizado |

### Conta única

O relacionamento `Usuario`–`Profissional` é opcional e de um para um: uma conta pode existir sem perfil profissional e um usuário pode ter no máximo um perfil profissional. O perfil deve ser criado para o usuário já cadastrado, em vez de cadastrar outra conta para a mesma pessoa.

O banco recebido também tem campos legados em `Profissional`. Eles foram mantidos para compatibilidade com registros antigos. Perfis novos usam o usuário associado como fonte principal do nome e do e-mail.

### Serviço oferecido x trabalho realizado

- **Serviço oferecido:** algo que o profissional está disponível para fazer, como “Instalação de chuveiro”.
- **Trabalho realizado:** exemplo de serviço que ele já executou e quer mostrar no portfólio, como “Instalação elétrica em cozinha reformada”, com descrição e fotografias.

## 10. Como alimentar o sistema

Use `gestao.html` para alimentar a base. É a interface mais completa para a demonstração e consulta os dados da API. Cadastre na ordem abaixo, porque cada etapa depende de registros anteriores.

### 10.1 Cadastrar categorias

1. Abra `http://localhost:8000/gestao.html`.
2. Na seção **1. Categorias**, informe nome e sigla.
3. A descrição é opcional.
4. Clique em **Cadastrar categoria**.
5. Confirme que ela aparece na lista.

Nome e sigla são obrigatórios e não podem se repetir. A sigla é normalizada para letras maiúsculas. Uma categoria usada por algum serviço não pode ser excluída.

Exemplo fictício:

| Campo | Valor |
|---|---|
| Nome | Elétrica |
| Sigla | ELE |
| Descrição | Instalações e manutenção elétrica residencial |

### 10.2 Cadastrar usuários

1. Na seção **2. Usuários**, preencha nome, e-mail e CPF.
2. O CPF deve conter 11 números; a API remove pontuação e verifica comprimento e duplicidade, mas não implementa validação dos dígitos verificadores.
3. Telefone e data de nascimento são opcionais.
4. Clique em **Cadastrar usuário**.

O e-mail precisa ter formato válido e não pode estar cadastrado. O CPF também precisa ser único. A resposta pública da API não retorna o CPF. Use somente dados fictícios para a demonstração.

### 10.3 Criar o perfil profissional

1. Na seção **3. Perfil profissional**, selecione um usuário que ainda não tenha perfil.
2. Informe a cidade.
3. Telefone de contato, WhatsApp, apresentação e foto de perfil são opcionais; cidade é obrigatória.
4. Para foto, selecione JPG, PNG ou WEBP com até 3 MB.
5. Clique em **Criar perfil profissional**.

A lista de usuários disponíveis não deve oferecer usuários que já possuam perfil profissional. Se não aparecer nenhum usuário, cadastre uma conta ou confira se todas já estão vinculadas.

### 10.4 Cadastrar serviços

1. Na seção **4. Serviços oferecidos**, informe o nome e a descrição.
2. Selecione uma categoria existente.
3. Selecione um profissional existente.
4. Clique em **Cadastrar serviço**.

Nome, descrição, categoria e profissional são obrigatórios. A API rejeita referências de categoria ou profissional que não existam.

### 10.5 Cadastrar trabalhos e fotografias

1. Na seção **5. Trabalhos realizados e fotografias**, selecione o profissional.
2. Informe título e descrição.
3. A data é opcional.
4. Selecione até cinco fotografias JPG, PNG ou WEBP, com até 3 MB por arquivo.
5. Clique em **Salvar trabalho**.
6. Aguarde a confirmação da interface e confira a lista de trabalhos.

A API valida o formato e a assinatura do arquivo. Novas imagens são gravadas no sistema de arquivos e os caminhos são armazenados no banco. O limite do corpo JSON é 25 MB, portanto evite enviar vários arquivos grandes de uma só vez.

### 10.6 Conferir o resultado público

1. Abra `home.html`.
2. Procure o profissional na listagem.
3. Use a busca por nome e o filtro por categoria em `resultados.html`.
4. Abra o perfil.
5. Confira a apresentação, cidade, serviços, trabalhos e fotografias.
6. Use o botão de WhatsApp se houver um contato configurado. Para dados fictícios, não espere que o contato leve a uma pessoa real.

### 10.7 Editar e excluir

- **Categorias:** a tela de gestão oferece edição e exclusão.
- **Perfil profissional:** `profile.html` permite criar ou atualizar o perfil da conta guardada na sessão atual do navegador. A gestão oferece criação e exclusão de profissionais.
- **Serviços:** a tela de gestão oferece exclusão. A API também oferece atualização por `PATCH /servicos/:id`.
- **Trabalhos:** a tela de gestão oferece exclusão. A API não expõe rota de atualização de trabalho nesta versão.
- **Usuários:** a tela de gestão lista usuários e cadastra novos; não oferece botão para excluí-los.

A exclusão não deve ser feita sem consenso do grupo. Excluir um profissional pode afetar os serviços e trabalhos associados; as regras de cascata do banco removem registros relacionados em alguns relacionamentos. Uma categoria que ainda tenha serviços associados não pode ser excluída.

## 11. Dados fictícios para alimentar o projeto

O arquivo [`DADOS-DEMONSTRACAO.md`](DADOS-DEMONSTRACAO.md) contém um conjunto de exemplo com sete categorias e oito perfis profissionais, incluindo dados de conta fictícios, serviços e um trabalho para cada profissional, além de sugestões de fotografias.

Os dados desse arquivo são para cadastro manual pela tela de gestão. Não são inseridos automaticamente no banco e não devem ser tratados como cadastros já existentes.

Regras para usar os exemplos:

- Cadastre primeiro as categorias.
- Cadastre um usuário para cada profissional.
- Use o ID retornado/listado para associar o perfil profissional ao usuário certo.
- Cadastre os serviços depois de criar o perfil profissional.
- Cadastre o trabalho por último.
- Não reutilize e-mail ou CPF em usuários diferentes.
- Os CPFs de demonstração são sequências fictícias de 11 dígitos, porque a API atual valida comprimento e duplicidade, não os dígitos verificadores.
- Os telefones e WhatsApps de demonstração são marcadores fictícios. Substitua-os por fotografias e contatos apenas se o grupo tiver autorização e necessidade acadêmica; não cadastre dados pessoais reais desnecessários.

## 12. Como cadastrar e preservar fotografias

### Formatos e limites

- Formatos aceitos para novos uploads: JPG/JPEG, PNG e WEBP.
- Limite no backend: 3 MB por imagem.
- Um trabalho aceita no máximo cinco imagens.
- A interface também verifica o tipo e o tamanho antes de enviar; a validação do backend continua sendo a verificação principal.
- O backend confere a assinatura do arquivo e não confia apenas no tipo declarado pelo navegador.
- URLs HTTP/HTTPS existentes são aceitas pelo helper para compatibilidade, mas a forma recomendada para novos cadastros é enviar arquivos pela interface.

### Onde ficam

Por padrão, as fotografias são salvas em:

```text
PI-backend-main/uploads/profissionais/
PI-backend-main/uploads/trabalhos/
```

A API disponibiliza os arquivos pela rota `/uploads/...`. Não renomeie nem mova arquivos individuais sem atualizar os caminhos registrados no banco. Faça backup do banco e da pasta `uploads` em conjunto.

O diretório pode ser alterado com a variável `UPLOADS_DIR`. Se usar um diretório alternativo, mantenha-o junto da cópia de segurança.

## 13. Persistência, banco ativo, backup e restauração

### Qual banco está ativo?

Por padrão, a API usa:

```text
PI-backend-main/database/resolve-ai.sqlite
```

O caminho é definido por `DB_PATH` ou, se a variável não existir, por `database/resolve-ai.sqlite` relativo ao diretório de execução do backend. Por isso, execute os comandos a partir da raiz `PI-backend-main`.

O arquivo `database/resolve-ai.original.sqlite` é uma cópia do banco recebido antes da integração. **Não é o banco ativo padrão.** Preserve-o.

Na cópia do projeto inspecionada para esta documentação, o banco ativo existente continha 11 usuários, 3 profissionais, 3 categorias, 9 serviços e uma tabela legada chamada `funcionarios`. Antes de iniciar a versão integrada, ainda não existiam as tabelas `trabalhos_realizados` e `trabalhos_imagens` nesse arquivo. Como `synchronize: true` está habilitado, a inicialização pode criar/ajustar o esquema. Esses números descrevem a cópia examinada e mudarão quando novos cadastros forem feitos.

### Fazer backup

1. Pare o backend com `Ctrl+C`.
2. Crie uma pasta de backup com data, por exemplo `backups/2026-10-15/`.
3. Copie `database/resolve-ai.sqlite` para essa pasta.
4. Copie a pasta `uploads` inteira para a mesma pasta de backup.
5. Confirme que os arquivos copiados existem e têm tamanho maior que zero.
6. Reinicie o backend.

Não basta copiar apenas o banco: os caminhos das fotografias ficam no banco, mas os bytes das imagens ficam nos arquivos.

### Restaurar

1. Pare o backend.
2. Faça uma cópia da versão atual antes de substituí-la.
3. Restaure o arquivo SQLite para `database/resolve-ai.sqlite`.
4. Restaure a pasta de imagens correspondente para `uploads`.
5. Confira as variáveis `DB_PATH` e `UPLOADS_DIR`.
6. Inicie o backend e confira a gestão, um perfil e uma fotografia.

Se banco e pasta de imagens vierem de backups de datas diferentes, pode haver imagens ausentes ou registros sem imagens correspondentes.

### Os dados são compartilhados automaticamente?

Não. O SQLite é local. Cadastros feitos no computador de uma pessoa não aparecem automaticamente no computador de outra. Para compartilhar uma versão oficial, parem de cadastrar durante a troca, façam backup do banco e de `uploads` juntos, compartilhem o conjunto, e combinem quem está autorizado a substituir a base local. Não substituam o banco de outra pessoa sem comparar datas e preservar o backup anterior.

## 14. Preparar uma base limpa para demonstração sem destruir a base atual

O banco recebido contém registros antigos. A aplicação também mantém `synchronize: true`, que cria/atualiza tabelas automaticamente quando o backend inicia. Por segurança, este pacote não limpa automaticamente os dados nem executa exclusões ao iniciar.

A forma mais segura de começar uma demonstração do zero é usar um **arquivo SQLite separado**, sem apagar `resolve-ai.sqlite`.

### Criar/usar uma base de demonstração separada — Windows PowerShell

No terminal, na raiz `PI-backend-main`:

```powershell
$env:DB_PATH = "database/resolve-ai-demo.sqlite"
$env:UPLOADS_DIR = "uploads-demo"
npm run start:dev
```

O TypeORM criará as tabelas necessárias nesse arquivo quando o backend iniciar. Depois, use outro terminal para iniciar o frontend. As variáveis acima valem apenas para esse terminal; repita-as ao reiniciar o backend se quiser continuar usando essa base.

### Linux/macOS

Na raiz `PI-backend-main`:

```bash
DB_PATH=database/resolve-ai-demo.sqlite UPLOADS_DIR=uploads-demo npm run start:dev
```

Se `resolve-ai-demo.sqlite` já existir, o sistema continuará usando os dados que estiverem nele. Para uma nova demonstração isolada, escolha um novo nome, por exemplo `database/resolve-ai-demo-2026-10-15.sqlite` e `uploads-demo-2026-10-15`, em vez de excluir arquivos sem backup.

### Atenção ao esquema

A configuração atual `synchronize: true` pode alterar tabelas automaticamente. Faça backup antes de iniciar a versão integrada contra qualquer banco que contenha dados importantes. Antes de produção, o projeto deve adotar migrations versionadas e revisar o esquema legado.

## 15. Organização do trabalho entre os quatro integrantes

A alimentação dos dados será feita conjuntamente por dois integrantes, sem divisão fixa por categoria ou profissional. Eles devem combinar entre si a sequência, os exemplos e a conferência dos cadastros.

Procedimento compartilhado recomendado:

1. Consultar este README e o `ROTEIRO-DEMONSTRACAO.md`.
2. Definir em consenso se será usada a base existente ou a base separada de demonstração.
3. Fazer backup antes de trocar ou limpar qualquer base.
4. Cadastrar categorias e depois usuários.
5. Associar cada perfil profissional à conta correta.
6. Criar serviços e trabalhos, verificando as relações.
7. Conferir listagem, busca, filtro, perfil e fotografias no frontend.
8. Atualizar a página e reiniciar o backend para conferir a persistência.
9. Registrar problemas e resolvê-los em conjunto.
10. Antes de compartilhar a base, parar o backend e copiar banco e fotografias juntos.

Os outros integrantes devem seguir as mesmas instruções de execução e usar o checklist de testes. Como o banco é local, combinem uma única versão oficial dos dados e não sobrescrevam alterações recentes sem verificar os backups.

## 16. Roteiro de demonstração acadêmica (10–15 minutos)

1. **Preparação (1 min):** mostrar a estrutura do projeto e explicar que frontend e backend são separados.
2. **Execução (1 min):** iniciar API e servidor estático.
3. **Gestão (2 min):** mostrar categorias, usuários e perfis no banco real.
4. **Serviços (1 min):** explicar a relação entre serviço, categoria e profissional.
5. **Página inicial (1 min):** mostrar profissionais carregados pela API.
6. **Busca e filtro (2 min):** pesquisar um nome e filtrar por categoria.
7. **Perfil público (2 min):** mostrar apresentação, cidade, serviços, portfólio e contato externo.
8. **Fotografias (1 min):** explicar que os arquivos ficam em `uploads` e o banco guarda os caminhos.
9. **Persistência (2 min):** atualizar a página e reiniciar o backend; confirmar que os dados continuam.
10. **Limitações (1 min):** explicar que autenticação e autorização ainda não foram implementadas e que a versão é de demonstração local.

Cada integrante pode explicar uma parte da arquitetura ou do fluxo de acordo com a organização combinada pelo grupo. A alimentação dos dados continua sendo uma atividade conjunta dos dois responsáveis, sem atribuição individual de cadastros.

## 17. Contrato da API

A API não usa um prefixo global `/api`. As rotas começam diretamente com `/usuarios`, `/profissionais` etc.

| Funcionalidade | Endpoint | Método | Campos principais / observações |
|---|---|---|---|
| Listar categorias | `/categorias` | GET | Retorna as categorias |
| Criar categoria | `/categorias` | POST | `nome`, `sigla`, `descricao` |
| Consultar categoria | `/categorias/:id` | GET | ID numérico |
| Atualizar categoria | `/categorias/:id` | PUT | Campos de categoria |
| Excluir categoria | `/categorias/:id` | DELETE | Falha se houver serviços associados |
| Listar usuários | `/usuarios` | GET | A resposta pública omite CPF |
| Criar usuário | `/usuarios` | POST | `nome`, `email`, `cpf`; `telefone` e `data_nascimento` opcionais |
| Consultar usuário | `/usuarios/:id` | GET | Resposta pública omite CPF |
| Atualizar usuário | `/usuarios/:id` | PUT | Campos de usuário; resposta pública omite CPF |
| Excluir usuário | `/usuarios/:id` | DELETE | API disponível; não há botão na gestão |
| Listar/pesquisar profissionais | `/profissionais?nome=...&categoriaId=...` | GET | Filtros podem ser combinados; categoria considera serviços associados |
| Criar perfil profissional | `/profissionais` | POST | `usuarioId`, `cidade`; contato, apresentação e `fotoPerfil` opcionais |
| Consultar perfil público | `/profissionais/:id` | GET | Retorna dados públicos, serviços com categorias e trabalhos com imagens |
| Atualizar perfil | `/profissionais/:id` | PUT | `cidade`, contato, apresentação e foto opcionais |
| Excluir perfil profissional | `/profissionais/:id` | DELETE | Pode afetar serviços e trabalhos associados |
| Listar serviços | `/servicos` | GET | Inclui categoria e profissional |
| Criar serviço | `/servicos` | POST | `nome`, `descricao`, `categoriaId`, `profissionalId` |
| Consultar serviço | `/servicos/:id` | GET | ID numérico |
| Atualizar serviço | `/servicos/:id` | PATCH | Campos que serão alterados |
| Excluir serviço | `/servicos/:id` | DELETE | ID numérico |
| Serviços por profissional | `/servicos/profissional/:profissionalId` | GET | ID do profissional |
| Serviços por categoria | `/servicos/categoria/:categoriaId` | GET | ID da categoria |
| Listar trabalhos | `/trabalhos` | GET | Inclui imagens |
| Criar trabalho | `/trabalhos` | POST | `titulo`, `descricao`, `profissionalId`; `dataRealizacao` e `imagens` opcionais |
| Trabalhos por profissional | `/trabalhos/profissional/:profissionalId` | GET | Inclui imagens |
| Excluir trabalho | `/trabalhos/:id` | DELETE | Não há rota de edição implementada |

Exemplo de criação de serviço (substitua IDs por IDs existentes):

```json
{
  "nome": "Instalação de chuveiro",
  "descricao": "Instalação e verificação da ligação elétrica do chuveiro.",
  "categoriaId": 1,
  "profissionalId": 1
}
```

Exemplo de trabalho com uma fotografia selecionada pela interface:

```json
{
  "titulo": "Instalação de chuveiro",
  "descricao": "Instalação realizada em banheiro residencial.",
  "dataRealizacao": "2026-09-10",
  "profissionalId": 1,
  "imagens": [
    {
      "url": "data:image/jpeg;base64,CONTEUDO_BASE64_DA_IMAGEM",
      "descricao": "Resultado do serviço",
      "ordem": 0
    }
  ]
}
```

O texto `CONTEUDO_BASE64_DA_IMAGEM` é ilustrativo e não é uma imagem válida. Para cadastrar fotos, prefira selecionar os arquivos em `gestao.html`.

## 18. Testes e critérios de conclusão

### Comandos configurados no `package.json`

Execute na raiz do backend:

```bash
npm run build
npm test
npm run test:e2e
npm run lint
```

- `npm run build`: compila o backend.
- `npm test`: executa testes Jest localizados em `src`.
- `npm run test:e2e`: executa a configuração de testes em `test/jest-e2e.json`.
- `npm run lint`: executa ESLint com correção automática nos arquivos indicados; confira o diff antes de aceitar alterações de formatação.

Para conferir sintaxe dos scripts JavaScript:

```bash
node --check frontend/JS/api-v1.js
node --check frontend/JS/admin-v1.js
node --check frontend/JS/register-v1.js
node --check frontend/JS/profile-v1.js
```

### Registro honesto do estado dos testes deste pacote

| Verificação | Procedimento | Resultado obtido nesta preparação | Status |
|---|---|---|---|
| Inspeção do `package.json` | Conferir scripts e dependências | Scripts `build`, `test`, `test:e2e` e `lint` encontrados | Aprovado |
| Inspeção das entidades e rotas | Ler controllers, services e entities | Entidades e rotas documentadas a partir do código | Aprovado |\n| Sintaxe JavaScript | `node --check` em todos os arquivos `frontend/JS/*.js` | 19 arquivos JavaScript verificados sem erro de sintaxe | Aprovado |\n| Referências locais do frontend | Conferir `src` e `href` locais nas páginas HTML | 9 páginas HTML verificadas; nenhuma referência local ausente | Aprovado |
| Banco presente | Abrir `database/resolve-ai.sqlite` em leitura e listar tabelas | Banco existe; contém tabelas legadas e não contém ainda `trabalhos_realizados`/`trabalhos_imagens` antes da inicialização integrada | Aprovado para inspeção; requer migração/sincronização em runtime |
| Compilação NestJS | `npm run build` | Não executada nesta preparação, porque `node_modules` não está instalado no ambiente de trabalho | Não executado |
| Testes Jest | `npm test` | Não executados nesta preparação, porque as dependências não estão instaladas | Não executado |
| Testes E2E | `npm run test:e2e` | Não executados nesta preparação, porque as dependências não estão instaladas | Não executado |
| Fluxo de ponta a ponta | Criar categoria, usuário, perfil, serviço, trabalho e foto; reiniciar backend | Não executado nesta preparação | Não executado |
| Persistência após reinício | Criar dados e reiniciar backend localmente | Não executado nesta preparação | Não executado |

A aplicação só deve ser considerada validada para demonstração depois que os testes marcados como “não executado” forem realizados no computador do grupo. Não marque um teste como aprovado apenas porque a rota existe.

## 19. Solução de problemas comuns

| Problema | Como investigar | Ação recomendada |
|---|---|---|
| `node` ou `npm` não reconhecido | Execute `node -v` e `npm -v` | Instale uma versão compatível de Node.js e reabra o terminal |
| `nest` não encontrado | Confirme que `npm ci` terminou sem erro e que está na raiz do backend | Instale dependências com `npm ci`; não instale ferramentas aleatórias globalmente como primeira tentativa |
| Porta 3000 ocupada | Leia a mensagem do backend | Encerre a instância anterior ou configure `PORT` e atualize `api-config.js` |
| Frontend não acessa a API | Veja o status em `gestao.html`, confira o terminal do backend e `JS/api-config.js` | Confirme que a API está iniciada e que a URL-base está correta |
| Erro de CORS | Confira a origem do frontend e `FRONTEND_ORIGIN` | Para uso local, confira a configuração CORS; não abra a API publicamente sem proteção |
| Categoria não aparece | Atualize a tela de gestão e confira se o cadastro foi confirmado | Verifique a resposta da API e se a categoria foi realmente salva |
| Profissional não aparece | Confira se o perfil foi criado e se possui serviços quando o filtro por categoria está ativo | Pesquise sem filtro e confira o ID do profissional |
| E-mail ou CPF duplicado | Leia a mensagem de erro da gestão | Use outro e-mail e outro CPF fictício; não altere o banco manualmente |
| Serviço não salva | Confirme categoria e profissional existentes | Cadastre primeiro as dependências e use os IDs corretos |
| Fotografia não aparece | Confira o formato, o tamanho e a pasta `uploads` | Use JPG/PNG/WEBP até 3 MB, confirme o caminho e não mova arquivos sem atualizar o banco |
| Dados somem após reiniciar | Confira `DB_PATH`, o diretório atual do terminal e o arquivo SQLite | Inicie a API na raiz `PI-backend-main` e confira se o caminho do banco é o esperado |
| Base de dados antiga interfere | Verifique se está usando `resolve-ai.sqlite` ou a base separada `resolve-ai-demo.sqlite` | Use uma base de demonstração separada em vez de apagar registros sem backup |
| Cadastro falha sem mensagem clara | Observe a resposta da API no navegador e o terminal do backend | Anote o erro HTTP e a mensagem; corrija o dado inválido antes de tentar novamente |

## 20. Segurança e limitações conhecidas

- A aplicação ainda não tem autenticação real nem autorização por usuário.
- A tela `gestao.html` permite operações de escrita sem login. Use apenas em ambiente local controlado.
- Não exponha a API na internet. O host padrão `127.0.0.1` limita a escuta à máquina local, mas alterações de rede devem ser feitas com cautela.
- Não cadastre documentos, telefones ou outros dados pessoais reais sem necessidade e autorização.
- A validação atual do CPF confere 11 dígitos e duplicidade, mas não calcula os dígitos verificadores.
- O banco continua com `synchronize: true` para desenvolvimento e compatibilidade com o esquema legado. Antes de produção, implemente migrations versionadas e faça revisão de esquema.
- O arquivo SQLite e a pasta de imagens precisam ser copiados juntos.
- Registros legados de profissionais podem não ter `usuarioId`. Não associe esses registros a contas por suposição; confirme a correspondência antes de migrar.
- Os dados de demonstração são fictícios e não devem ser usados para representar profissionais reais.
- A compilação e os testes ponta a ponta precisam ser executados no computador do grupo antes de declarar a integração concluída.

## 21. Glossário

| Termo | Significado |
|---|---|
| Frontend | Parte que o usuário vê e utiliza no navegador |
| Backend | Parte que processa regras e atende às requisições do frontend |
| API | Interface pela qual frontend e backend trocam dados |
| Endpoint | Caminho específico da API, como `/categorias` |
| Banco de dados | Estrutura que guarda registros organizados |
| SQLite | Banco de dados armazenado em arquivo |
| Persistência | Manutenção dos dados após atualizar a página ou reiniciar a aplicação |
| Entidade | Classe que representa um tipo de registro no banco |
| Relacionamento | Ligação entre registros, como serviço e categoria |
| CRUD | Criar, consultar, atualizar e excluir registros |
| CORS | Regra do navegador que controla quais origens podem chamar a API |
| Portfólio | Conjunto de trabalhos anteriores que o profissional apresenta |
| Backup | Cópia de segurança dos dados |
| Restauração | Recuperação dos dados a partir de uma cópia |
| Migration | Alteração versionada e controlada do esquema do banco |

## 22. Checklist final do grupo

- [ ] Node.js e npm instalados e compatíveis.
- [ ] Dependências instaladas com `npm ci`.
- [ ] Backup feito antes de usar ou alterar uma base existente.
- [ ] Backend iniciado sem erros.
- [ ] Frontend iniciado em outro terminal.
- [ ] Tela de gestão conectada à API.
- [ ] Categorias cadastradas e conferidas.
- [ ] Usuários fictícios cadastrados sem duplicidade.
- [ ] Perfis profissionais vinculados às contas corretas.
- [ ] Serviços associados a categorias e profissionais existentes.
- [ ] Trabalhos cadastrados com descrições coerentes.
- [ ] Fotografias exibidas e armazenadas em `uploads`.
- [ ] Busca por nome verificada.
- [ ] Filtro por categoria verificado.
- [ ] Perfil público conferido.
- [ ] Persistência verificada após atualizar a página.
- [ ] Persistência verificada após reiniciar o backend.
- [ ] Banco e pasta de imagens incluídos no backup.
- [ ] Limitações de autenticação e segurança compreendidas.
- [ ] Testes automatizados executados ou registrados como não executados.
- [ ] Roteiro de demonstração revisado pelo grupo.
