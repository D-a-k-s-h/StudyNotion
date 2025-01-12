const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const {uploadFileToCloudinary,convertSecondsToDuration} = require('../utils/imageUploader');
const Section = require('../models/Section');
const CourseProgress = require('../models/CourseProgress');
const SubSection = require('../models/SubSection');
require('dotenv').config();


exports.createCourse = async(req,res) => {
    try{
        //fetch data
        const {name,description,whatYouWillLearn,price,category,tag,instructions,status="Draft"} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnail;

        //validation
        if(!name || !description || !whatYouWillLearn || !price || !category || !thumbnail || !tag || !instructions){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        //check for instructor
        const userid = req.user.id;
        const instructorDetails = await User.findById(userid);
        console.log("Instructor Details -> ",instructorDetails);
        //check whether userId is same as instructorDetails._id? => yes 

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor could not be fetched"
            })
        }

        //check for valid category or not
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Valid Category does not Exists"
            })
        }

        //upload thumbnail to cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create new course entry in database
        const newCourse = await Course.create({
            name:name,
            description:description,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            category:categoryDetails._id,
            instructor:userid,
            thumbnail:thumbnailImage.secure_url,
            tag:tag,
            instructions:instructions,
            status:status
        })

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate({_id:userid},{$push:{courses:newCourse._id}},{new:true});
        
        //update the category schema
        await Category.findByIdAndUpdate({_id:categoryDetails._id},{$push:{course:newCourse._id}},{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse
        })
         
    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get all courses
exports.getAllCourses = async(req,res) => {
    try{
        const allCourse = await Course.find({},{
            name:true,
            description:true,
            price:true,
            thumbnail:true,
            studentsEnrolled:true,
            instructor:true,
            courseContent:true,
            status:true,
            createdAt:true,
            whatYouWillLearn:true
        })  

        //return response
        return res.status(200).json({
            success:true,
            message:"Data fetched successfully for all courses",
            data:allCourse
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't get courses, please try again"
        })
    }
}

exports.getAllDetails = async(req,res) => {
    try{
        //retrieve data
        const {courseId} = req.body;

        //console.log(courseId);

        //fetch details
        const courseDetails = await Course.findById(courseId)
                                            .populate({
                                                path:"instructor",
                                                populate:{path:"additionalDetails"}
                                            })
                                            .populate("category")
                                            .populate("ratingAndReview")
                                            .populate({
                                                path:"courseContent",
                                                populate:{path:"subSection"}
                                            }).exec();
        
        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`course details could not be fetched with id:${courseId}`
            })
        }

        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId
        })

        //console.log("courseProgressCount -> ",courseProgressCount);

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += totalDurationInSeconds;
            })
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        //return response
        return res.status(200).json({
            success:true,
            message:"Details fetched successfully",
            data:{
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                ? courseProgressCount?.completedVideos
                : []
            }
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteCourse = async(req,res) => {
    try{
        const {courseId} = req.body;

        const courseDetails = await Course.findById(courseId);

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Course Is Invalid"
            })
        }

        //delete the course from user's courses array
        const studentsEnrolled = courseDetails.studentsEnrolled;
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId,{$pull:{courses:courseId}});
        }

        //delete sections and sub-sections as well
        const courseSections = courseDetails.courseContent;
        for(const sectionId of courseSections){
            //delete sub-sections
            const section = await Section.findById(sectionId);
            if(section){
                const subSections = section.subSection;
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }

            //delete the section
            await Section.findByIdAndDelete(sectionId);
        }

        //delete course from category as well
        const categoryDetails = await Category.findByIdAndUpdate(courseDetails.category,{$pull:{course:courseId}},{new:true});

        if(!categoryDetails){
            return res.status(400).json({
                success:false,
                message:"Cannot delete course from category"
            })
        }

        //delete the course
        await Course.findByIdAndDelete(courseId,{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Deleted Successfully"
        })

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateCourse = async(req,res) => {
    try{
        const {courseId,name,description,tag,whatYouWillLearn,category,instructions,price,status} = req.body;

        const updatedCourse = await Course.findById(courseId).populate({path:"courseContent",populate:{path:"subSection"}});

        if(!updatedCourse){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }

        if(name !== undefined){
            updatedCourse.name = name
        }
        if(description !== undefined){
            updatedCourse.description = description
        }
        if(price !== undefined){
            updatedCourse.price = price
        }
        if(whatYouWillLearn !== undefined){
            updatedCourse.whatYouWillLearn = whatYouWillLearn
        }
        if(tag !== undefined){
            updatedCourse.tag = tag
        }
        if(category !== undefined){
            updatedCourse.category = category
        }
        if(instructions !== undefined){
            updatedCourse.instructions = instructions
        }
        if(status !== undefined){
            updatedCourse.status = status;
        }

        if(req.files && req.files.thumbnail !== undefined){
            const thumbnail = req.files.thumbnail;
            const response = await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME);

            updatedCourse.thumbnail = response.secure_url;
        }

        //save changes
        await updatedCourse.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"Course updated successfully",
            data:updatedCourse
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Cannot update course",
            error:error
        })
    }
}

exports.getInstructorCourses = async(req,res) => {
    try{
        const instructorId = req.user.id;
        const instructorCourses = await Course.find({instructor:instructorId}).sort({createdAt:-1});

        if(!instructorCourses){
            return res.status(404).json({
                success:false,
                message:"instructor course not found"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Instructor courses fetched successfully",
            data:instructorCourses
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"could not fetch instructor courses",
            error:error
        })
    }
}

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
