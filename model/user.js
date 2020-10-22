const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate : { type: Date, default: Date.now() }
})

module.export = mongoose.model("User" , UserSchema)