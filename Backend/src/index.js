// CRIAÇÃO DAS VARIÁVEIS DO TIPO: CONSTANTE IMPORTANDO OS PACOTES:
const express = require('express')
const cors = require('cors')

// IMPORTAÇÃO DO ARQUIVO DE CONEXÃO COM O BANCO DE DADOS - CONSTANTE db:
const db = require('./config/database')

// constante responsável pela manutenção da aplicação - vai ser instanciada a aplicação:
// subiu a aplicação:
const app = express()

// Middleware JSON: Para a aplicação ter os recursos necessários para trabalhar como o formato de dados do tipo JSON - TODO TRAFEGO DE INFORMAÇÕES NAS API´S NORMALMENTE É FEITO NO FORMATO DO TIPO JSON:
app.use(express.json())

// Middleware CORS: plug in que habilita outras aplicações acessem os dados da api.
app.use(cors())

// ROTAS - CONTROLAR: permitir o envio de comandos solicitando listagens:
/* VERBOS HTTP: 
   -----------------------
   GET - RETORNA DADOS
   POST - CADASTRAR DADOS
   PUT - EDITAR DADOS
   PATCH - EDITAR DADOS
   DELETE - EXCLUIR DADOS
   ------------------------*/

/* STATUS CODE:
   ------------------------
   200 - Retorna OK
   201 - Inserido com sucesso
   400 - Erro (cliente)
   401 - Não autorizado
   404 - Não encontrado
   500 - Erro (servidor)  
*/

// ROTA: mobile - CONSULTAR CARDÁPIO (get):
app.get('/produtos/cardapio', function (request, response) {
  let ssql = 'select c.descricao AS categoria,  p.* '
  ssql += 'from produto p '
  ssql += 'join produto_categoria c '
  ssql += 'on (c.id_categoria = p.id_categoria) '
  ssql += 'order by c.ordem '

  db.query(ssql, function (err, result) {
    if (err) {
      return response.status(500).send(err)
    } else {
      return response.status(200).json(result)
    }
  })
})

// ROTA - mobile: O APP FAZ A REQUISIÇÃO PARA A API PARA CADASTRAR O PEDIDO(post):
app.post('/pedidos', function (request, response) {
  /*
  let ssql = 'select c.descricao AS categoria,  p.* '
  ssql += 'from produto p '
  ssql += 'join produto_categoria c '
  ssql += 'on (c.id_categoria = p.id_categoria) '
  ssql += 'order by c.ordem '

  db.query(ssql, function (err, result) {
    if (err) {
      return response.status(500).send(err)
    } else {
      return response.status(200).json(result)
    }
  })
  */
})

// Na mesma rota: CONSULTAR OS PEDIDOS(get):
app.get('/pedidos', function (request, response) {
  /*
  let ssql = 'select c.descricao AS categoria,  p.* '
  ssql += 'from produto p '
  ssql += 'join produto_categoria c '
  ssql += 'on (c.id_categoria = p.id_categoria) '
  ssql += 'order by c.ordem '

  db.query(ssql, function (err, result) {
    if (err) {
      return response.status(500).send(err)
    } else {
      return response.status(200).json(result)
    }
  })
  */
})

// ROTA: ENDPOINT STATUS PEDIDO NA APLICAÇÃO WEB:
app.put('/pedidos/status', function (request, response) {
  /*
  let ssql = 'select c.descricao AS categoria,  p.* '
  ssql += 'from produto p '
  ssql += 'join produto_categoria c '
  ssql += 'on (c.id_categoria = p.id_categoria) '
  ssql += 'order by c.ordem '

  db.query(ssql, function (err, result) {
    if (err) {
      return response.status(500).send(err)
    } else {
      return response.status(200).json(result)
    }
  })
  */
})

// ROTA - mobile -ENDPOINT: LISTAR AS CONFIGURAÇÕES DA PLATAFORMA - LISTAR TODOS OS DADOS QUE A APLICAÇÃO PRECISA PRA FUNCIONAR:
app.get('/configs', function (request, response) {
  let ssql = 'select * from config'

  db.query(ssql, function (err, result) {
    if (err) {
      return response.status(500).send(err)
    } else {
      return response.status(200).json(result[0])
    }
  })
})

// aplicação vai subir ficar respondendo na porta 3000 e mostrar a mensagem da função callback:
app.listen(3000, function () {
  console.log('servidor no ar na porta 3000')
})

// testar no node a subida da aplicação (dentro da pasta que está o arquivo index.js):
// node src\index
// aplicação no ar mostrando a mensagem "servidor no ar na porta 3000" - para parar ctrl + c no terminal
