const properties=require('../server');
const customers=require('../controllers/customer_controller');
//GET DE UMA RESPETIVA FATURA DE UM DETERMINADO CUSTOMER
//company_id e customer_id
//Tipo: Body
properties.app.get("/customergetone",customers.getOne);