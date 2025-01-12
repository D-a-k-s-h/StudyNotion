const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

exports.createSection = async(req,res) => {
    try{
        //fetch data from request body
        const {sectionName,courseId} = req.body;

        //validate data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Please Provide All Details"
            })
        }

        //create section
        const newSection = await Section.create({sectionName:sectionName});

        //push new section's id in course content inside course
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new:true}).populate({path:"courseContent",populate:{path:"subSection"}}).exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            data:updatedCourse
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Section cannot be created"
        })
    }
}


exports.updateSection = async(req,res) => {
    try{
        //fetch data
        const {courseId,sectionName,sectionId} = req.body;

        //validate data
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"Please Provide All Details"
            })
        }

        //update data
        await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});

        const updatedCourse = await Course.findById(courseId).populate({path:"courseContent",populate:{path:"subSection"}}).exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
            data:updatedCourse
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Section can't be Updated, Please try again"
        })
    }
}


exports.deleteSection = async(req,res) => {
    try{
        //fetch id -> assuming id is sent in url
        const {sectionId,courseId} = req.body;

        //delete data
        const section = await Section.findById(sectionId);

        await SubSection.deleteMany({_id:{$in:section.subSection}})

        await Section.findByIdAndDelete(sectionId);

        //update courseContent inside Course
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$pull:{courseContent:sectionId}},{new:true}).populate({path:"courseContent",populate:{path:"subSection"}}).exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
            data:updatedCourse
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Section can't be Deleted, Please try again",
            error:error
        })
    }
}