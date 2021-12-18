const { app } = require('../server');
const purchase=require('../controllers/purchase_order_controller');

//FAZER UM INSERT DE UMA PURCHASE ORDER
/** OBRIGATORIO:
company_id
date
expiration_date
(SENDO x A POSICAO NO ARRAY)
products[x][product_id]
products[x][name]
products[x][qty]
products[x][price]
products[x][exemption_reason]
 */
app.post("/doc",purchase.getDoc);
app.post("/InsertPurchaseOrder",purchase.insert);
