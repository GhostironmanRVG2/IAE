const connect = require('../config/connect');
const purchase_order_controller = require('./purchase_order_controller');
function read(req, res) {
    connect.con.query('SELECT iae.order.order_id, iae.order.supplier_id, iae.order.date, iae.order.expire_date, iae.order.total, iae.order.document_id, iae.supplier.designation FROM iae.order join iae.supplier ON iae.order.supplier_id = iae.supplier.supplier_id;' , function(error, result){
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

/*
function readID(req, res) {
    const order_id = req.sanitize('order_id').escape();
    connect.con.query('SELECT iae.order.')
}
*/

module.exports = {
    read: read
}