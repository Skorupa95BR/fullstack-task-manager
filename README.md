# 🧠 Task Manager Fullstack

Aplicação fullstack de gerenciamento de tarefas com autenticação de usuários, desenvolvida para simular um cenário real de uso com foco em performance, organização e experiência do usuário.

---

## 🔗 Acesse o projeto

🌐 **Demo (Vercel):**  
https://fullstack-task-manager-one.vercel.app/

📦 **Front-end:**  
https://github.com/Skorupa95BR/fullstack-task-manager/tree/main/front-end

⚙️ **Back-end:**  
https://github.com/Skorupa95BR/fullstack-task-manager/tree/main/back-end

---

## ✨ Funcionalidades

- 🔐 Cadastro e login de usuários
- 🔑 Autenticação com JWT
- 🧾 CRUD completo de tarefas
- 📊 Barra de progresso baseada nas tarefas concluídas
- 🔍 Filtro por status (todas, pendentes, concluídas)
- 👤 Isolamento de dados por usuário
- ⚡ Acesso rápido com conta demo
- 📱 Interface responsiva

---

## 🛠️ Tecnologias utilizadas

### Front-end
- React
- Tailwind CSS
- React Router

### Back-end
- Node.js
- Express
- PostgreSQL

### Infraestrutura
- Banco de dados: Neon
- Deploy Front: Vercel
- Deploy Back: Render

---

## 🧠 Arquitetura

O projeto está dividido em duas aplicações independentes:

```bash
/back-end   → API REST + autenticação + banco
/front-end  → Interface + consumo da API
