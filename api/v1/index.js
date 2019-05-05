const express = require('express');
const router = express.Router();
const Listavatar = require('../models/blogpost');
const mongoose = require('mongoose');


// permet juste quand on fera locahost:3000/api/v1/ping de nous dire que tous va bien, avec le message "pong"
router.get('/ping', (req, res) => {
	res.status(200).json({ msg: 'pong', date: new Date()});
});// localhost:3000/api/v1/ping

// route qui permet de récupérer tous les avatars
router.get('/list-avatars', (req,res) => {
	Listavatar.find()
		.then(listAvatars => res.status(200).json(listAvatars))
		.catch(err => res.status(500).json({
			message: 'list avatars not found :(',
			error: err
		}));
});// localhost:3000/api/v1/list-avatars


// obligatoire : body-parser, route qui permet d'ajouter un avatar
router.post('/list-avatars', (req, res) => {
	console.log('req.body', req.body);
	const listAvatar = new Listavatar(req.body);
	listAvatar.save((err, listAvatar) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(201).json(listAvatar);
	});
});

// route pour récupérer un id
router.get('/list-avatars/:id', (req, res) => {
	const id = req.params.id;
	Listavatar.findById(id)
		.then(listAvatar => res.status(200).json(listAvatar))
		.catch(err => res.status(500).json({
			message: `avatar with id ${id} not found`,
			error: err
		}));
});

// route pour la supression d'un seul id à la fois
router.delete('/list-avatars/:id', (req, res) => {
	const id = req.params.id;
	Listavatar.findByIdAndDelete(id, (err, listAvatar) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(202).json({ msg: `avatar with id ${listAvatar._id} deleted`});
	});
}); // DELETE http://localhost:3000/api/v1/list-avatars/:id


// route pour la suppression de plusieurs ID à la fois
router.delete('/list-avatars', (req, res) => {
	const ids = req.query.ids;
	console.log('query ids', ids);
	const allIds = ids.split(',').map(id => {
		if(id.match(/^[0-9a-fA-F]{24}$/)) {
			return mongoose.Types.ObjectId((id));
		} else {
			console.log('id is not valid', id);
		}
	});
	const condition = { _id: { $in: allIds } };
	Listavatar.deleteMany(condition, (err, result) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(202).json(result);
	}); // { nb: 2, ok= true }
}); // DELETE http://localhost:3000/api/v1/list-avatars?ids=a1z2e3,q1s2


module.exports = router; // pour le récupérer dans notre app.js