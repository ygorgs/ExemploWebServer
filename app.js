var app = require('./app_config.js');

var userController = require('./controller/userController.js');

var validator = require('validator');



app.get('/' , function(req, res){

	res.end('Servidor ON!');

});

app.get('/pkmns' , function(req, res){
	
	userController.list(function(resp){
		res.json(resp);
	});
}); 

app.get('/pkmn/:id' , function(req, res){
	
	var id = validator.trim(validator.escape(req.param('id')));

	userController.get(id, function(resp){
		res.json(resp);
	});
}); 

app.post('/pkmn' , function(req, res){

	var name = validator.trim(validator.escape(req.param('name')));
	var type = validator.trim(validator.escape(req.param('type')));
	var password = validator.trim(validator.escape(req.param('password')));

	userController.save(name, type, password, function(resp){
		res.json(resp);
	});
});

app.put('/pkmn' , function(req, res){

	var id = validator.trim(validator.escape(req.param('id')));
	var name = validator.trim(validator.escape(req.param('name')));
	var type = validator.trim(validator.escape(req.param('type')));
	var password = validator.trim(validator.escape(req.param('password')));

	userController.update(id, name, type, password, function(resp){
		res.json(resp);
	});
}); 

app.delete('/pkmn/:id', function(req, res){
	var id = validator.trim(validator.escape(req.param('id')));

	userController.delete(id, function(resp){
		res.json(resp);
	})
});