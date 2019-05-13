const mongoose = require('mongoose');

const listavatarsSchema = new mongoose.Schema({
	name: String,
	tel: String,
	image: String,
	content: String,
	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listavatars', listavatarsSchema);