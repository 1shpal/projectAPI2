const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    itemName:String,
    itemQty:Number,
    itemPrice:Number,
    itemDesc:String,
    itemImage:String,
    itemDay:String,
    itemcategoryId:{
        type:Schema.Types.ObjectId,
    }
});

module.exports = mongoose.model("items",itemSchema);