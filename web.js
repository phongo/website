// module dependencies
var express = require('express');
var http = require('http');
var mysql =  require('mysql');

var app = express();

var connection =  mysql.createConnection({
	host : "localhost",
	user : "cchao93",
	password: "foo"
});

connection.connect();
connection.query("use phongo");

// all environments
app.set('port', process.env.PORT || 3000);

var strQuery = "SELECT price FROM menu WHERE name = 'Ocean Treasure'";	

app.get('/test', function (req, res) {
	connection.query(strQuery, function(err, rows){
  		if (err) {
  			throw err;
  		} else {
  			console.log(rows);
  			res.send(rows);
  		}
 	});
});

//connection.destroy();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});