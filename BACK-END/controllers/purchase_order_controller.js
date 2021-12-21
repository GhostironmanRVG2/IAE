var qs = require('qs');
const {credit,http}=require('../authtoken/molonitoken');
const https=require('https');
const connect = require('../config/connect');

//FUNCAO PARA INSERIR OS DADOS NO MOLONI
function insert(req,res){
    //FUNCAO COM O CALLBACK
    credit(function(response){
    //IR BUSCAR PARAMETROS AO BODY
    const company_id = 205166; 
    const date= req.body.date;
    const expiration_date= req.body.expiration_date;
    const products=req.body.products;
    const supplier_id=req.body.supplier_id;

    //DADOS
    var post_data=  qs.stringify({
        company_id:  company_id ,
        date: date,
        expiration_date : expiration_date,
        document_set_id: 473163,
        customer_id: 57185941,
        status: 1,
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
        });

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
      




  });

  });
  getid.end();








      













        })
    
    });
    request.write(post_data);
    request.end();
    })
}


function getDoc(req,res){
    //FUNCAO COM O CALLBACK
    credit(function(response){
        const document_id = req.sanitize('document_id').escape();
    //DADOS
    var post_data=  qs.stringify({
        company_id:  205166 ,
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
        var output=[];
        //FAZER UM FOR PARA CORRER O DT
        for (let i = 0; i < dt.length; i++) {
          console.log(dt[i].document_id);
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








module.exports={
    insert: insert,
    getDoc: getDoc,
}