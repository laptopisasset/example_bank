const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    accountNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {versionKey: false})

module.exports = model("user", UserSchema)
