const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title:{
		type: String,
		required: true,
		unique: true
	},
	category: String,
	country: String,
	year: Number,
	imdb_score: Number,
	director_id: {
		type: Schema.Types.ObjectId,
		required: true
	},
	createdData: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("movie", movieSchema);