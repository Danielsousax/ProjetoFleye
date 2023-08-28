const pgp = require('pg-promise')();

// Configuração da conexão com o banco de dados
const connection = {
  host: 'localhost',   // Endereço do servidor do banco de dados
  port: 5432,          // Porta do banco de dados (padrão: 5432)
  database: 'ProjetoFleye', // Nome do banco de dados
  user: 'postgres', // Nome de usuário
  password: '0510' // Senha do usuário
};

// Criação do objeto de conexão
const db = pgp(connection);

// Exportação do objeto de conexão
module.exports = db;
