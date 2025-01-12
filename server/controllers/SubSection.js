const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadFileToCloudinary } = require('../utils/imageUploader');
const Course = require('../models/Course');
require('dotenv').config();

//create sub section
exports.createSubSection = async(req,res) => {
    try{
        //fetch data
        const {title,description,sectionId} = req.body;

        //fetch video file
        const videoFile = req.files.videoFile;

        //validate data 
        if(!title || !description|| !videoFile || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Please provide all the details"
            })
        }

        //upload video to cloudinary
        const videoUpload = await uploadFileToCloudinary(videoFile,process.env.FOLDER_NAME);

        //console.log("Video upload response -> ",videoUpload);

        //create sub section
        const newSubSection = await SubSection.create({
            title:title,
            description:description,
            timeDuration:videoUpload.duration,
            videoURL:videoUpload.secure_url
        })

        //push sub-section's id inside section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubSection._id}},{new:true}).populate("subSection").exec();

        // console.log("new sub section -> ",newSubSection);

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub-Section Created Successfully",
            data:updatedSection
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Sub-Section cannot be created, please try again",
            error:error
        })
    }
}

//update sub-section
exports.updateSubSection = async(req,res) => {
    try{
        //fetch data
        const {title,description,subSectionId,sectionId} = req.body;
        console.log(sectionId);

        //get subsection details
        const subSection = await SubSection.findById(subSectionId);
        
        if(!subSection){
            return res.status(400).json({
                success:false,
                message:"Cannot Fetch SubSection"
            })
        }

        //if we get data for particular field then update it
        if(title){
            subSection.title = title;
        }

        if(description){
            subSection.description = description;
        }

        if(req.files && req.files.videoFile !== undefined){
            const videoFile = req.files.videoFile;
            const videoUpload = await uploadFileToCloudinary(videoFile,process.env.FOLDER_NAME);

            subSection.videoURL = videoUpload.secure_url
            subSection.timeDuration = videoUpload.duration
        }

        //save the changes
        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Data Updated Successfully",
            data:updatedSection
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//delete sub section
exports.deleteSubSection = async(req,res) => {
    try{
        //fetch id from request body
        const {subSectionId,sectionId} = req.body;
        // console.log(subSectionId);
        // console.log(sectionId);
        //console.log(req.params);
        //console.log(courseId);

        //update section model
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});

        //delete data
        await SubSection.findByIdAndDelete(subSectionId);

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub-Section Deleted Successfully",
            data:updatedSection
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Sub-Section cannot be deleted",
            data:error
        })
    }
}