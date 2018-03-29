var express = require('express');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Fadju'
});

connection.connect();

app = express();

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('authentication', {qs: request.query});
	
});

app.post('/', urlencodedParser, function(request, response) {
	response.render('authentif', {data: request.body});
	var sql = "SELECT mail, password FROM Utilisateur WHERE mail = ? AND password = ?";
	if ((/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(request.body.mail)) && (request.body.passwd.length >= 8)) {
	    var query = connection.query(sql, [request.body.mail, request.body.passwd], function(err, result, results){
		if (err) return console.log(err);
		console.log(request.body.mail);
		console.log(results[mail]);
	});
	} else {
		console.log('Login ou mot de passe incorrect');
	}
});

app.listen(8080);