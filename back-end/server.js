require('dotenv').config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())

const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect()
  .then(() => console.log("✅ Conectado ao banco"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

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
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
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