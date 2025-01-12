const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");


exports.updateCourseProgress = async(req,res) => {
    try{
        const {courseId,subSectionId} = req.body;

        const userId = req.user.id;

        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found"
            })
        }

        const courseProgess = await CourseProgress.findOne(
            {
                courseId:courseId,
                userId:userId
            }
        )

        //check if entry exists
        if(!courseProgess){
            return res.status(404).json({
                success:false,
                message:"Course progress not found"
            })
        }
        else{
            //check wheather video is already marked as completed
            if(courseProgess.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success:false,
                    message:"Video already completed"
                })
            }
            else{
                //mark video as completed
                courseProgess.completedVideos.push(subSectionId);
            }
        }

        //save chenges
        await courseProgess.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"Video Completed"
        })

    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}