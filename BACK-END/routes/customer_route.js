const properties=require('../server');
const customers=require('../controllers/customer_controller');
//GET DE UMA RESPETIVA FATURA DE UM DETERMINADO CUSTOMER
//company_id //OBRIGATORIO 
//customer_id e associated_id
//Tipo: Body
properties.app.get("/customergetone/:associated_id",customers.getOne);
properties.app.get("/customersgetall",customers.getAll);