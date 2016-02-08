var db = require('../db_config.js');

exports.list = function(callback){

	db.Pokemon.find({}, function(error, pkmns){
		if (error) {
			callback({error: 'Não foi possivel retornar os pokemons'});
		}else{
			callback(pkmns);
		}
	});
};

exports.get = function(id, callback){

	db.Pokemon.findById(id, function(error, pkmn){
		if (error) {
			callback({error: 'Não foi possivel retornar o pokemon'});
		}else{
			callback(pkmn);
		}
	});
};

exports.save = function(name, type, password, callback){

	new db.Pokemon({
		'name': name,
		'type': type,
		'password': password,
		'created_at': new Date()
	}).save(function(error, pkmn) {
		if (error) {
			callback({error: 'Não foi possivel salvar'});
		}else{
			callback(pkmn);
		}	
	});
};

exports.update = function(id, name, type, password, callback){

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
				callback({error: 'Não foi possivel salvar'});
			}else{
				callback(pkmn);
		}
		});		
	});
};

exports.delete = function(id, callback){

	db.Pokemon.findById(id, function(error, pkmn){
		if (error) {
			callback({error: 'Não foi possivel retornar o pokemon'});
		}else{
			pkmn.remove(function(error){
				if(!error){
					callback({response: 'Pokemon excluido com sucesso'})
				}
			});
		}
	});
};