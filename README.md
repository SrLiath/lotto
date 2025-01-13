# Sistema Loteria

## Sumário
1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Configuração do Ambiente](#configuração-do-ambiente)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Guia de Instalação](#guia-de-instalação)
7. [Desenvolvimento](#desenvolvimento)
8. [Testes](#testes)
9. [Deployment](#deployment)
10. [Manutenção](#manutenção)
11. [Documentação Adicional](#documentação-adicional)
12. [Contribuição](#contribuição)
13. [Suporte](#suporte)
14. [Licença](#licença)

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

\```
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
\```

## Configuração do Ambiente

### Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB (v4.4 ou superior)
- Docker (opcional, mas recomendado)
- Git

### Variáveis de Ambiente

Crie um arquivo \`.env\` na raiz do projeto com as seguintes variáveis:

\```
MONGODB_URI=mongodb://localhost:27017/sortelegal
JWT_SECRET=seu_segredo_jwt_aqui
ENCRYPTION_KEY=sua_chave_de_criptografia_de_32_caracteres
PORT=5000
NODE_ENV=development
\```

## Estrutura do Projeto

\```
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
\```

## Guia de Instalação

1. Clone o repositório:
   \```
   git clone https://github.com/seu-usuario/sistema-loteria.git
   cd sistema-loteria
   \```

2. Instale as dependências:
   \```
   npm install
   \```

3. Configure as variáveis de ambiente (veja a seção [Configuração do Ambiente](#configuração-do-ambiente)).

4. Inicie o servidor de desenvolvimento:
   \```
   npm run dev
   \```

### Usando Docker

1. Construa e inicie os containers:
   \```
   docker-compose up --build
   \```

2. O sistema estará disponível em \`http://localhost:5000\`

## Desenvolvimento

### Padrões de Código

- Utilizamos o ESLint e Prettier para manter a consistência do código.
- Siga o estilo de código definido nos arquivos \`.eslintrc\` e \`.prettierrc\`.

### Fluxo de Trabalho Git

1. Crie uma branch para sua feature: \`git checkout -b feature/nome-da-feature\`
2. Faça commits frequentes e descritivos
3. Faça push da sua branch e abra um Pull Request

### Comandos Úteis

- \`npm run dev\`: Inicia o servidor de desenvolvimento
- \`npm run build\`: Compila o projeto
- \`npm run lint\`: Executa o linter
- \`npm run format\`: Formata o código com Prettier

## Testes

Utilizamos Jest para testes unitários e de integração.

- \`npm run test\`: Executa todos os testes
- \`npm run test:watch\`: Executa testes em modo watch
- \`npm run test:coverage\`: Gera relatório de cobertura de testes

## Deployment

### Preparação para Produção

1. Compile o projeto: \`npm run build\`
2. Configure as variáveis de ambiente para produção
3. Certifique-se de que todas as dependências de produção estão instaladas

### Processo de Deployment

Detalhes sobre o processo de deployment serão adicionados conforme a infraestrutura de produção for definida.

## Manutenção

- Monitore regularmente os logs do sistema
- Realize backups diários do banco de dados
- Mantenha as dependências atualizadas, verificando compatibilidade

## Documentação Adicional

- [Documentação da API](./docs/API.md)
- [Documentação das Funções](./docs/FUNCTIONS.md)

## Contribuição

Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir para o projeto.

## Suporte

Para suporte técnico ou dúvidas, entre em contato com nossa equipe de desenvolvimento em dev@sistemaloteria.com.br.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.
