const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

//Models
const userModel = require("../models/user");

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});
router.post('/register',(req,res,next) => {
	const {username,password} = req.body;
	bcrypt.hash(password,10).then((hash) => {
		const createUser = new userModel({
			username,
			password:hash
		});
		const promise = createUser.save();
		promise.then((data) => {
			if (!data)
				res.send("Kayıt işlemi başarısız");
			else
				res.json(data);
		}).catch((error) => {
			res.json(error);
		});
	});
});
router.post('/getToken',(req,res,next) => {
	const {username,password} = req.body;
	const promise = userModel.findOne({username});
	promise.then((data) => {
		bcrypt.compare(password,data.password).then((result) => {
			if (result) {
				const payload = {username,password};
				const token = jwt.sign(payload, req.app.get('api_secret_key'));
				res.json({
					statu: true,
					username,
					password,
					token
				});
			} else {
				res.send("Hatalı şifre girildi.");
			}
		});
	}).catch((error) => {
		res.send("Kullanıcı bulunamadı!");
	});
});
module.exports = router;
