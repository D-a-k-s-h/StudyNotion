const express = require('express');
const router = express.Router();

const {sendOTP,changePassword,login,signUp} = require('../controllers/Auth');
const {getAllReview,getAverageRating,createRating} = require('../controllers/RatingAndReview');

const {auth,isInstructor,isStudent,isAdmin} = require('../middlewares/auth');


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************
router.post('/signup',signUp);
router.post('/login',login);
router.put('/changepassword',auth,changePassword);
router.post('/sendotp',sendOTP);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.get('/getallreview',getAllReview);
router.get('/getaveragerating',getAverageRating);
router.post('/createrating',auth,isStudent,createRating);


module.exports = router;