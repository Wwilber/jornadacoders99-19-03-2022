PROJETO: Criar uma aplicação de DELIVERY e CARDÁPIO DIGITAL:

- API BACKEND: Que vai ligar o cliente ao servidor;
- Na parte do BACKEND(um servidor de dados(API) - NODE.JS);
- Na parte do FRONTEND(um aplicativo mobile - e uma aplicação WEB)

- Interface MOBILE: Usuário vai simular a compra de produtos, ver datalhe dos produtos, definir quantidade, acessar a sacola de compras incluída a taxa de entrega e consultar a lista de pedidos pelo celular;

- Interface WEB: Os restaurantes irão monitoras os pedidos que estão chegando: se está em produção, se foi entregue e etc;

3 PILARES:

1. ESCALA: Atender mais clientes - DO BRASIL A FORA;
2. MARGEM DE LUCRO: Por subir aplicações na nuvem e mobile a margem aumenta(por ter pouco desenvolvimento e customização);
3. RECORRÊNCIA: cobrar mensalidades(taxa de manutenção).

FERRAMENTAS UTILIZADAS:

- Banco de Dados: MYSQL;
- Editor de Código: VSCODE;
- Construtor da API: NODE;
- Ferramenta POSTMAN: para testar a API, antes mesmo de ser criada uma aplicação WEB, ou aplicação MOBILE

ESTRUTURA DE PASTAS(PROJETO):

- BACKEND: todo o código do node(servidor) vai ficar arquivado aqui;
- DATABASE: todos os script´s mysql(banco de dados que está sendo usado nesse projeto) ficarão aqui.
- MOBILE: todos os arquivos mobile do APP.
- WEB: aplicação web - todo o código do react(vai ser usado) para criação da página web.

1.  CRIAÇÃO DO BANCO DE DADOS UTILIZANDO O MYSQL;

2.  ETAPA 01: BACKEND: CRIAÇÃO API(NODE):
    02.01. ABRIR TERMINAL: ctrl + ' na pasta BACKEND:

01.02. INICIAR GERENCIADOR DE PACOTES:
01.02.01. NPM:

npm init; enter em todas as perguntas - foi criado o package.json.

01.02.02. NO NPM: baixar alguns drivers/pacotes:

- npm install mysql : para acesso ao mysql
- foi criado 1 pasta e um arquivo com os drivers: node_modules e package-lock.json;
- npm install express : - controi a API e serve os dados - gerencia as requisições: tipo listagem de produtos, de pedidos e etc...;
- npm install cors - plug in/pacote para utilizar nas aplicações web - tem função de liberar o acesso de aplicações de terceiros para dentro da API - PARA AS APLICAÇÕES WEB E MOBILE POSSAM ACESSAR A API;
- npm install nodemon: quando salva no projeto automaticamente recompila pra nós - se der erro tem que executar: Get-ExecutionPolicy pra ver a policy e se tiver diferente de Remote Signed execute o Set-ExecutionPolicy RemoteSigned.

  01.02.03. CRIADO DENTRO DA PASTA BACKEND A PASTA "src" para arquivar todos os códigos fontes;

  01.02.04. index.js: CÓDIGO FONTE DA PORTA DE ENTRADA DA APLICAÇÃO - APLICATIVO(API)

  01.02.05. CRIADA DENTRO DA src A PASTA config PARA ABRIGAR OS ARQUIVOS DE CONFIGURAÇÕES DE ACESSO DA API AO BANCO DE DDOS MYSQL:

  01.02.05.01. database.js: CRIADO O ARQUIVO COM A CONFIGURAÇÃO PARA CONEXÃO DA API COM O BANCO DE DE DADOS. - database.js foi IMPORTADO NO index.js.

  2.  NO ARQUIVO index.js: criadas as rotas na API:
      ROTA 01. CONSULTA DOS PRODUTOS

  ROTA 02. CADASTRAMENTO DO PEDIDO

  ROTA 03.
