var express = require('express')

var app = express();

var bodyParser = require('body-parser');

app.listen(5000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extend: true
}));

app.get('/' , function(req, res){
	res.end('Servidor ON!');
});

app.get('/users' , function(req, res){
	res.json([
		{name: "Bulbasaur"},
		{name: "Charmander"},
		{name: "Squirtle"}
	]);
}); 

app.get('/users/:id' , function(req, res){
	
}); 

app.post('/users' , function(req, res){
	res.end('post users');
});

app.put('/users' , function(req, res){
	res.end('put users');
}); 

app.delete('/users/:id', function(req, res){
	res.end('delete users');
});