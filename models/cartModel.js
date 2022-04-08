const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new mongoose.Schema({
    userId : Schema.Types.ObjectId,
    packages : [
        {
            type : Schema.Types.ObjectId,
            ref : "packages"
        }
    ], 
    items : [
        {
            type : Schema.Types.ObjectId,
            ref : "items"
        }
    ],
});

module.exports = mongoose.model("carts",cartSchema)