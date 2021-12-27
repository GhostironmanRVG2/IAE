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
//post do ordered_product ARRAY
app.post('/InsertOrderedProductsArray',orders.InsertOrderedArray);
//POST DE UMA ORDER
app.post('/OrderPost/', orders.saveOrder);
//GET DO ORDER_ID PELO DOCUMENT_ID
app.get('/OrderIdGetByDocumentId/:document_id', orders.GetOrderId);
//DELETE DO ORDER_ID E ORDERED_PRODUCT PELO ORDER_ID
app.delete('/OrderOrderedDeleteByOrderId/:order_id', orders.DeleteOrderID);
//GET DOS VALORES DE SUPPLIER E ORDERED_RPODUCT, PRECISA DE: 
//order_id
app.get('/OrderProducedSuppliertByOrderID/:order_id', orders.OrderProductedByOrderID);
//GET DE TODOS OS VALORES DE ORDER E SUPPLIER, PRECISA DE:
//ORDER_ID
app.get('/OrderSupplierByOrderId/:order_id', orders.OrderSupplierByOrderID);