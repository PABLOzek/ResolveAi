# Roteiro de demonstração — Resolve Aí (Fase 2)

Duração sugerida: 10–15 minutos.

## Preparação

1. Leia o `README.md` na raiz do projeto.
2. Se já houver cadastros importantes, pare o backend e faça backup de `database/resolve-ai.sqlite` e da pasta `uploads`.
3. Para uma demonstração limpa, prefira criar uma base separada seguindo a seção 14 do README; não apague a base original.
4. No terminal 1, dentro de `PI-backend-main`, execute `npm ci` (na primeira execução) e `npm run start:dev`.
5. No terminal 2, dentro de `PI-backend-main/frontend`, execute `py -m http.server 8000` (Windows) ou `python3 -m http.server 8000` (Linux/macOS).
6. Abra `http://localhost:8000/gestao.html`.
7. Use `DADOS-DEMONSTRACAO.md` para os exemplos fictícios. Os dados são para cadastro manual e não são inseridos automaticamente.

## Demonstração sugerida

1. **Categorias:** cadastre Elétrica (ELE), Hidráulica (HID), Limpeza (LIM), Pintura (PIN), Informática (INF), Jardinagem (JAR) e Montagem e reparos (MON), ou reutilize as categorias que já existirem.
2. **Usuário:** cadastre uma conta de demonstração com nome, e-mail e CPF de teste com 11 dígitos.
3. **Perfil profissional:** selecione o usuário recém-criado e informe cidade, apresentação, contato e, se houver, foto de perfil.
4. **Serviços:** cadastre dois ou três serviços associados a categorias e ao profissional.
5. **Trabalho:** cadastre um trabalho anterior, com título, descrição e até cinco fotografias JPG, PNG ou WEBP, cada uma de até 3 MB.
6. **Página inicial:** abra `http://localhost:8000/home.html` e confira se o profissional aparece.
7. **Busca:** abra `http://localhost:8000/resultados.html`, pesquise pelo nome e filtre por uma das categorias usadas nos serviços.
8. **Perfil público:** abra o perfil a partir do cartão e confira apresentação, serviços, portfólio e contato externo.
9. **Persistência:** atualize a página e depois reinicie o backend. Confirme que os registros e fotografias continuam acessíveis.
10. **Encerramento:** explique a persistência SQLite, a pasta `uploads`, as relações entre entidades e as limitações de autenticação.

## O que explicar ao professor

- O frontend usa HTML, CSS e JavaScript e consulta dados reais pela API.
- O backend usa NestJS, TypeScript, TypeORM e SQLite com `better-sqlite3`.
- `Usuario` representa a conta; `Profissional` complementa a conta com dados profissionais. Uma conta pode existir sem perfil, mas não pode ter dois perfis.
- `Servico` representa algo que o profissional oferece; `TrabalhoRealizado` é um exemplo anterior do seu portfólio.
- A categoria do profissional é derivada dos serviços associados, não apenas de uma categoria estática no perfil.
- Novas fotografias são validadas e armazenadas em arquivos dentro de `uploads`; o banco registra seus caminhos.
- Para backup, é necessário copiar o banco e a pasta de imagens juntos.
- O banco é local e não sincroniza automaticamente entre computadores.
- Autenticação real e autorização ainda não estão implementadas; a versão deve permanecer em ambiente local controlado.
- Não declare build, testes automatizados ou testes ponta a ponta como aprovados sem executá-los e conferir os resultados.

## Checklist rápido

- [ ] Backend iniciou sem erro.
- [ ] Frontend abriu e conectou à API.
- [ ] Categorias e registros aparecem na gestão.
- [ ] Profissional aparece na listagem.
- [ ] Busca por nome e filtro por categoria funcionam.
- [ ] Perfil mostra serviços, trabalhos e fotografias.
- [ ] Dados continuam após atualizar a página.
- [ ] Dados continuam após reiniciar o backend.
- [ ] Backup do banco e das imagens foi feito.
