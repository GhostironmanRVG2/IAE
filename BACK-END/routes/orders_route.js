const app=require('../server');
const orders=require('../controllers/orders_controller');
app.get('/OrdersGetAll/', orders.read);
app.get('/OrderProductByOrderID/:order_id', orders.OrderProductByID);

