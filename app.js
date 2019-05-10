// Création de notre API REST
const express = require('express');
const app = express();
const api = require('./api/v1/index'); // pour récupérer notre index.js
const cors = require('cors');
const bodyParser = require('body-parser');
// pour nous connecter à mongodb
const mongoose = require('mongoose');
const connection = mongoose.connection;

// c'est comme ça que notre appli va écouter sur le port 3000
app.set('port', (process.env.port || 3000));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// création de notre middleware
// si le next() est oublié, et bien on atteindra jamais le prochain app.use (ça va faire suater la chaine de traitement)
// app.use((req, res, next) => {
//     console.log(`req handled at ${new Date()}`)
//     next();
// })
app.use('/api/v1', api); // localhost:3000/api/v1
// si on atteind ce middleware, et bien ça signifie qu'on a jamais recupérer nos données dans index.jss
app.use((req, res) => {
	const err = new Error('404 - Not found !!!!!');
	err.status = 404;
	res.json({ msg: '404 - not found !!!!', err: err });
});

// pour la connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/listavatars', { useNewUrlParser: true });

connection.on('error', (err) => {
	console.error(`connection to MongoDB error: ${err.message}`); // eslint-disable-line no-console
});

connection.once('open', () => {
	console.log('Connected to MongoDB'); // eslint-disable-line no-console

	app.listen(app.get('port'), () => {
		console.log(`Express server listening on port ${app.get('port')}`);// eslint-disable-line no-console
	});
});


