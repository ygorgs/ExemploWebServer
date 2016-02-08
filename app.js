var express = require('express')

var app = express();

var bodyParser = require('body-parser');

app.listen(5000);

app.user(bodyParser.json());

app.use(bodyParser.urlencode({
	extend: true;
}));

app.get('/' , function(req, res){
	res.end('Servidor ON!');
});

app.get('/users' , function(req, res){
	
}); 

app.get('/users/:id' , function(req, res){
	
}); 

app.post('/users' , function(req, res){
	res.end('post users');
}); .gitignore

app.put('/users' , function(req, res){
	res.end('put users');
}); 

app.delete('/users/:id', function(req, res){
	res.end('delete users');
});