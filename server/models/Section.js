const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
        required:true
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
});

module.exports = new mongoose.model("Section",sectionSchema);