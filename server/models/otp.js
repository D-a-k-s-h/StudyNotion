const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});


async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email from StudyNotion",otp);
        console.log("Email Send Successfully",mailResponse);
    } catch(error){
        console.log("Error Occured While Sending Mail:",error);
    }
}

otpSchema.pre('send',function(next){
    sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = new mongoose.model("otp",otpSchema);