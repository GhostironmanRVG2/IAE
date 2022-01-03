const NodeGeocoder = require('node-geocoder');
const geolib = require('geolib');
var qs = require('qs');
const {credit,http}=require('../authtoken/molonitoken');
const https=require('https');
const connect = require('../config/connect');
const { post } = require('request');

var options_geo = {
  provider: 'google',
  // Optionnal depending of the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyAZ9ZOzUtovxO0cbG4OVHAWRO2hv_Ja07g', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};


//FUNCAO PARA INSERIR OS DADOS NO MOLONI
function insert(req,res){
  //FUNCAO COM O CALLBACK
  credit(function(response){
    //IR BUSCAR PARAMETROS AO BODY
    const morada_cliente=req.body.morada_cliente;
    const morada_moloni=req.body.morada_moloni;
    const company_id = 209537; 
    const date= req.body.date;
    const expiration_date= req.body.expiration_date;
    const products=req.body.products;
    const supplier_id=req.body.supplier_id;
    const products_length=products.length;
//ADICIONAR ABA AQUI DO TRANSPORTES E ETC..
//BUSCAR COORDENADAS GEO
var geocoder = NodeGeocoder(options_geo);

    // Using callback
    geocoder.geocode(morada_cliente, function(err, response_morada_cliente) {
      geocoder.geocode(morada_moloni, function(err, response_morada_empresa){
        for (let i = 0; i < products_length; i++) {
          products.push({
            product_id: products[i].product_id,  
            name: products[i].name,
            qty:  products[i].qty,
            price: products[i].price,
            taxes: [{
              tax_id: 2361047,
              value: 23.0
            }]
          });
        }
        //DEPOIS DE CRIAR OS 2 OBJETOS NOVOS COM TAXAS FIXAS NOS ELIMINAMOS O NUMERO DE OBJETOS QUE TINHAMOS PRIMEIRO
        products.splice(0,products_length);
        var options_km=new URL('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+response_morada_cliente[0].latitude+' '+response_morada_cliente[0].longitude+'&destinations='+response_morada_empresa[0].latitude+' '+response_morada_empresa[0].longitude+'&key=AIzaSyAZ9ZOzUtovxO0cbG4OVHAWRO2hv_Ja07g');
        var request_km=https.request(options_km, function(response_k) {
          let response_km='';
          //RECEBER OS DADOS E ENVIAR PARA A CALLBACK
          response_k.on('data', function (chunk) {
            //ADICIONAR O CHUNK NA STRING
            response_km += chunk;
          });
          response_k.on('end', function() {
            var response_km_json=JSON.parse(response_km);
            //ADICIONAR ISTO AO ARRAY
            products.push({
              product_id:101381629,
              name:'Transporte km',
              qty: (response_km_json.rows[0].elements[0].distance.value/1000),
              price: 0.2926,
              taxes: [{
                tax_id: 2361047,
                value: 23.0
              }]
            });

            //DADOS
            var post_data=  qs.stringify({
              company_id:  company_id ,
              date: date,
              expiration_date : expiration_date,
              document_set_id: 473163,
              customer_id: 58637341,
              status: 1,
              products: products, 
            });

            console.log(post_data);

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
              });
              console.log(response);

              response.on('end', function() {
                //RESPOSTA NO FIM
                var newparse=JSON.parse(k);
                console.log(newparse);
                //DADOS
                //POST DATA
                //TOTAL
                var total=0;
                for (let i = 0; i < products.length; i++) {
                  //TOTAL DE TUDO
                  total=total+(products[i].qty*products[i].price);
                }

                var posted=  qs.stringify({
                  supplier_id: supplier_id,
                  date:date ,
                  expire_date:expiration_date ,
                  total: total,
                  document_id: newparse.document_id,
                });

                //OPCOES PARA ESTA LIGACAO
                var options ={
                  'method': 'POST',
                  'hostname': '127.0.0.1',
                  'port': 4444,
                  'path': '/OrderPost',
                  'headers': {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Content-Length': posted.length
                  },
                  'maxRedirects': 20,
                };

                //INSERT ORDER
                var insert_order=http.request(options,function(response){
                  let l='';
                  //RECEBER OS DADOS E ENVIAR PARA A CALLBACK
                  response.on('data', function (chunk) {
                    //ADICIONAR O CHUNK NA STRING
                    l += chunk;
                  });

                  response.on('end', function() {
                    //RESPOSTA NO FIM
                    var inser_order_output=JSON.parse(l);
                  });
                });
                insert_order.write(posted);
                insert_order.end();
                var options_getid=new URL("http://localhost:4444/OrderIdGetByDocumentId/"+newparse.document_id);
                var getid=http.request(options_getid,function(response){
                  let p='';
                  //RECEBER OS DADOS E ENVIAR PARA A CALLBACK
                  response.on('data', function (chunk) {
                    //ADICIONAR O CHUNK NA STRING
                    p+= chunk;
                  });

                  response.on('end', function() {
                    //RESPOSTA NO FIM
                    var id_parse=JSON.parse(p);

                    //FAZER O POST DOS PRODUCTS
                    var posted_ordered=[];
                    for (let k = 0; k < products.length; k++) {
                      posted_ordered.push([id_parse[0].order_id,products[k].name,parseFloat(products[k].qty),parseFloat(products[k].price),products[k].qty*products[k].price]);
                    }
                    //SQL ARG
                    var sql = "INSERT INTO iae.ordered_product (order_id,description, quantity,unit_price,total) VALUES ?";      
                    //CONEXAO
                    query=connect.con.query(sql,[posted_ordered],function(err,rows,fields){
                      console.log(query.sql);
                      if(!err){
                        res.status(200).location(rows.insertedId).send(
                        {
                          "msg": "Inserted with success"
                        });
                        console.log("Number of records inserted: "+rows.affectedRows);
                      }else{
                        if(err.code=="ER_DUP_ENTRY"){
                          res.status(409).send({"msg": err.code});
                          console.log('Error while performing Query.', err);
                        } else res.status(400).send({"msg": err.code});
                      }
                    });
                  });
                });
                getid.end();
              })
            });
            request.write(post_data);
            request.end();
          }
        )});
        request_km.end();     
      })
    });
  });
}





