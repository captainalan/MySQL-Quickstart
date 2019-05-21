var express = require('express');
var app = express();
var mysql = require('promise-mysql');

// Redirect root to our sole sole API endpoint
app.get('/', function(request, response) {
    response.redirect('/api/drinks');
});

// Uses Promise-based API
app.get('/api/drinks', function(request, response) {
    mysql.createConnection({
	host      : 'localhost',
	user      : 'bar',
	password  : 'baz',
	database  : 'foo_db',
	port      : 3306      // Default port for MySQL
    }).then(function(connection){
	var result = connection.query('SELECT * FROM drinks');
	connection.end();
	return result;
    }).then(function(rows){
	response.json(rows);
    });
});

app.listen(3000, function(){
    console.log("Listening on port 3000");
});
