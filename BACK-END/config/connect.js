//LIGAÇÃO Á BASE DE DADOS
const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : '2.83.78.5',
		user     : 'root',
		password : '12341234',
		database : 'iae',
    port     : '3307'
	})
};