const express = require('express');
const router = express.Router();

const {getAllUserDetails,deleteAccount,updateProfile,getEnrolledCourses,updateDisplayPicture, instructorDashboard} = require('../controllers/Profile');
const {resetPassword,resetPasswordToken} = require('../controllers/ResetPassword');

const {auth, isInstructor} = require('../middlewares/auth');


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
router.get('/getalluserdetails',auth,getAllUserDetails);
router.delete('/deleteaccount',auth,deleteAccount);
router.post('/updateprofile',auth,updateProfile);
router.post('/updatedisplaypicture',auth,updateDisplayPicture);
router.get('/getenrolledcourses',auth,getEnrolledCourses);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************
router.post('/reset-password',resetPassword);
router.post('/reset-password-token',resetPasswordToken);
router.post('/instructordashboard',auth,isInstructor,instructorDashboard);

module.exports = router;
