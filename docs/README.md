# App de Assistência Técnica Franke

Este projeto é um app VTEX IO para busca de assistências técnicas autorizadas Franke, permitindo ao usuário localizar rapidamente pontos de atendimento por CEP ou por Estado/Cidade e produto.

## Funcionalidades
- Seleção de produto para filtrar assistências técnicas.
- Busca por CEP ou por Estado e Cidade.
- Exibição dos resultados com informações detalhadas (nome, endereço, telefone, e-mail, etc).
- Skeleton de carregamento e mensagens de erro/sem resultado.
- Interface responsiva, acessível e otimizada para performance.

## Tecnologias Utilizadas
- **Frontend:** React + TypeScript
- **Backend:** Node.js (GraphQL resolvers VTEX IO)
- **Integração:** VTEX Masterdata, API de CEP VTEX, IBGE para estados/cidades
- **Estilo:** CSS Handles (VTEX)

## Estrutura do Projeto
- `react/` — Componentes React, lógica de busca e UI
- `node/` — Resolvers GraphQL e integração com Masterdata/CEP
- `graphql/` — Schemas e tipos GraphQL
- `store/` — Configuração de blocos para VTEX IO Store Framework
- `docs/` — Documentação

## Como usar
1. Instale as dependências:
   ```bash
   yarn install && cd react && yarn install
   ```
2. Faça deploy na sua conta VTEX IO.
3. Adicione o bloco `technical-assistance` na loja e configure os produtos disponíveis.

## Customização
- Os produtos exibidos podem ser configurados via Site Editor VTEX.
- O layout pode ser ajustado via CSS Handles.

