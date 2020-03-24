const express = require('express');
const router = express.Router();

//Models
const Movie = require("../models/movie.js");

router.get('/', (req, res, next) => {
	res.json({statu:1});
});
router.post('/createMovie',(req,res,next) => {
	const {title,category,country,year,imdb_score} = req.body;
	const createMovie = new Movie(req.body);

	const promise = createMovie.save();
	promise.then((data) => {
		res.json(`${title} adlı film başarıyla kayıt edildi.`);
	}).catch((error) => {
		res.json(error);
	});
});

module.exports = router;
