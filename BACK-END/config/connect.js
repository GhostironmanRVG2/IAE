//LIGAÇÃO Á BASE DE DADOS
const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : '2.83.78.5',
<<<<<<< HEAD
		user     : 'root',
		password : '12341234',
=======
		user     : 'database',
		password : 'Winx2021',
>>>>>>> dd9120a1255b109c7a7198c539398229fc2b3fe3
		database : 'iae',
    port     : '3307'
	})
};