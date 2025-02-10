const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const { uploadFileToCloudinary, convertSecondsToDuration } = require('../utils/imageUploader');
const CourseProgress = require('../models/CourseProgress');
const Section = require('../models/Section');
require('dotenv').config();


//update the profile details if profile is already created
exports.updateProfile = async(req,res) => {
    try{
        //fetch details
        const {firstName,lastName,about,gender,dateOfBirth,profession} = req.body;

        //fetch user 
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        const profileDetails = await Profile.findById(userDetails.additionalDetails);

        //update profile
        if(firstName){
            userDetails.firstName = firstName;
        }
        if(lastName){
            userDetails.lastName = lastName;
        }
        if(about){
            profileDetails.about = about;
        }
        if(gender){
            profileDetails.gender = gender;
        }
        if(profession){
            profileDetails.profession = profession;
        }
        if(dateOfBirth){
            profileDetails.dateOfBirth = dateOfBirth;
        }

        await profileDetails.save();
        await userDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            data:profileDetails,
            user:userDetails
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}

//delete Account
exports.deleteAccount = async(req,res) => {
    try{
        //fetch user id
        const userId = req.user.id;

        //validate user id
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User is Invalid"
            })
        }

        //delete profile of user
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        //delete the user id from enrolled courses
        const courseDetails = userDetails.courses;
        courseDetails.forEach(async(element) => {
            await Course.findByIdAndUpdate(element,{$pull:{studentsEnrolled:userId}},{new:true})

            const courseData = await Course.findById(element).populate("courseContent").exec();
            //console.log("Course data ->",courseData);
            
            courseData.courseContent.forEach(async(section) => {
                const sectionData = await Section.findById(section._id).populate("subSection").exec();
                //console.log("Section Data -> ",sectionData);

                sectionData.subSection.forEach(async(subSection) => {
                    await CourseProgress.findByIdAndUpdate(userDetails.courseProgress,{$pull:{completedVideos:subSection._id}},{new:true});
                })
            })
        })

        //delete user account
        await User.findByIdAndDelete(userId);

        //return response
        return res.status(200).json({
            success:true,
            message:"Account will be deleted after 5 days"
        }) 

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//this will delete account after 5 days



exports.getAllUserDetails = async(req,res) => {
    try{
        //fetch user id
        const userId = req.user.id;

        //get the details
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"User's Data Fetched Successfully",
            data:userDetails
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getEnrolledCourses = async(req,res) => {
    try{
        const userId = req.user.id;

        let userDetails = await User.findById(userId,{courses:true}).populate({
                                                                            path:"courses",
                                                                            populate:{
                                                                                path:"courseContent",
                                                                                populate:{path:"subSection"}
                                                                            }
                                                                        }).exec();

        userDetails = userDetails.toObject();
        var subSectionLength = 0;
        for(var i=0;i<userDetails.courses.length;i++){
            let totalDurationInSeconds = 0;
            subSectionLength = 0;
            for(var j=0;j<userDetails.courses[i].courseContent.length;j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc,curr) => acc + parseInt(curr.timeDuration),0);

                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);

                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseId:userDetails.courses[i]._id,
                userId:userId
            })

            courseProgressCount = courseProgressCount?.completedVideos?.length;
            if(subSectionLength === 0){
                userDetails.courses[i].progressPercentage = 100;
            }
            else{
                const multiplier = Math.pow(10,2);
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / subSectionLength) * 100 * multiplier) / multiplier
            }
        }

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User is not enrolled in any course"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Details Fetched Successfully",
            data:userDetails.courses
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateDisplayPicture = async(req,res) => {
    try{
        const userId = req.user.id;

        const newProfileImage = req.files.newProfileImage;

        if(!newProfileImage){
            return res.status(500).json({
                success:false,
                message:"Cannot fetch image"
            })
        }

        const response = await uploadFileToCloudinary(newProfileImage,process.env.FOLDER_NAME);

        if(!response){
            return res.status(500).json({
                success:false,
                message:"Could not upload to cloud"
            })
        }

        const updatedDetails = await User.findByIdAndUpdate(userId,{image:response.secure_url},{new:true}).populate("additionalDetails").exec();

        if(!updatedDetails){
            return res.status(500).json({
                success:false,
                message:"Cannot update details of the user"
            })
        }

        res.send({
            success:true,
            message:"Profile Picture Updated Successfullly",
            data:updatedDetails
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.instructorDashboard = async(req,res) => {
    try{
        const userId = req.user.id;

        const courseDetails = await Course.find({
            instructor:userId
        })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            const courseDataWithStats = {
                _id:course._id,
                name:course.name,
                description:course.description,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats;
        })

        return res.status(200).json({
            success:true,
            message:"Instructor Details Fetched Successfully",
            courses:courseData
        })

    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}