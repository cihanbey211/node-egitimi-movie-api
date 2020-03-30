const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
	const token = req.headers['x-access-token'] || req.body.token || req.query.token;
	if (token) {
		jwt.verify(token,req.app.get("api_secret_key"),(error,decoded) => {
			if(error){
				res.json({
					statu: false,
					message: "Bir hata meydana geldi."
				});
			} else {
				req.decode = decoded;
				next();
			}
		});
	} else {
		res.json({
			statu: false,
			message: "Token bulunamadı!"
		});
	}
};