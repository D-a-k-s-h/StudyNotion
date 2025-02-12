const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
        type:String
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true
    },
    profession:{
        type:String
    }
});

module.exports = new mongoose.model("Profile",profileSchema);