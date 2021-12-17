//Starter version of the main app.js file
"use strict";
var bodyParser = require('body-parser');
var Moloni = require('moloni');
const express = require("express");
const app = express();
const port = process.env.port || 4444;
const expressSanitizer = require('express-sanitizer');
const expressValidator = require('express-validator');
const { createConnection } = require('net');


//CREDENCIAIS DO MOLONI
var moloni = new Moloni({
	client_id: 'winxgroup',
	client_secret: 'a8156283c4aa7866e1a2f8bf4737d0ca16e59af9',
	username: 'a92877@alunos.uminho.pt',
	password: 'winx2021'
});


//USAR BODY PARSER NA NOSSA APP DE EXPRESS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
module.exports = app;
require('./routes/orders_route');