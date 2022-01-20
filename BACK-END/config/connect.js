//LIGAÇÃO Á BASE DE DADOS
const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : '2.83.78.5',
		user     : 'miguel',
		password : 'Miguel0604#',
		database : 'iae',
    port     : '3307'
	})
};