const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title:{
		type: String,
		required: true,
		unique: [true,"Aynı isimde filmler kayıt edilemez, {VALUE} adında bir film kayıtlıdır."]
	},
	category: String,
	country: String,
	year: Number,
	imdb_score: Number,
	director_id: Schema.Types.ObjectId,
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("movie", movieSchema);