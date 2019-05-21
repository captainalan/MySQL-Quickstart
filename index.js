var mysql = require('mysql');
var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'bar',
  password  : 'baz',
  database  : 'foo_db',
  port      : 3306      // Default port for MySQL
});

connection.connect();

connection.query('SELECT * FROM drinks', (error, results, fields) => {
  if (error) throw error;
  console.log(JSON.stringify(results)); // Output JSON as string to console
});

connection.end()
