const properties=require('../server');
const products=require('../controllers/products_controller');
//GET DE TODOS OS PRODUTOS , PRECISA DE: 
//company_id e category_id
//TIPO: Body
properties.app.get("/productsgetall",products.getAll);
