const mongoose = require("mongoose");
module.exports = () => {
	mongoose.connect("mongodb://localhost:27017/movie-api",{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true});
	mongoose.connection.on("open",() => {
		console.log("Veritabanı bağlantısı başarıyla gerçekleştirildi.");
	});
	mongoose.connection.on("error",(error) => {
		console.log("Veritabanı bağlantısı başarısız. Hata : ",error);
	});
	mongoose.Promise = global.Promise;
};
