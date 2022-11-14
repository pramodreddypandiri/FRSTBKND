const mongoose = require('mongoose')
const { Schema } = mongoose;
// creating user schema with all fields
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null

    },
    lastname: {
        type: String,
        default: null

    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})
// export the model
module.exports = mongoose.model("user", userSchema);
