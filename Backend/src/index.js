// CRIAÇÃO DAS VARIÁVEIS DO TIPO: CONSTANTE IMPORTANDO OS PACOTES:

// express : - controi a API e serve os dados - gerencia as requisições: tipo listagem de produtos, de pedidos e etc...;
const express = require('express')

// cors - plug in/pacote para utilizar nas aplicações web - tem função de liberar o acesso de aplicações de terceiros para dentro da API - PARA AS APLICAÇÕES WEB E MOBILE POSSAM ACESSAR A API:
const cors = require('cors')

// IMPORTAÇÃO DO ARQUIVO DE CONEXÃO COM O BANCO DE DADOS - CONSTANTE db:
const db = require('./config/database')

// constante responsável pela manutenção da aplicação - vai ser instanciada a aplicação - sobe a aplicação:
const app = express()

// Middleware JSON: Para a aplicação ter os recursos necessários para trabalhar com o formato de dados do tipo JSON - TODO TRÁFEGO DE INFORMAÇÕES NAS API´S NORMALMENTE É FEITO NO FORMATO DO TIPO JSON:
app.use(express.json())

// Middleware CORS: plug in que permite que outras aplicações acessem os dados da API:
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
   200 - Retorna OK             = DEU TUDO CERTO A RESPOSTA PARA REQUISIÇÃO
   201 - Inserido com sucesso   = CADASTRADO O DADO.
   400 - Erro (cliente)         = GERALMENTE A REQUISIÇÃO NÃO FOI COMPLETA - FALTOU ALGUM CAMPO OBRIGATORIO
   401 - Não autorizado         = SEGURANÇA - ACESSO COM USUARIO OU SENHA INCORRETO E ETC...
   404 - Não encontrado         = ALGUM RECURSO PROCURADO NÃO FOI ENCONTRADO
   500 - Erro (servidor)        = INSERIR DADO NA TABELA QUE NÃO EXISTE; SERVIDOR NÃO ACESSOU O BANCO DE DADOS.
*/

// ROTA: mobile - CONSULTAR CARDÁPIO (get): request: requisição que chega / response: resposta para a aplicação que chamou a API:
app.get('/produtos/cardapio', function (request, response) {
  /* let ssql = 'select c.descricao AS categoria,  p.* '
  ssql += 'from produto p '
  ssql += 'join produto_categoria c '
  ssql += 'on (c.id_categoria = p.id_categoria) '
  ssql += 'order by c.ordem ' */

  let ssql =
    'select c.descricao AS Categoria, p.nome AS Nome, p.descricao AS Ingredientes, '
  ssql += 'p.preco AS "Preço do Produto", p.url_foto AS link '
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

// Na mesma rota: CONSULTAR OS PEDIDOS(get):
app.get('/pedidos', function (request, response) {
  let ssql =
    'select p.id_pedido, p.status, date_format(p.data_pedido, "%d/%m/%Y %H:%i:%s") as dt_pedido, \
      p.vl_total, count(*) as qtd_item from pedido p join pedido_item i \
      on (i.id_pedido = p.id_pedido) group by p.id_pedido, p.status, p.data_pedido, p.vl_total '

  db.query(ssql, function (err, result) {
    if (err) {
      return response.status(500).send(err)
    } else {
      return response.status(200).json(result)
    }
  })
})

// ROTA: CONSULTA ITENS DO PEDIDO:
app.get('/pedidos/itens', function (request, response) {
  let ssql = 'select p.id_pedido, p.status, '
  ssql += "date_format(p.data_pedido, '%d/%m/%Y %H:%i:%s') as dt_pedido, "
  ssql += ' p.vl_total, count(*) as qtd_item '
  ssql += ' from pedido p '
  ssql += ' join pedido_item i '
  ssql += ' on (i.id_pedido = p.id_pedido) '
  ssql += ' group by p.id_pedido, p.status, p.data_pedido, p.vl_total'

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
  db.beginTransaction(function (err) {
    let ssql =
      'insert into pedido (id_usuario, data_pedido, vl_subtotal, vl_entrega, vl_total, status)'
    ssql += "values(?, current_timestamp(), ?, ?, ?, 'A' )"

    // como tá inserindo um pedido, é necessário passar parametro adicionais(array):
    db.query(
      ssql,
      [
        request.body.id_usuario,
        request.body.vl_subtotal,
        request.body.vl_entrega,
        request.body.vl_total
      ],
      function (err, result) {
        if (err) {
          db.rollback()
          response.status(500).json(err)
        } else {
          // para captura o pedido inserido acima - criado a variável id_pedido:
          var id_pedido = result.insertId
          // se conseguiu fazer o pedido, vamos pegar todos os itens da nossa requisição:
          if (id_pedido > 0) {
            const itens = request.body.itens
            var values = []

            for (var i = 0; i < itens.length; i++) {
              // inserir itens(objeto) dentro de um array(values) usa o push:
              values.push([
                id_pedido,
                itens[i].id_produto,
                itens[i].qtd,
                itens[i].vl_unitario,
                itens[i].vl_total
              ]) // cada push que é feito é inserido um objeto dentro do array
            }

            ssql =
              'insert into pedido_item(id_pedido, id_produto, qtd, vl_unitario, vl_total) values ?'

            db.query(ssql, [values], function (err, result) {
              if (err) {
                db.rollback()
                response.status(500).json(err)
              } else {
                db.commit()
                response.status(201).json({ id_pedido: id_pedido })
              }
            })
          }
        }
      }
    )
  })
})

// ROTA: ENDPOINT STATUS PEDIDO NA APLICAÇÃO WEB:
app.put('/pedidos/status/:id_pedido', function (request, response) {
  // http://localhost:3000/pedidos/status/1000 :
  let ssql = 'update pedido set status = ? where id_pedido = ?'

  db.query(
    ssql,
    [request.body.status, request.params.id_pedido],
    function (err, result) {
      if (err) {
        return response.status(500).send(err)
      } else {
        return response
          .status(200)
          .json({ id_pedido: request.params.id_pedido })
      }
    }
  )
})

// ROTA - mobile -ENDPOINT: LISTAR AS CONFIGURAÇÕES DA PLATAFORMA - LISTAR TODOS OS DADOS QUE A APLICAÇÃO PRECISA PRA FUNCIONAR: taxa de entrega ou outra coisa:
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

// aplicação respondendo na porta 3000 e mostrar a mensagem da função callback:
app.listen(3000, function () {
  console.log('servidor no ar na porta 3000')
})

// testar no node a subida da aplicação (dentro da pasta que está o arquivo index.js):
// node src\index
// aplicação no ar mostrando a mensagem "servidor no ar na porta 3000" - para parar ctrl + c no terminal
