var mysql = require('mysql');
var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'bar',
  password  : 'baz',
  database  : 'foo_db',
  port      : 3306
});

connection.connect();

connection.query('SELECT * FROM drinks', (error, results, fields) => {
  if (error) throw error;
  console.log('My data: ' + JSON.stringify(results));
});

connection.end()
