const express = require('express');
const db = require('./db');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Endpoint para listar usuários
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err.message);
            res.status(500).json({ error: 'Erro no servidor' });
        } else {
            res.json(results);
        }
    });
});

// Endpoint para registrar um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome, email, senha, endereco } = req.body;

    db.query(
        'INSERT INTO usuarios (nome, email, senha, endereco) VALUES (?, ?, ?, ?)',
        [nome, email, senha, endereco],
        (err, results) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err.message);
                res.status(500).json({ error: 'Erro ao registrar usuário' });
            } else {
                res.status(201).json({ message: 'Usuário registrado com sucesso!' });
            }
        }
    );
});

// Endpoint para autenticação de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (err, results) => {
            if (err) {
                console.error('Erro no login:', err.message);
                res.status(500).json({ error: 'Erro no servidor' });
            } else if (results.length === 0) {
                res.status(401).json({ error: 'Credenciais inválidas' });
            } else {
                res.json({ message: 'Login bem-sucedido', user: results[0] });
            }
        }
    );
});

// Iniciar o servidor
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${5500}`);
});

