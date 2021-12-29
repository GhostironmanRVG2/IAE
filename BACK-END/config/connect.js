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
>>>>>>> 2924839b9bb4a4584f92eb5413c5cbe6b8602cc0
		database : 'iae',
    port     : '3307'
	})
};