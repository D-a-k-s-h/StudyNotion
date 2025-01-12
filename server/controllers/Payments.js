const User = require('../models/User');
const Course = require('../models/Course');
const mailSender = require('../utils/mailSender');
const {instance} = require('../config/razorpay');
const { default: mongoose } = require('mongoose');
const { courseEnrollmentEmail, paymentSuccessMail } = require('../mail/templates/courseEnrollmentEmail');
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress');

exports.capturePayment = async(req,res) => {
    try{
        const {courses} = req.body;
        const userId = req.user.id;

        if(courses.length === 0){
            return res.status(400).json({
                success:false,
                message:"Please provide courses"
            })
        }

        let totalAmount = 0;

        for(const course_id of courses){
            let course;
            try{
                course = await Course.findById(course_id);
                if(!course){
                    return res.status(400).json({
                        success:false,
                        message:error.message
                    })
                }

                const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(400).json({
                        success:false,
                        message:"Student already enrolled"
                    })
                }

                totalAmount += course.price;

            } catch(error){
                return res.status(400).json({
                    success:false,
                    message:error.message
                })
            }
        }

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString()
        }

        try{
            const paymentResponse = await instance.orders.create(options);

            return res.status(200).json({
                success:true,
                message:paymentResponse
            })

        } catch(error){
            return res.status(400).json({
                success:false,
                message:"Not able to create order"
            })
        }

    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const enrollStudent = async(res,courses,userId) => {
    //console.log("courses -> ",courses);
    if(!courses || !userId){
        return res.status(404).json({
            success:false,
            message:"Fields are required"
        })
    }

    for(const courseId of courses){
        try{
            console.log("courseId -> ",courseId)
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                {$push:{studentsEnrolled:userId}},
                {new:true},
            );

            //console.log("enrolledCourse -> ",enrolledCourse);
    
            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:"Could not find course"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos:[]
            })
    
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {$push:{
                    courses:courseId,
                    courseProgress:courseProgress._id
                }},
                {new:true}
            );

            //console.log("enrolledStudent -> ",enrolledStudent);

            if(!enrolledStudent){
                return res.status(400).json({
                    success:false,
                    message:"Course could not be added in student courses list."
                })
            }
    
            await mailSender(enrolledStudent.email,`Successfully Enrolled in Course ${enrolledCourse.name}`,courseEnrollmentEmail(enrolledCourse.name,enrolledStudent.firstName))
            
            //return response
            return res.status(200).json({
                success:true,
                message:"Student successfully enrolled in course"
            })
        } catch(error){
            console.log(error);
        }
    }
}

exports.verifyPayment = async(req,res) => {
    try{
        const razorpay_order_id = req.body.razorpay_order_id;
        const razorpay_payment_id = req.body.razorpay_payment_id;
        const razorpay_signature = req.body.razorpay_signature;
        const courses = [req.body.courses];
        const userId = req.user.id;

        if(!razorpay_order_id || !razorpay_signature || !razorpay_payment_id || !courses){
            return res.status(404).json({
                success:false,
                message:"Fields are required"
            })
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature){
            //enroll the student
            enrollStudent(res,courses,userId);

            //return response
            return res.status(200).json({
                success:true,
                message:"Payment Successful"
            })
        }

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Payment Failed"
        })
    }
}

exports.sendPaymentSucessMail = async(req,res) => {
    try{
        const {orderId,paymentId,amount} = req.body;

        const userId = req.user.id;

        if(!orderId || !paymentId || !amount){
            return res.status(404).json({
                success:false,
                message:"Please provide all details"
            })
        }

        const enrolledUser = await User.findById(userId);
        //paymentSuccessMail(enrolledUser?.firstName,amount/100,orderId,paymentId)
        await mailSender(enrolledUser?.email,`Payment Recieved`,paymentSuccessMail(enrolledUser?.firstName,amount/100,orderId,paymentId));

        return res.status(200).json({
            success:true,
            message:"Payment Successful"
        })

    } catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// exports.capturePayment = async(req,res) => {
//     try{
//         //get user id and course id
//         const {courseId} = req.body;
//         const userId = req.user.id;

//         //validate course id
//         if(!courseId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Please Provide All Details"
//             })
//         }

//         //validate course details
//         let courseDetails;
//         try{
//             courseDetails = await Course.findById(courseId);

//             if(!courseDetails){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Course details could not be fetched"
//                 })
//             }

//             //check if user has already paid or not
//             const uid = new mongoose.Schema.Types.ObjectId(userId);
//             if(courseDetails.studentsEnrolled.includes(uid)){
//                 return res.status(401).json({
//                     success:false,
//                     message:"User is already enrolled"
//                 })
//             }
//         } catch(error){
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//         }

//         //create order
//         const amount = courseDetails.price;
//         const currency = "INR";

//         const options = {
//             amount:amount * 100,
//             currency:currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:courseId,
//                 userId
//             }
//         }

//         try{
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             //return response
//             return res.status(400).json({
//                 success:true,
//                 courseName:courseDetails.name,
//                 courseDescription:courseDetails.description,
//                 thumbnail:courseDetails.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount
//             })
//         } catch(error){
//             return res.status(400).json({
//                 success:false,
//                 message:"Could not get payment response"
//             })
//         }

//     } catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Payment can't be Captured"
//         })
//     }
// }

// //verify the signature
// exports.verifyPayment = async(req,res) => {
//     try{
//         const webhookSecret = "12345678";

//         const signature = req.headers["x-razorpay-signature"];

//         const shasum = crypto.createHmac("sha256",webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if(digest === signature){
//             const {courseId,userId} = req.body.payload.payment.entity.notes;

//             //fullfil the task of enrolling the student in courses
//             try{
//                 const enrolledCourse = await findOneAndUpdate(courseId,{$push:{studentsEnrolled:userId}},{new:true});

//                 if(!enrolledCourse){
//                     return res.status(500).json({
//                         success:false,
//                         message:"Could not fetch course"
//                     })
//                 }
//                 console.log(enrolledCourse);

//                 const enrolledStudent = await findOneAndUpdate(userId,{$push:{courses:courseId}},{new:true});

//                 if(!enrolledStudent){
//                     return res.status(500).json({
//                         success:false,
//                         message:"Could not fetch user"
//                     })
//                 }
//                 console.log(enrolledStudent);

//                 const emailSender = await mailSender(enrolledStudent.email,"Congratulations from StudyNotion",
//                     "Congratulations, You are now enrolled in our course and you can now start learning");

//                 console.log(emailSender);

//                 return res.status(200).json({
//                     success:true,
//                     message:"Enrollment is Successful"
//                 })


//             } catch(error){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Student cannot be enrolled in course"
//                 })
//             }
//         }
//         else{
//             return res.status(500).json({
//                 success:false,
//                 message:"Payment Could not be Verified"
//             })
//         }

//     } catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Invalid Operation"
//         })
//     }
// } 