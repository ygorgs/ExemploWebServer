var db_string = 'mongodb://127.0.0.1/exemplowebservice'

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

db.once('open', function(){
	var userSchema = mongoose.Schema({
		name: String,
		type: String,
		password: String,
		created_at: Date
	});

	exports.Pokemon = mongoose.model('Pokemon', userSchema);
});