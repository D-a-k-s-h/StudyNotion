const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//auth
exports.auth = async(req,res,next) => {
    try{
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Not Found"
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;

        } catch(error){
            return res.status(400).json({
                success:false,
                message:"Token can't be verified,please try again"
            })
        }
        next();

    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//isStudent
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students only"
            })
        }
        next();

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Something Went Wrong, Please try again"
        })
    }
}

//isAdmin
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin only"
            })
        }
        next();

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Something Went Wrong, Please try again"
        })
    }
}

//isInstructor
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for instructor only"
            })
        }
        next();

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Something Went Wrong, Please try again"
        })
    }
}