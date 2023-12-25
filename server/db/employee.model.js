const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
	name: String,
	level: String,
	position: String,
	equipment: String,
	favoritebrand: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FavoriteBrand",
	},
	attendance: {
		type: Boolean,
		default: false,
	},
	company:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company",
	},
 
	created: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Employee", EmployeeSchema);
