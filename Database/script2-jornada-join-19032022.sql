/* SELECT TIPO:1: */
select c.descricao AS categoria,  p.*
from produto p
join produto_categoria c 
on (c.id_categoria = p.id_categoria)
order by c.ordem; 

/* SELECT TIPO: 2 */
select c.descricao AS categoria, p.nome AS Nome, p.descricao AS Ingredientes,
p.preco AS 'Valor do Produto', P.url_foto AS link 
from produto p
join produto_categoria c 
on (c.id_categoria = p.id_categoria)
order by c.ordem; 

/* let ssql = 'select c.descricao AS categoria, p.nome AS nome, p.descricao AS ingredientes, '
  ssql += 'p.preco AS valor_produto, p.url_foto AS link '
  ssql += 'from produto p '
  ssql += 'join produto_categoria c '
  ssql += 'on (c.id_categoria = p.id_categoria) '
  ssql += 'order by c.ordem ' */



select p.id_pedido, p.status, 
date_format(p.data_pedido, '%d/%m/%Y %H:%i:%s') as dt_pedido, 
p.vl_total, count(*) as qtd_item
from pedido p
join pedido_item i 
on (i.id_pedido = p.id_pedido)
group by p.id_pedido, p.status, p.data_pedido, p.vl_total;

select * from pedido;

