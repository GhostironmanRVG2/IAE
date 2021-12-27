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
app.post("/InsertPurchaseOrder",purchase.insert);
//FAZER UM GET POR
app.get("/PurchaseOrderByDoc/:document_id",purchase.getDoc); 
app.delete("/DeletePurchaseOrder/:company_id/:document_id/:order_id");