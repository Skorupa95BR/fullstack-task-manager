# Fullstack Task Manager — Frontend

Aplicação de gerenciamento de tarefas (CRUD completo) construída com React e Tailwind CSS.

## Tech Stack

- **React** — UI
- **Tailwind CSS** — Estilização
- **Create React App** — Tooling

## Funcionalidades

- Criar, listar, editar e deletar tarefas
- Marcar tarefas como concluídas
- Filtrar por: Todas / Pendentes / Concluídas
- Feedback visual com toasts de sucesso/erro
- Confirmação antes de deletar
- Edição inline com duplo clique

## Estrutura

```
front-end/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos globais (Tailwind)
│   ├── main.jsx         # Entry point React
│   ├── components/
│   │   ├── TaskForm.jsx # Formulário de criação
│   │   └── TaskItem.jsx # Item de tarefa (edição/deleção)
│   └── services/
│       └── api.js       # Integração com a API backend
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie o arquivo `.env` na raiz do projeto:
   ```env
   REACT_APP_API_URL=https://task-manager-api-ccfp.onrender.com
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

> O frontend consome a API do backend. Certifique-se de que o backend esteja rodando antes de iniciar.

## Deploy

- **Frontend:** Vercel
- **Backend:** Render
- **Banco de dados:** PostgreSQL (Neon)

## Observações

- O arquivo `.env` está protegido pelo `.gitignore` e não é versionado.
- A variável `REACT_APP_API_URL` deve apontar para a URL do backend (local ou em produção).

## Licença

Projeto para fins de estudo.
