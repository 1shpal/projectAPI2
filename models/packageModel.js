const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new mongoose.Schema({
    packageName:{
        type:String,
        required:true
    },
    packagePrice:{
        type:Number,
        required:true
    },
    packageQty:{
        type:Number,
        required:true
    },
    packageDesc:{
        type:String,
        required:true
    },
    packageImage:{
        type:String,
        required:true
    },
    packageDay:String,
    packageCategoryId:{
        type:Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("packages",packageSchema)