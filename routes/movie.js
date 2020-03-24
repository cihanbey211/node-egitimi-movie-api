const express = require('express');
const router = express.Router();

//Models
const Movie = require("../models/movie.js");

router.get('/year/:startYear/:endYear',(req,res,next) => {
	const {startYear,endYear} = req.params;
	const promise = Movie.find({
		year: {'$gte': parseInt(startYear),'$lte':parseInt(endYear)}
	});
	promise.then((data) => {
		if (!data)
			res.json({message: "Bu tarihler arasında film bulunamadı!",code:20});
		else
			res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});
router.get('/top10',(req,res,next) => {
	const promise = Movie.find({}).limit(10).sort({imdb_score: -1});
	promise.then((data) => {
		res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});
router.get('/', (req, res, next) => {
	const promise = Movie.find({});
	promise.then((data) => {
		res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});
router.post('/',(req,res,next) => {
	const {title,category,country,year,imdb_score} = req.body;
	const createMovie = new Movie(req.body);

	const promise = createMovie.save();
	promise.then((data) => {
		res.json(`${title} adlı film başarıyla kayıt edildi.`);
	}).catch((error) => {
		res.json(error);
	});
});
router.delete('/:movie_id',(req,res,next) => {
	const promise = Movie.findByIdAndRemove(req.params.movie_id);
	promise.then((data) => {
		if (!data)
			next({message:"Film bulunamadı!",code:21});
		else
			res.send("Film silme işlemi başarılı");
	}).catch((error) => {
		res.json(error);
	});
});
router.put('/:movie_id',(req,res,next) => {
	const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new: true});
	promise.then((data) => {
		if(!data)
			next({message:"Film bulunamadı!",code:22});
		else
			res.json(data);
	}).catch((error) => {
		res.json(error);
	})
});
router.get('/:movie_id',(req,res,next) => {
	const promise = Movie.findById(req.params.movie_id);
	promise.then((data) => {
		if (!data)
			next({message:"Film bulunamadı!",code:23});
		else
			res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});

module.exports = router;
