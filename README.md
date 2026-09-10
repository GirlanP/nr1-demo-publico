# NR1 Demo Público

Demonstração pública e estática de uma interface para gestão de riscos psicossociais no contexto da NR-1.

## Objetivo

Este repositório foi preparado exclusivamente para **portfólio e demonstração visual**. Ele apresenta conceitos de interface como painel multiempresa para consultorias, troca de contexto entre empresas, dashboard com indicadores fictícios, campanhas e formulários.

## Segurança

Esta versão **não é o sistema comercial completo**. Não estão incluídos backend PHP, banco de dados, schema comercial, autenticação real, credenciais, `.env`, tokens, dados pessoais, regras internas de anonimato, geração real de relatórios, regras de negócio proprietárias, planos ou limites comerciais.

Todos os nomes, números, empresas, indicadores e resultados são **fictícios**.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro
- SVG
- Google Fonts (Inter)

Não requer Node.js, PHP, banco de dados ou instalação de dependências.

## Executar localmente

Abra `index.html` em um navegador moderno. Opcionalmente, use um servidor HTTP local:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicar no GitHub Pages

1. Crie um repositório público chamado, por exemplo, `nr1-demo-publico`.
2. Envie todos os arquivos desta pasta para a branch `main`.
3. Vá em `Settings → Pages`.
4. Em **Build and deployment**, escolha `Deploy from a branch`.
5. Selecione `main` e `/ (root)`.
6. Salve e aguarde a URL pública.

## Estrutura

```text
nr1-demo-publico/
├── assets/favicon.svg
├── css/styles.css
├── js/app.js
├── .gitignore
├── index.html
├── NOTICE.md
└── README.md
```

## O que não deve ser copiado para este repositório

```text
.env
database.sql
migrations/
config/
controllers/
models/
storage/
vendor/
```

Também não publique dumps, planilhas exportadas, relatórios reais ou dados identificáveis.

## Status

Demo de portfólio. Não destinada a uso operacional, diagnóstico real, coleta real de respostas ou tomada de decisão em saúde e segurança do trabalho.

## Direitos

Todos os direitos reservados. A publicação deste repositório para visualização não concede licença para exploração comercial, redistribuição ou incorporação do produto em soluções de terceiros.
