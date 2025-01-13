# Sistema Loteria (projeto de aprendizado de tailwind e next.js)

## Sumário
1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Configuração do Ambiente](#configuração-do-ambiente)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Guia de Instalação](#guia-de-instalação)


## Visão Geral

O Sistema Loteria é uma plataforma completa de gerenciamento de loterias, projetada para oferecer uma solução robusta e escalável para administradores, operadores e usuários de sistemas de loteria. Nossa aplicação permite o gerenciamento eficiente de áreas de operação, sorteios, bilhetes e usuários, proporcionando uma experiência segura e intuitiva para todos os envolvidos.

### Principais Características

- Gerenciamento de áreas de operação (cidades/estados)
- Sistema de usuários com múltiplos níveis de acesso
- Criação e administração de sorteios
- Venda e verificação de bilhetes
- Geração de QR Codes para bilhetes
- Sistema de validação de prêmios
- Geração de relatórios detalhados
- Interface administrativa completa
- API RESTful para integração com outros sistemas

## Tecnologias Utilizadas

- **Backend:**
  - Node.js (v14+)
  - Express.js
  - TypeScript
  - MongoDB com Mongoose
  - JSON Web Tokens (JWT) para autenticação
- **Frontend:**
  - React.js
  - Next.js
  - Tailwind CSS
- **Ferramentas de Desenvolvimento:**
  - Docker
  - ESLint
  - Prettier
  - Jest para testes
- **Outras Tecnologias:**
  - QRCode para geração de códigos QR
  - PDFKit para geração de PDFs
  - bcrypt para hashing de senhas
  - crypto para criptografia de dados sensíveis

## Arquitetura do Sistema

O Sistema Loteria segue uma arquitetura de microserviços, dividida em três componentes principais:

1. **API Backend:** Responsável por toda a lógica de negócios, autenticação e interação com o banco de dados.
2. **Frontend Web:** Interface de usuário para administradores, operadores e usuários finais.
3. **Banco de Dados:** MongoDB para armazenamento persistente de dados.

### Diagrama de Arquitetura

```
+-------------------+      +-------------------+
|                   |      |                   |
|  Frontend Web     |<---->|  API Backend      |
|  (Next.js/React)  |      |  (Node.js/Express)|
|                   |      |                   |
+-------------------+      +--------+----------+
                                    |
                                    |
                                    v
                           +-------------------+
                           |                   |
                           |  MongoDB          |
                           |  (Banco de Dados) |
                           |                   |
                           +-------------------+
```

## Configuração do Ambiente

### Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB (v4.4 ou superior)
- Docker (opcional, mas recomendado)
- Git

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
MONGODB_URI=mongodb://localhost:27017/sortelegal
JWT_SECRET=seu_segredo_jwt_aqui
ENCRYPTION_KEY=sua_chave_de_criptografia_de_32_caracteres
PORT=5000
NODE_ENV=development
```

## Estrutura do Projeto

```
sistema-loteria/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── public/
│   └── package.json
│
├── docs/
│   ├── API.md
│   └── FUNCTIONS.md
│
├── scripts/
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── README.md
└── package.json
```

## Guia de Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/sistema-loteria.git
   cd sistema-loteria
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente (veja a seção [Configuração do Ambiente](#configuração-do-ambiente)).

4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

### Usando Docker

1. Construa e inicie os containers:
   ```
   docker-compose up --build
   ```

2. O sistema estará disponível em `http://localhost:5000`
