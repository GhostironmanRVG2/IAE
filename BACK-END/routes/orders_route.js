const app=require('../server');
const orders=require('../controllers/orders_controller');
app.get('/getAll/', orders.read);

