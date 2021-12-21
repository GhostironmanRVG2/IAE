const {app}=require('../server');
const orders=require('../controllers/orders_controller');
//GET DOS VALORES DE ORDER E SUPPLIER
app.get('/OrdersGetAll/', orders.read);
//GET DOS VALORES DE ORDER E ORDERED_RPODUCT, PRECISA DE: 
//order_id
app.get('/OrderProductByOrderID/:order_id', orders.OrderProductByID);
//GET DOS VALORES DOS SUPPLIERS
app.get('/SuppliersGetAll/', orders.GetSuppliers);
//post do ordered_product
app.post('/InsertOrderedProducts',orders.InsertOrdered);
//POST DE UMA ORDER
app.post('/OrderPost/', orders.saveOrder);
<<<<<<< HEAD
=======
//GET DO ORDER_ID PELO DOCUMENT_ID
app.get('/OrderIdGetByDocumentId/:document_id', orders.GetOrderId);
>>>>>>> de4f541d925d5457dc85910c69284d83e0677d9f
