var app = require('./app_config.js');
var db = require('./db_config.js');

var validator = require('validator');



app.get('/' , function(req, res){

	res.end('Servidor ON!');

});

app.get('/pkmns' , function(req, res){
	
	db.Pokemon.find({}, function(error, pkmns){
		if (error) {
			res.json({error: 'Não foi possivel retornar os pokemons'});
		}else{
			res.json(pkmns);
		}
	});
}); 

app.get('/pkmn/:id' , function(req, res){
	
	var id = validator.trim(validator.escape(req.param('id')));

	db.Pokemon.findById(id, function(error, pkmn){
		if (error) {
			res.json({error: 'Não foi possivel retornar o pokemon'});
		}else{
			res.json(pkmn);
		}
	});
}); 

app.post('/pkmns' , function(req, res){

	var name = validator.trim(validator.escape(req.param('name')));
	var type = validator.trim(validator.escape(req.param('type')));
	var password = validator.trim(validator.escape(req.param('password')));

	new Pokemon({
		'name': name,
		'type': type,
		'password': password,
		'created_at': new Date()
	}).save(function(error, pkmn) {
		if (error) {
			res.json({error: 'Não foi possivel salvar'});
		}else{
			res.json(pkmn);
		}	
	});
});

app.put('/pkmn' , function(req, res){

	var id = validator.trim(validator.escape(req.param('id')));
	var name = validator.trim(validator.escape(req.param('name')));
	var type = validator.trim(validator.escape(req.param('type')));
	var password = validator.trim(validator.escape(req.param('password')));

	db.Pokemon.findById(id, function(error, pkmn){
		if(name){
			pkmn.name = name;
		}
		if(type){
			pkmn.type = type;
		}
		if(password){
			pkmn.password = password;
		}

		pkmn.save(function(error, user) {
			if (error) {
				res.json({error: 'Não foi possivel salvar'});
			}else{
				res.json(pkmn);
		}
		});		
	});
}); 

app.delete('/pkmn/:id', function(req, res){
	var id = validator.trim(validator.escape(req.param('id')));

	db.Pokemon.findById(id, function(error, pkmn){
		if (error) {
			res.json({error: 'Não foi possivel retornar o pokemon'});
		}else{
			pkmn.remove(function(error){
				if(!error){
					res.json({response: 'Pokemon excluido com sucesso'})
				}
			});
		}
	});
});