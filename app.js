var express = require('express')

var app = express();

var bodyParser = require('body-parser');

var db_string = 'mongodb://127.0.0.1/exemplowebservice'

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

var validator = require('validator');

var Pokemon;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

db.once('open', function(){
	var userSchema = mongoose.Schema({
		name: String,
		type: String,
		password: String,
		created_at: Date
	});

	Pokemon = mongoose.model('Pokemon', userSchema);
});

app.listen(5000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extend: true
}));

app.get('/' , function(req, res){

	res.end('Servidor ON!');

});

app.get('/pkmns' , function(req, res){
	
	Pokemon.find({}, function(error, pkmns){
		if (error) {
			res.json({error: 'Não foi possivel retornar os pokemons'});
		}else{
			res.json(pkmns);
		}
	});
}); 

app.get('/pkmn/:id' , function(req, res){
	
	var id = validator.trim(validator.escape(req.param('id')));

	Pokemon.findById(id, function(error, pkmn){
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

	Pokemon.findById(id, function(error, pkmn){
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

	Pokemon.findById(id, function(error, pkmn){
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