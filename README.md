# 💰 Financy — FullStack Financial Manager

O **Financy** é uma plataforma para gerenciamento financeiro pessoal que permite ao usuário:

- Registrar receitas e despesas
- Organizar transações por categorias
- Visualizar métricas consolidadas
- Acompanhar saldo líquido mensal

O projeto foi desenvolvido com foco em **boas práticas, organização arquitetural, tipagem forte e experiência de usuário consistente**.

---

# 🎯 Objetivo do Projeto

Construir uma aplicação FullStack com:

- Autenticação segura
- CRUD completo de transações
- CRUD completo de categorias
- Organização por categorias
- Dashboard com agregação de dados
- Arquitetura escalável
- Separação clara entre responsabilidades de front e back

Buscando atender aos seguintes requisitos:

Frontend:

- [ ] - O usuário pode criar uma conta e fazer login
- [ ] - O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [ ] - Deve ser possível criar uma transação
- [ ] - Deve ser possível deletar uma transação
- [ ] - Deve ser possível editar uma transação
- [ ] - Deve ser possível listar todas as transações
- [ ] - Deve ser possível criar uma categoria
- [ ] - Deve ser possível deletar uma categoria
- [ ] - Deve ser possível editar uma categoria
- [ ] - Deve ser possível listar todas as categorias
- [ ] - É obrigatória a criação de uma aplicação React usando GraphQL para consultas na API e Vite como `bundler`;
- [ ] - Siga o mais fielmente possível o layout do Figma;

Back-end:

- [ ] - O usuário pode criar uma conta e fazer login
- [ ] - O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [ ] - Deve ser possível criar uma transação
- [ ] - Deve ser possível deletar uma transação
- [ ] - Deve ser possível editar uma transação
- [ ] - Deve ser possível listar todas as transações
- [ ] - Deve ser possível criar uma categoria
- [ ] - Deve ser possível deletar uma categoria
- [ ] - Deve ser possível editar uma categoria
- [ ] - Deve ser possível listar todas as categorias

---

# 🧱 Arquitetura

O projeto foi dividido em duas aplicações independentes:

```
financy/
├── backend/
└── frontend/
```

---

# 🚀 Stack Tecnológica

## 🖥️ Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- Zustand (state management)
- Apollo Client
- React Router DOM
- date-fns
- Zod
- Lucide Icons

## 🛠 Backend

- Node.js
- TypeScript
- Apollo Server (GraphQL)
- Prisma ORM
- SQLite
- JWT (autenticação)

---

# 🔐 Autenticação

### Implementado:

- Cadastro de usuário
- Login com geração de JWT
- Proteção de rotas no backend
- Envio automático de token via Apollo Context Link
- Interceptação global de erro `UNAUTHENTICATED`
- Logout automático ao expirar token
- Limpeza do store e cache do Apollo

### Regra implementada:

A rota `/`:

- Exibe **Login** se o usuário não estiver autenticado
- Exibe **Dashboard** se o usuário estiver autenticado

Fluxo totalmente reativo e sem reload manual.

---

# 📊 Funcionalidades do Frontend

## Dashboard

- Filtro automático para mês atual
- Ordenação por data de criação
- Agrupamento por categoria
- Cálculo de saldo líquido (Income - Expense)
- Contagem de transações por categoria
- Interface responsiva
- Sistema de cores padronizado

---

## Transações

- Criar transação;
- Editar transação;
- Deletar transação;
- Listar transações;

---

## Categorias

- Criar categoria;
- Editar categoria;
- Deletar categoria;
- Associar ícone (enum tipado);
- Associar cor personalizada;
- Contagem de transações vinculadas;
- Visualização da categoria mais utilizada;

---

# ⚙️ Funcionalidades do Backend

## Autenticação

- Registro de usuário
- Login com JWT
- Middleware de validação de token
- Retorno de erro `UNAUTHENTICATED` para tokens inválidos/expirados

