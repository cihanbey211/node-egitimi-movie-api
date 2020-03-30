const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username:{
		type: String,
		require: true,
		unique: true,
		maxlength: [100,"{PATH} en fazla 100 karakter girilebilir"]
	},
	password: {
		type: String,
		require: true,
		maxlength: [100,"{PATH} en fazla 100 karakter girilebilir"]
	}
});

module.exports = mongoose.model("user",userSchema);