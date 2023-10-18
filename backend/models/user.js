const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    Name:{
        type: String
    },
    Age: {
        type: Number
    },
    profileImage: {
        type: String
    }
})

module.exports = mongoose.model("user", UserSchema)