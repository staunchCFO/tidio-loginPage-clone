const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    creationDate : { type: Date, default: Date.now() }
})

module.exports = mongoose.model("User" , userSchema)