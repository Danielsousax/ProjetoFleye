const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE",
}

app.use(cors(corsOptions));

app.use(express.json());

app.get('/test-connection', async (req, res) => {
  try {
    const result = await db.any('SELECT 1 as connected');
    res.json({ message: 'Conexão bem-sucedida', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro na conexão' });
  }
});

app.get('/users', async (req, res) => {
    const query = 'SELECT * FROM users';
    const result = await db.any(query);
    res.status(200).json(result);
});

app.post('/users', async (req, res) => {
  try { 
    const { name, email, age } = req.body;
    const query = 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING id';
    const result = await db.one(query, [name, email, age]);
    res.json({ message: 'Usuário criado com sucesso', userId: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id = $1';
    const user = await db.oneOrNone(query, userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter detalhes do usuário' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const { name, email, age } = req.body;
    console.log(name);
    console.log(email);
    console.log(age);
    const query = 'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4';
    await db.none(query, [name, email, age, userId]);
    res.json({ message: 'Usuário atualizado com sucesso', userId }); // Retorna o ID do usuário atualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = $1';
    await db.none(query, userId);
    res.status(200).json({ message: 'Usuário deletado com sucesso', userId }); // Retorna o ID do usuário excluído
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
});


app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});


