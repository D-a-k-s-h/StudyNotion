const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    timeDuration:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    videoURL:{
        type:String,
        required:true
    }
});

module.exports = new mongoose.model("SubSection",subSectionSchema);