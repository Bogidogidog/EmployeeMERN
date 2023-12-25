const mongoose = require("mongoose");

const { Schema } = mongoose;

const CompanyModel = new Schema({
   name: String,
});
module.exports = mongoose.model("Company", CompanyModel);


