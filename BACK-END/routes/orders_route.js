const app=require('../server');
const orders=require('../controllers/orders_controller');
//GET DOS VALORES DE ORDER E SUPPLIER
app.get('/OrdersGetAll/', orders.read);
//GET DOS VALORES DE ORDER E ORDERED_RPODUCT, PRECISA DE: 
//order_id
app.get('/OrderProductByOrderID/:order_id', orders.OrderProductByID);
//GET DOS VALORES DOS SUPPLIERS
app.get('/SuppliersGetAll/', orders.GetSuppliers);

