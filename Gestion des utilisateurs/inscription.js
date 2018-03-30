var express = require('express');

var nodemailer = require('nodemailer');

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
	response.render('inscription', {qs: request.query});
	
});

app.post('/', urlencodedParser, function(request, response) {
	response.render('inscriptionReussie', {data: request.body});
	var sql = "INSERT INTO Utilisateur (prenom, nom, adresse, mail, password, conf_password) VALUES (?, ?, ?, ?, ?, ?)";
	if ((/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(request.body.mail)) && (request.body.prenom.length >= 3) && (request.body.nom.length >= 2) && (request.body.address.length >= 3) && (request.body.passwd.length >= 8) && (request.body.passwd === request.body.passwdConf)) {
	    var query = connection.query(sql, [request.body.prenom, request.body.nom, request.body.address, request.body.mail, request.body.passwd, request.body.passwdConf], function(err, result){
			if (err) return console.log(err);
			// console.log(result);
			let transporter = nodemailer.createTransport({
			    host: 'smtp.gmail.com',
			    port: 587,
			    secure: false, // true for 465, false for other ports
			    auth: {
			        user: '',
			        pass: ''
			    }
			});

			// setup email data with unicode symbols
			let mailOptions = {
			    from: 'L\'équipe Fadju', // sender address
			    to: request.body.mail, // list of receivers
			    subject: 'Hello', // Subject line
			    text: 'Bienvenue sur notre plateforme', // plain text body
			    // html: '<b>Hello world?</b>' html body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
			    if (error) {
			        return console.log(error);
			    }
			    console.log('Message sent: %s', info.messageId);
			    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			});
		});
	} else {
		console.log('Veuillez vérifier les informations saisies');
	}
});

app.listen(8080);