const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number
    },
    review:{
        type:String,
        trim:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
        ref:"Course"
    }
});

module.exports = new mongoose.model("RatingAndReview",ratingAndReviewSchema);