---

## Transações

- Criar transação
- Editar transação
- Deletar transação
- Listar transações do usuário autenticado
- Relacionamento com categoria
- Campos controlados e tipados

---

## Categorias

- Criar categoria
- Deletar categoria
- Editar categoria
- Listar categorias do usuário
- Relacionamento 1:N com transações

---

# 📊 Modelagem de Dados

Relacionamentos principais:

```
User
├── Categories
└── Transactions

Category
└── Transactions
```

Implementado com Prisma ORM e banco relacional SQlite.

---

# 🎨 Decisões Técnicas Relevantes

- Uso de Zustand para controle global de autenticação;
- Apollo ErrorLink para interceptação centralizada de erros;
- Limpeza automática de sessão ao expirar token;
- Uso de enum para padronização de tipos e ícones;
- Design System consistente com tokens personalizados;
- Fonte padrão Inter aplicada globalmente;
- Separação clara entre Layout público e protegido;
- Código fortemente tipado com TypeScript;
- Estrutura preparada para escalabilidade;

---

# 🛠️ Como Rodar o Projeto — Passo a Passo Completo

Este guia descreve detalhadamente como configurar e executar o projeto **Financy** localmente.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js (versão 18 ou superior)
- npm ou yarn
- SQlite
- Git
- VSCode
- Prisma Studio

---

### 📥 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd financy
```

### 🗄️ 2. Configuração do Backend

Entre na pasta do backend:

```
cd backend
```

#### 📦 2.1 Instalar dependências

```
npm install

ou

yarn
```

#### 🔐 2.2 Configurar variáveis de ambiente

Crie um arquivo .env na raiz da pasta backend conforme a .env.example na aplicação:

```
DATABASE_URL="file:./prisma/dev.db"

JWT_SECRET="sua_chave_secreta_aqui"
```

###### 🔎 Explicação:

DATABASE_URL → conexão com o banco

JWT_SECRET → chave usada para assinar o token

#### 🗄️ 2.3 Criar o banco de dados e rodar as migrations do Prisma

Crie o banco e rode as migrations nele:

```
npx prisma migrate dev
```

Isso irá:

- Criar as tabelas

- Gerar o Prisma Client

- Sincronizar o schema com o banco

#### ▶️ 2.4 Iniciar o servidor

```
npm run dev
```

O backend estará rodando em:

```
http://localhost:4000
```

O endpoint GraphQL normalmente estará disponível em:

```
http://localhost:4000/graphql
```

### 🌐 3. Configuração do Frontend

Abra um novo terminal e vá para a pasta do frontend:

```
cd frontend
```

##### 📦 3.1 Instalar dependências

```
npm install

ou

yarn
```

##### 🔐 3.2 Configurar variáveis de ambiente

Crie um arquivo .env na raiz do frontend, conforme o .env.example na aplicação:

```
VITE_API_URL=http://localhost:4000/graphql
```

⚠️ Importante:
No Vite, todas as variáveis precisam começar com VITE\_.

##### ▶️ 3.3 Iniciar o frontend

```
npm run dev
```

O frontend estará disponível em:

```
http://localhost:5173
```

⚠️ Importante:
Caso decida rodar o projeto do frontend em outra porta é necessário realizar a configuração do cors no servidor para que aceite as requisições realizadas pelo front-end no arquivo, backend/src/infra/server.ts no seguinte bloco:

```
app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );
```

### ✅ 4. Fluxo de Execução

Após iniciar:

Acesse http://localhost:5173

1. Crie uma conta
2. Faça login
3. Comece a cadastrar categorias e transações
4. Visualize os dados no Dashboard

### 🧪 (Opcional) Prisma Studio

Para visualizar o banco graficamente:

```
npx prisma studio
```

Isso abrirá uma interface web para visualizar os dados.

## ✍️ Autor

Gabriel de Almeida Rodrigues: https://github.com/gabriel-78