function getDoc(req,res){
  //FUNCAO COM O CALLBACK
  credit(function(response){
    const document_id = req.sanitize('document_id').escape();
    //DADOS
    var post_data=  qs.stringify({
      company_id: 209537,
    });

    //PASSAR OS ARGUMENTOS
    var options ={
      'method': 'POST',
      'hostname': 'api.moloni.pt',
      'path': '/v1/purchaseOrder/getAll/?access_token='+response.access_token,
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        "Accept-Charset":"utf-8"
      },
      'maxRedirects': 20,
      'transfer-encoding': ''
    };
    
    //INVOCAR METODO HTTP
    var request=http.request(options, function(response) {
      var k='';
      //RECEBER OS DADOS E ENVIAR PARA A CALLBACK
      response.on('data', function (chunk) {
        k+=chunk;
      });
         
      response.on('end', function() {
        //PEGAR NOS DADOS E PASSAR PARA JSON
        var dt = JSON.parse(k);
        //CRIAR VARIAVEL OUTPUT
        console.log(dt);
        var output=[];
        //FAZER UM FOR PARA CORRER O DT
        for (let i = 0; i < dt.length; i++) {
          //CASO OS IDS SEJAM IGUAIS INSERIR OBJETO DENTRO DO OUTPUT  
          if(document_id==(dt[i].document_id)){
            //COLOCA A VARIAVEL DENTRO DO ARRAY
            output.push(dt[i]);
          }   
        }
        //SE O OUTPUT FOR DIFERENTE DE 0
        if(output.length!=0){
          //MANDAR MSG AO PSEUDO ENGENHEIRO DA FRONT END
          try{
            //ENVIAR OUTPUT E SETAR STATUS PARA ACOMPLISH
            res.status(200);
            res.send(output);
          }catch(Exception){}
        }else{
          try{
            //ENVIAR MSG DE ERRO E SETAR STATUS PARA 400
            var empty=[{"msg":"Theres no document ids that match yours","cod":400}];
            res.status(400);
            res.send(empty);
          }catch(Exception){}
        }
      });
    });
    
    request.write(post_data)
    request.end();
  })
}



function update(req,res){
//FUNCAO QUE RETORNA O TOKEN DO MOLONI
credit(function(response_token){
  console.log(response_token);
  //IR BUSCAR DATA AO BODY
const date=req.sanitize('date').escape();
const expiration_date=req.sanitize('expiration_date').escape();
const products=req.body.products;
const status=req.sanitize('status').escape();

   //DADOS A INSERIR
    var post_data=  qs.stringify({
      company_id:  209537 ,
      date: date,
      expiration_date: expiration_date,
      document_set_id: 473163,
      customer_id: 58637341,
      products: products,
      status: status
    });
//CRIAR OPCOES DE LIGACAO DO HTTP REQUEST
var options_update ={
  'method': 'POST',
  'hostname': 'api.moloni.pt',
  'path': '/v1/purchaseOrder/update/?access_token='+response_token.access_token,
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': post_data.length,
    "Accept-Charset":"utf-8"
  },
};

 //METODO HTTP PARA LIGAR AO MOLONI
 var update=http.request(options_update, function(response) {
  var moloni_update_response='';
  //RECEBER OS DADOS E ENVIAR PARA A CALLBACK
  response.on('data', function (chunk) {
    moloni_update_response+=chunk;
  });
  //RESPOSTA NO FINAL   
  response.on('end', function() {
    //PEGAR NOS DADOS E PASSAR PARA JSON
    var json_moloni_res=JSON.parse(moloni_update_response);
    console.log(json_moloni_res);
    res.send(json_moloni_res);
  });

});
update.write(post_data);
update.end();


});
}





module.exports={
  insert: insert,
  getDoc: getDoc,
  update: update,
}