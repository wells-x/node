var mysql = require('mysql');
var pool  = mysql.createPool({
	connectionLimit : 10,
	host            : 'localhost',
	user            : 'root',
	password        : '123456',
	database        : 'test'
});



pool.getConnection(function(err, connection) {
	connection.query( 'SELECT * FROM test', function(err, rows) {
		// console.log(rows);
		connection.release();
	});
});
