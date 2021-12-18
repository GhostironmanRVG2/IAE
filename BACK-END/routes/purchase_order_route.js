const { app } = require('../server');
const purchase=require('../controllers/purchase_order_controller');

//FAZER UM INSERT DE UMA PURCHASE ORDER
/** OBRIGATORIO:
company_id int
##############Obrigatório####################

date date
##############Obrigatório####################

expiration_date date
##############Obrigatório####################

maturity_date_id int
document_set_id int
##############Obrigatório####################

customer_id int
##############Obrigatório####################

alternate_address_id int
your_reference string
financial_discount float
salesman_id int
salesman_commission float
special_discount float
associated_documents array{
associated_id int
##############Obrigatório####################

value_associated float
##############Obrigatório####################
}



related_documents_notes string



products array{
##############Obrigatório####################

product_id_procts int
##############Obrigatório####################

name_products string
##############Obrigatório####################
summary_products string
qty_products float
##############Obrigatório####################

price_products float
##############Obrigatório####################

discount_products float
deduction_id_products int
order_products int
exemption_reason_products string
taxes_products array
tax_id_products int
##############Obrigatório####################

value_products float
order_products int
cumulative_products int
}



child_products array{

product_id_child int
##############Obrigatório####################

name_child string
##############Obrigatório####################

summary_child string
qty_child float
##############Obrigatório####################

price_child float
##############Obrigatório####################

discount_child float
deduction_id_child int
order_child int
origin_id_child int
exemption_reason_child string
warehouse_id_child int
properties_child array
title_child string
value_child string
taxes_child array
tax_id_child int
##############Obrigatório####################

value_child float
order_child int
cumulative_child int
}

exchange_currency_id int
exchange_rate float
delivery_method_id int
delivery_datetime date
delivery_departure_address string
delivery_departure_city string
delivery_departure_zip_code string
delivery_departure_country int
delivery_destination_address string
delivery_destination_city string
delivery_destination_zip_code string
delivery_destination_country int
vehicle_id int
vehicle_name string
vehicle_number_plate string
notes string
status int



 * 
 * 
 */
app.post("/InsertPurchaseOrder",purchase.insert);