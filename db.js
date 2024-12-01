const mysql = require('mysql2');

// Configuração do banco de dados
const db = mysql.createConnection({
    host: '127.0.0.1', // Endereço do servidor MySQL
    user: 'root', // Usuário do banco
    password: 'JessicaM2002', // Senha do banco
    database: 'Loja', // Nome do banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

module.exports = db;
