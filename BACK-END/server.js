//Starter version of the main app.js file
"use strict";
var bodyParser = require('body-parser');
var Moloni = require('moloni');
const express = require("express");
const app = express();
const port = process.env.port || 4444;

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
};
require('./routes/products_route.js');
require('./routes/users_route');
require('./routes/customer_route');