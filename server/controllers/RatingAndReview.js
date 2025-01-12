const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');

//create rating and revirew
exports.createRating = async(req,res) => {
    try{
        //get userId
        const userId = req.user.id;

        //get data for rating and review
        const {rating, review, courseId} = req.body;

        //check if user is enrolled in course or not
        const courseDetails = await Course.findOne({_id:courseId,
            studentsEnrolled: {$elemMatch: {$eq:userId}}
        });

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in course"
            })
        }

        //check if user has already rated or not
        const alreadyreviewed = await RatingAndReview.findOne({user:userId,course:courseId});

        if(alreadyreviewed){
            return res.status(403).json({
                success:false,
                message:"Student has already rated/reviewed"
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            user:userId,
            rating:rating,
            review:review,
            course:courseId
        });

        //update rating and review array in course
        await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReview:ratingReview._id}},{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully",
            data:ratingReview
        })
         
    } catch(error){
        return res.status(500).json({
            success:false,
            message:error,message
        })
    }
}

//get average rating and review 
exports.getAverageRating = async(req,res) => {
    try{
        //get course id
        const {courseId} = req.body;

        //calculate average rating
        const result = await RatingAndReview.aggregate(
            [
                //step1
                {
                    $match:{
                        course: new mongoose.Schema.Types.ObjectId(courseId)
                    }
                },
                //step2
                {
                    $group:{
                        _id:null,
                        averageRating: {$avg: "$rating"}
                    }
                }
            ]
        )

        //return response
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating
            })
        }

        //if no rating/review is given
        return res.json({
            success:false,
            message:"No Ratings/Reviews are given till now",
            averageRating:0
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't get average rating"
        })
    }
}

//get all rating and reviews
exports.getAllReview = async(req,res) => {
    try{
        //find all ratings and reviews
        const allReview = await RatingAndReview.find({}).populate({path:"user",select:"firstName lastName email image"})
                                                        .populate({path:"course",select:"name"}).exec();

        //validate
        if(!allReview){
            return res.status(500).json({
                success:false,
                message:"Cannot get reviews"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            data:allReview,
            message:"All Reviews Fetched Successfully"
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching ratings and reviews"
        })
    }
}

//course specific
exports.getCourseSpecificRating = async(req,res) => {
    try{
        //get course id
        const {courseId} = req.body;

        //get rating and review 
        const getDetails = await Course.findById(courseId,{ratingAndReview:true}).populate({path:"ratingAndReview",select:"rating review"}).exec();

        //validation
        if(!getDetails){
            return res.status(404).json({
                success:false,
                message:"could not fetch particular course"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Raing/Review Fetched Successfully for particular course",
            data:getDetails
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot get course specifuc rating/review"
        })
    }
}