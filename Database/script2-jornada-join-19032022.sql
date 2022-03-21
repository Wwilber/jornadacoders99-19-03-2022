select c.descricao AS categoria,  p.*
from produto p
join produto_categoria c 
on (c.id_categoria = p.id_categoria)
order by c.ordem; 