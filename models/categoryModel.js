const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    catname:String,
    catImage:String
})

module.exports = mongoose.model("categories",categorySchema);