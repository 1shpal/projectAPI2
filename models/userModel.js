const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    favPackages: [
        {
            type: Schema.Types.ObjectId,
            ref: "packages"
        }
    ],
    favItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "items"
        }
    ]
    // isBlocked: {
    //     type: Boolean,
    //     default: false,
    // }
    ,
    isVerified : {
        type : Boolean,
        default : false
    }

});

module.exports = mongoose.model("users", userSchema);

