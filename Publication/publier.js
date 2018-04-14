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

app.listen(8080);

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('publication', {qs: request.query});
	
});

app.post('/', urlencodedParser, function(request, response) {
	response.render('publicationReussie', {data: request.body});
	var sql = "INSERT INTO Demande (maladie, cout, besoins, date) VALUES (?, ?, ?, NOW())";
	var query = connection.query(sql, [request.body.maladie, request.body.cout, request.body.besoins], function(err, result){
		if (err) return console.log(err);
	});
	if ((request.body.maladie.length >= 5) && (request.body.besoins.length >= 30)) {
	    console.log('Done');
	} else {
		console.log('Veuillez vérifier les informations saisies');
	}
});