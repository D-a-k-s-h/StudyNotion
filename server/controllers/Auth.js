const  User = require('../models/User');
const OTP = require('../models/otp');
const otpGenerate = require('otp-generator');
const validate = require('validator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
require('dotenv').config();

//sent otp
exports.sendOTP = async(req,res) => {
    try{
        //retieve email from request's body
        const {email} = req.body;

        if(!validate.isEmail(email)){
            return res.status(404).json({
                success:false,
                message:"Email is Invalid"
            })
        }

        //fetch user details
        const response = await User.findOne({email});

        //if exists then return user exists
        if(response){
            return res.status(401).json({
                success:false,
                message:"User Already Exists"
            });
        }

        //if not,
        //generate OTP
        var otp = otpGenerate.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log("OTP generated -> ",otp);

        //check if otp is unique or not
        let result = await OTP.findOne({otp:otp});

        //if not then generate the new one
        while(result){
            otp = otpGenerate.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await OTP.findOne({otp:otp});
        }

        //create entry of otp in database
        const otpPayload = {email,otp};
        const otpBody = await OTP.create(otpPayload);

        console.log(otpBody);

        //send mail to user
        mailSender(email,"OTP from StudyNotion",otpTemplate(otp));

        //return response
        return res.status(200).json({
            success:true,
            message:"OTP Generated Successfully",
            otp
        });
        

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Can't Generate OTP"
        })
    }
}

//signup

exports.signUp = async(req,res) => {
    try{
        //fetch data from request's body
        const{firstName,lastName,contactNumber,email,password,confirmPassword,accountType,otp} = req.body;

        //check if information is provided or not
        if(!firstName || !lastName || !contactNumber || !password || !confirmPassword || !accountType){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        //validate the email
        if(!validate.isEmail(email)){
            return res.status(404).json({
                success:false,
                message:"Email Is Not Valid"
            })
        }

        //check for existing user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }

        //check for password
        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Password and Confirm Password must be same"
            })
        }

        //check for valid otp
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"Regenerate OTP please"
            })
        }
        else if(recentOtp[0].otp !== otp){
            return res.status(400).json({
                success:false,
                message:"OTP doesn't match,please re-enter otp"
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            profession:null
        })

        //create entry of user in database
        const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword,
            contactNumber:contactNumber,
            accountType:accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"User Registered Successfully",
            data:user
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
            
        })
    }
}

//login
exports.login = async(req,res) => {
    try{
        //fetch data from request body
        const {email,password} = req.body;

        //validate data
        if(!validate.isEmail(email) || !password){
            return res.status(400).json({
                message:"Please Enter valid Credentials"
            })
        }

        //check user exists or not
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User Is Not Registered"
            })
        }

        const profileDetails = await Profile.findOne(existingUser.additionalDetails);

        const payload = {
            email:existingUser.email,
            id:existingUser._id,
            accountType:existingUser.accountType
        }

        //generate JWT, after password matching
        if(await bcrypt.compare(password,existingUser.password)){

            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"})

            existingUser.toObject();
            existingUser.token = token;
            existingUser.password = undefined;
            existingUser.additionalDetails = profileDetails;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                existingUser,
                message:"User LoggedIn Successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password Is Incorrect, Please Enter Correct Password"
            })
        }

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//change password
exports.changePassword = async(req,res) => {
    try{
        //get data from request body
        //get oldpassword ,new password and confirm password
        const {currentPassword,changePassword,confirmPassword} = req.body;

        const userId = req.user.id;
        
        //validation
        const existingPassword = await User.findById(userId).populate("additionalDetails").exec();
        
        if(!existingPassword){
            return res.status(400).json({
                success:false,
                message:"Cannot find user"
            })
        }

        if(await bcrypt.compare(currentPassword,existingPassword.password)){

            //check whether new password and confirm password is same or not
            if(changePassword !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"New Password and Confirm Password should be same"
                })
            }

            //update password in database
            const newHashedPasword = await bcrypt.hash(changePassword,10);
            
            const userDetails = await User.findByIdAndUpdate(userId,{password:newHashedPasword},{new:true});

            //Send Mail -> Password Updated
            mailSender(userDetails.email,"Your password has been changed",passwordUpdated(userDetails.email,`${userDetails.firstName}`));
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is Incorrect"
            });
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Password Updated Successfully",
        });
         
    } catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Password can't be Changed, Please Try Again"
        })
    }
}