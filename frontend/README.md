# Resolve Aí — Frontend integrado

Frontend preservando a base visual original, com páginas conectadas à API.

## Executar

Na pasta `frontend`:

```bash
python -m http.server 8000
```

No Windows, também pode usar `py -m http.server 8000`. Abra `http://localhost:8000/index.html`.

## Páginas

- `index.html`: entrada transparente; não simula login.
- `register.html`: cria usuário real e, opcionalmente, perfil profissional.
- `home.html`: profissionais reais vindos da API.
- `resultados.html`: pesquisa por nome e filtro por categoria real.
- `prestador-perfil.html?id=ID`: perfil público, serviços, trabalhos e contato.
- `profile.html`: cria/atualiza perfil profissional da conta criada na sessão.
- `gestao.html`: interface local para categorias, usuários, profissionais, serviços e trabalhos com imagens.

A URL-base da API fica centralizada em `JS/api-config.js`. A tela de gestão é para demonstração local e não possui autenticação. Não a publique na internet.

O arquivo antigo `JS/dados-demo.js` foi mantido para referência, mas não é carregado no fluxo principal integrado.
