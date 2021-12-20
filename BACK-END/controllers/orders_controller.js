const connect = require('../config/connect');
const purchase_order_controller = require('./purchase_order_controller');
//FUNÇÃO PARA DEOLVER OS DADOS DOORDER E SUPPLIER 
function read(req, res) {
    connect.con.query('SELECT iae.order.order_id, iae.order.supplier_id, iae.order.date, iae.order.expire_date, iae.order.total, iae.order.document_id, iae.supplier.designation, count(iae.ordered_product.order_id) as OrderedProducts_orderid_count FROM iae.order LEFT JOIN iae.supplier ON iae.order.supplier_id = iae.supplier.supplier_id LEFT JOIN iae.ordered_product ON iae.ordered_product.order_id = iae.order.order_id group by iae.order.order_id' , function(error, result){
      //caso de erro ,manda msg de erro
        if (error){
          //ENVIAR STATUS DE ERRO
          res.status(400).send({
            "msg": "Error, something went wrong"
        });
        //PRINTAR NA CONSOLA ERRO
          return console.error(error);
        }else{
        //CASO DE CERTO , PRINTAR ERRO E MANDAR O ERRO
        console.log(result);
        res.send(result);
        }
    });
}

//FUNÇÃO PARA DEVOLVER OS VALORES DO ORDER E ORDERED_PRODUCT COM O MESMO order_id
function OrderProductByID(req, res) {
    const order_id = req.sanitize('order_id').escape();
    connect.con.query('SELECT iae.order.order_id as order_id, iae.order.supplier_id as supplier_id_order, iae.order.date as date_order, iae.order.expire_date as expire_date_order, iae.order.total as total_order, iae.order.document_id as document_id_order, iae.ordered_product.description as designation_ordered_product, iae.ordered_product.order_id as order_id_ordered_product, iae.ordered_product.ordered_product_id as ordered_product_id_ordered_product, iae.ordered_product.quantity as quantity_ordered_product, iae.ordered_product.total as total_ordered_product, iae.ordered_product.unit_price as unit_price_ordered_product FROM iae.ordered_product JOIN iae.order ON iae.ordered_product.order_id = iae.order.order_id WHERE iae.order.order_id = ?', order_id, function(error, result) {
      //caso de erro ,manda msg de erro
      if (error){
        //ENVIAR STATUS DE ERRO
        res.status(400).send({
          "msg": "Error, something went wrong"
      });
      //PRINTAR NA CONSOLA ERRO
        return console.error(error);
      }else{
      //CASO DE CERTO , PRINTAR ERRO E MANDAR O ERRO
      console.log(result);
      res.send(result);
      }
  });
}

//FUNÇÃO PARA DEVOLVER TODOS OS VALORES DO SUPPLIER
function GetSuppliers(req, res) {
  connect.con.query('SELECT iae.supplier.designation, iae.supplier.supplier_id FROM iae.supplier' , function(error, result){
    //caso de erro ,manda msg de erro
      if (error){
        //ENVIAR STATUS DE ERRO
        res.status(400).send({
          "msg": "Error, something went wrong"
      });
      //PRINTAR NA CONSOLA ERRO
        return console.error(error);
      }else{
      //CASO DE CERTO , PRINTAR ERRO E MANDAR O ERRO
      console.log(result);
      res.send(result);
      }
  });
}
//FUNCAO PARA INSERIR NO ORDERED_PRODUCTS
function InsertOrdered(req,res){
  //IR BUSCAR OS DADOS
  const order_id=req.body.order_id;
  const description=req.body.description;
  const quantity=req.body.quantity;
  const unit_price=req.body.unit_price;
  const total=req.body.total;
  //INSERIR AQUI OS DADOS
  var post = {
    order_id:order_id,
    description:description,
    quantity:quantity,
    unit_price:unit_price,
    total:total
};
//CONEXAO
query=connect.con.query('INSERT INTO iae.ordered_product SET ?',post,function(err,rows,fields){
console.log(query.sql);
if(!err){
  res.status(200).location(rows.insertedId).send(
    {
      "msg": "Inserted with success"
    }
  );
  console.log("Number of records inserted: "+rows.affectedRows);
}else{

if(err.code=="ER_DUP_ENTRY"){

  res.status(409).send({"msg": err.code});
  console.log('Error while performing Query.', err);


} else res.status(400).send({"msg": err.code});


}

});

}
module.exports = {
    read: read,
    OrderProductByID: OrderProductByID,
    GetSuppliers: GetSuppliers,
    InsertOrdered: InsertOrdered,
}