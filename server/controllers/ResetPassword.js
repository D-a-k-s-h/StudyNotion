const User = require('../models/User');
const validate = require('validator');
const bcrypt = require('bcrypt');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
const crypto = require('crypto');

//reset password token
//token -> refers to random bytes (not a jwt one)
exports.resetPasswordToken = async(req,res) => {
    try{
        //get email from request body
        const {email} = req.body;

        //validate email
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Email is not recognised"
            })
        }

        //find user
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered with us"
            })
        }

        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email},{token:token,resetPasswordExpires:Date.now() + 5*60*1000},{new:true});
        
        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send mail containing url
        mailSender(email,"Password Reset Link",`Link for reset password is: ${url}`);

        //return response
        return res.status(200).json({
            success:true,
            message:"please check email for the link to reset password"
        });

    } catch(error){
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

//reset password
exports.resetPassword = async(req,res) => {
    try{
        //fetch details
        //frontend does the task of putting token in request's body
        const {password,confirmPassword,token} = req.body;
        //verify details
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"PASSWORD and CONFIRM PASSWORD must be same"
            })
        }
    
        //get user details from database using token
        const user = await User.findOne({token:token});

        //if no entry - then invalid token
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No User Found With Given Token"
            })
        }
        
        //token time check
        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token is Expired, Please regenerate your token"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //password update 
        const updatedDetails = await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});

        mailSender(user.email,`Password Updated for ${user.email}`,passwordUpdated(user.email,user.firstName))
        
        //return response
        return res.status(200).json({
            success:true,
            message:"Password Updated Successfully",
            data:updatedDetails
        })

    } catch(error){
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}