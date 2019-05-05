const mongoose = require('mongoose');

const listavatarSchema = new mongoose.Schema({
	id: String,
	name: String,
	tel: String,
	image: String,
	content: String,
	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listavatar', listavatarSchema);