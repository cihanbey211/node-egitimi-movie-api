const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema({
	name: {
		type: String,
		require: true
	},
	surname: {
		type: String,
		require: true
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("director",directorSchema);