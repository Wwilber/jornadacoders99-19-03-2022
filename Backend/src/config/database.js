// RESPONSÁVEL POR SE COMUNICAR COM O BANCO DE DADOS:

// importação do pacote/PLUG IN mysql:
const mysql = require('mysql')

// responsável pela conexão com o banco de dados:
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'cardapio'
})

// testar a conexão - TENTAR ABRIR A CONEXÃO:
db.connect(function (err) {
  if (err) {
    console.log('Erro ao conectar com o banco', err.message)
  }
})

// exportar a conexão com o banco de dados:
module.exports = db
