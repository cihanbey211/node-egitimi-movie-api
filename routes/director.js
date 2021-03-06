const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Models
const Director = require("../models/director");
router.post('/',(req,res,next) => {
	const {name,surname} = req.body;
	const createDirector = new Director(req.body);
	const promise = createDirector.save();
	promise.then((data) => {
		if (!data)
			next({message: "Ekleme işlemi başarısız", code:23});
		else
			res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});
router.get('/:director_id',(req,res,next) => {
	const promise = Director.aggregate([
	{
		$match: {'_id': mongoose.Types.ObjectId(req.params.director_id)}
	},
	{
		$lookup: {
			from: "movies",
			localField: "_id",
			foreignField: "director_id",
			as: "movies"
		}
	},
	{
		$unwind: {
			path: "$movies",
			preserveNullAndEmptyArrays: true
		}
	},
	{
		$group: {
			_id: {
				_id: '$_id',
				name: '$name',
				surname: '$surname'
			},
			movies:{
				$push: '$movies'
			}
		}
	},
	{
		$project: {
			id: '$_id.id',
			name: '$_id.name',
			surname: '$_id.surname',
			movies: '$movies'
		}
	}
	]).allowDiskUse(true);
	promise.then((data) => {
		if(!data)
			next({message:"Yönetmen bulunamadı", code:18});
		else
			res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});
router.get('/',(req,res,next) => {
	const promise = Director.aggregate([
	{
		$lookup: {
			from: "movies",
			localField: "_id",
			foreignField: "director_id",
			as: "movies"
		}
	},
	{
		$unwind: {
			path: "$movies",
			preserveNullAndEmptyArrays: true
		}
	},
	{
		$group: {
			_id: {
				_id: '$_id',
				name: '$name',
				surname: '$surname'
			},
			movies: {
				$push : '$movies'
			}
		}
	},
	{
		$project: {
			_id: '$_id.id',
			name : '$_id.name',
			surname: '$_id.surname',
			movies: '$movies'
		}
	},
	{
		$sort: {
			name: 1
		}
	}
	]).allowDiskUse(true);
	promise.then((data) => {
		if (!data)
			next({message:"Yönetmen bulunamadı!",code:24});
		else
			res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});
router.put('/:director_id',(req,res,next) => {
	const promise = Director.findByIdAndUpdate(req.params.director_id,req.body,{new: true});
	promise.then((data) => {
		if (!data)
			next({message:"Yönetmen bulunamadı!",code:22});
		else
			res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});
router.delete('/:director_id',(req,res,next) => {
	const promise = Director.findByIdAndRemove(req.params.director_id);
	promise.then((data) => {
		if (!data)
			next({message: "Yönetmen bulunamadı!",code:22});
		else
			res.json({message: "İşlem başarıyla gerçekleştirildi",code:26});
	}).catch((error) => {
		res.json(error);
	});
});
module.exports = router;