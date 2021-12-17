const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : '2.83.78.5',
		user     : 'database',
		password : 'Winx2021',
		database : 'iae',
    port     : '3307'
	})
};