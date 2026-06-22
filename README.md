# 🤖 NEXT RAG CHATBOT

## Visão Geral

Aplicação de chat com IA que responde com base em uma base de conhecimento própria, utilizando **RAG (Retrieval-Augmented Generation)**. Em vez de depender apenas do conhecimento estático do modelo de linguagem, o sistema recupera trechos relevantes de documentos indexados e os injeta no contexto da geração, produzindo respostas mais precisas e ancoradas em fontes reais.

## Problema Resolvido

Modelos de linguagem genéricos não têm acesso a informações privadas, atualizadas ou específicas de um domínio (documentação interna, PDFs, bases de conhecimento, etc.) e tendem a alucinar quando questionados sobre esse tipo de conteúdo. Este projeto resolve esse problema ao:

- Permitir a ingestão de documentos (PDFs e textos) como fonte de verdade.
- Dividir o conteúdo em chunks semânticos para indexação eficiente.
- Recuperar apenas os trechos relevantes para cada pergunta antes de gerar a resposta.
- Entregar a resposta em streaming, com renderização rica (código, markdown, fórmulas matemáticas e diagramas).

## Solução Implementada

O projeto foi construído como uma aplicação Full Stack em **Next.js (App Router)**, com persistência em **PostgreSQL (Neon Serverless)** via **Drizzle ORM**, e o pipeline de RAG orquestrado pelo **Vercel AI SDK**. Principais funcionalidades:

- **Ingestão de Documentos:** extração de texto de PDFs com `pdf-parse` e chunking semântico com `@langchain/textsplitters`.
- **Geração Aumentada por Recuperação:** o `ai` SDK (`@ai-sdk/openai`, `@ai-sdk/react`) orquestra a busca pelos chunks relevantes e a geração da resposta com streaming.
- **Renderização Rica de Respostas:** uso do `streamdown` com plugins para código (`@streamdown/code`), matemática (`@streamdown/math`), diagramas Mermaid (`@streamdown/mermaid`) e CJK, permitindo que a IA responda com blocos de código, fórmulas e diagramas formatados corretamente em tempo real.
- **Autenticação:** gerenciada via **Clerk**, isolando o histórico e os documentos por usuário.
- **Banco de Dados:** Postgres serverless (Neon) com schema e migrações versionadas via Drizzle.
- **Visualização de Fluxos:** `@xyflow/react` utilizado para [descreva aqui — ex.: visualizar o grafo de relações entre documentos/chunks, se aplicável].

## Stack Tecnológica

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) com [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Base UI](https://base-ui.com/), [shadcn/ui](https://ui.shadcn.com/)
- **IA / RAG:** [Vercel AI SDK](https://ai-sdk.dev/) (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`), [LangChain Text Splitters](https://www.npmjs.com/package/@langchain/textsplitters), `pdf-parse`
- **Renderização de respostas:** [Streamdown](https://streamdown.ai/) (código, markdown, math, Mermaid, CJK)
- **Banco de Dados:** PostgreSQL via [Neon Serverless](https://neon.tech/) + [Drizzle ORM](https://orm.drizzle.team/)
- **Autenticação:** [Clerk](https://clerk.com/)
- **Lint/Format:** [Biome](https://biomejs.dev/)
- **Outros:** Zod (validação), Sonner (notificações), Lucide React (ícones), `@xyflow/react` (fluxos/diagramas)

## Design e Experiência do Usuário

Interface construída com Tailwind CSS, Radix UI e shadcn/ui, priorizando:

- **Streaming em tempo real** das respostas, sem espera pelo texto completo.
- **Renderização rica** de código com syntax highlighting (`shiki`), fórmulas matemáticas e diagramas Mermaid diretamente no chat.
- **Responsividade** entre desktop e mobile.
- **Feedback visual** com notificações (`Sonner`) e estados de carregamento.

## Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) `>=20`
- [pnpm](https://pnpm.io/) (ou npm/yarn)
- Uma instância PostgreSQL — recomendado [Neon](https://neon.tech/) (serverless) ou Postgres local
- Chave de API da [OpenAI](https://platform.openai.com/) (ou provedor compatível com o AI SDK)
- Conta no [Clerk](https://clerk.com/) para autenticação

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/ElFabrica/aisdk-rag-chatbot.git
cd aisdk-rag-chatbot
```

### Passo 2: Instalar Dependências

```bash
pnpm install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Banco de dados (Postgres)
DATABASE_URL=

# OpenAI / Provedor de IA
OPENAI_API_KEY=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### Passo 4: Aplicar as Migrações do Banco

```bash
pnpm db:generate
pnpm db:migrate
```

### Passo 5: Executar o Projeto

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

## 🛠️ Scripts Disponíveis

- `pnpm dev` — inicia o servidor de desenvolvimento
- `pnpm build` — gera a build de produção
- `pnpm start` — inicia o servidor em produção
- `pnpm lint` — executa o Biome (lint)
- `pnpm format` — formata o código com o Biome
- `pnpm db:generate` — gera as migrações do Drizzle
- `pnpm db:migrate` — aplica as migrações no banco
- `pnpm db:push` — sincroniza o schema diretamente com o banco (sem gerar arquivo de migração)
- `pnpm db:studio` — abre o Drizzle Studio para inspecionar os dados
