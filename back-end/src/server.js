import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes);

import pg from 'pg';
const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect()
  .then(() => console.log("✅ Conectado ao banco"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

app.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const result = await client.query(
      'SELECT * FROM tasks WHERE user_id = $1',
      [req.userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Erro ao buscar tasks");
  }
})

app.post("/tasks", authMiddleware, async (req, res) => {
    const { title } = req.body;

   try{
    const result = await client.query(
      'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, req.userId]
    );

    res.json(result.rows[0]);
   } catch (error) {
    res.status(500).send("Erro ao criar task");
   }
}) 


app.get("/", (req, res) => {
  res.send("API funcionando 🚀")
})

app.get("/tasks", async (req, res) => {
  console.log("bateu na rota /tasks");
  try {
    const result = await client.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar tasks");
  }
});

const PORT = process.env.PORT || 3000


app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    const result = await client.query(
      'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, 1]
    );

    if(!title){
      return res.status(400).send("O título da task é obrigatório");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar task");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send("Task não encontrada");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar task");
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const result = await client.query(
      "UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send("Task não encontrada");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar task");
  }
});

app.patch("/tasks/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query (
      "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
      [id]
    );
     res.json(result.rows[0]);
     
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao completar task");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})