const mongoose = require("../config/mongodb");

const categorySchema = new mongoose.Schema({
    name:String
})

module.exports = mongoose.model("categories", categorySchema)