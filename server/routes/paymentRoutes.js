const express = require('express');
const router = express.Router();

const {verifyPayment,capturePayment,sendPaymentSucessMail} = require('../controllers/Payments');

const {auth,isInstructor,isStudent,isAdmin} = require('../middlewares/auth');

// ********************************************************************************************************
//                                      Payment routes
// ********************************************************************************************************
router.post('/verifypayment',auth,isStudent,verifyPayment);
router.post('/capturepayment',auth,isStudent,capturePayment);
router.post('/sendsuccessfulpaymentemail',auth,isStudent,sendPaymentSucessMail)

module.exports = router;
