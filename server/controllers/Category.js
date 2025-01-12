const Category = require('../models/Category');

function getRandomInt(value){
    return Math.floor(Math.random() * value);
}

exports.createCategory = async(req,res) => {
    try{
        //fetch details from request's body
        const {name,description} = req.body;

        //validate the data
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"please enter ALL the details"
            })
        }

        //create entry in database
        const CategoryDetails = await Category.create({name,description});
        console.log(CategoryDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully"
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Category Can't be created, Please try again"
        })
    }
}


//fetch all category
exports.getAllCategory = async(req,res) => {
    try{
        const allCategory = await Category.find({},{name:true,description:true});

        return res.status(200).json({
            success:true,
            message:"Category Fetched Successfully",
            data:allCategory
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Category cannot be fetched"
        })
    }
}

//get categoryCourseDetails
exports.getPageDetails = async(req,res) => {
    try{
        //get category id
        const {categoryId} = req.body;

        //console.log("category id ->",categoryId);

        //get courses for specified category id
        const selectedCategory = await Category.findById(categoryId).populate({path:"course",match:{status:"Published"},populate:"ratingAndReview",populate:"instructor"}).exec();

        //validation
        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"Cannot get details for specified category"
            })
        }

        if(selectedCategory.course.length === 0){
            return res.status(404).json({
                success:false,
                message:"No courses found in category"
            })
        }

        //get details for different categories
        const differentCategories = await Category.find({_id: {$ne:categoryId}});

        let differentCategory = await Category.findOne(differentCategories[getRandomInt(differentCategories.length)]._id).populate({path:"course",match:{status:"Published"},populate:"instructor"}).exec();

        //get top selling courses
        const allCategories = await Category.find().populate({path:"course",match:{status:"Published"},populate:"instructor"}).exec();
        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold).slice(0,10);

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Details Fetched Successfully",
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
}