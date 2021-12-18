const {moloni}=require('../server');
var querystring = require('querystring');
var qs = require('qs');
var assert = require('assert');
const {credit,http}=require('../authtoken/molonitoken');
const { body } = require('express-validator/check');
const { post } = require('request');
//FUNCAO PARA INSERIR OS DADOS NO MOLONI
function insert(req,res){
    //FUNCAO COM O CALLBACK
    credit(function(response){
    //IR BUSCAR PARAMETROS AO BODY
    const company_id = req.body.company_id; 
    const date= req.body.date;
    const expiration_date= req.body.expiration_date;
    const products=req.body.products;

    //DADOS
    var post_data=  qs.stringify({
        company_id:  company_id ,
        date: date,
        expiration_date : expiration_date,
        document_set_id: 473163,
        customer_id: 57185941,
        products: products, 
    });

    //PASSAR OS ARGUMENTOS
    var options ={
        'method': 'POST',
        'hostname': 'api.moloni.pt',
        'path': '/v1/purchaseOrder/insert/?access_token='+response.access_token,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
          },
          'maxRedirects': 20,
    };
    //INVOCAR METODO HTTP
    var k = '';
    var request=http.request(options, function(response) {
        //RECEBER OS DADOS E ENVIAR PARA A CALLBACK
        response.on('data', function (chunk) {
          //ADICIONAR O CHUNK NA STRING
          k += chunk;
          res.send(k);
        });
        
    });
    request.write(post_data);
    request.end();
    })
}

module.exports={
    insert: insert,
}