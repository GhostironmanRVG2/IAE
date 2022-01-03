//Starter version of the main app.js file
"use strict";
var bodyParser = require('body-parser');
var Moloni = require('moloni');
const express = require("express");
const app = express();
const port = process.env.port || 4444;
const expressSanitizer = require('express-sanitizer');
const expressValidator = require('express-validator');


//CREDENCIAIS DO MOLONI
var moloni = new Moloni({
	client_id: 'topbikes',
	client_secret: 'a28c743e71a4008ee3b499ed9d5ae73301e3529e',
	username: 'a87975@alunos.uminho.pt',
	password: 'TopBikes'
});


//USAR BODY PARSER NA NOSSA APP DE EXPRESS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//SANITIZER
app.use(expressSanitizer());
app.use(expressValidator());
//COMECA O SERVER NA PORTA DITA
app.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});

//EXPORTAR OS MODULOS APP E O MOLONI
module.exports ={
  app: app,
  moloni: moloni,
  //connection: connection,
};


require('./routes/products_route.js');
require('./routes/users_route');
require('./routes/customer_route');
require('./routes/purchase_order_route');
require('./routes/pdf_route');
require('./routes/orders_route');
require('./routes/geo_locationroute');
require('./routes/company_route');