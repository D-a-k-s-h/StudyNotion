const express = require('express');
const router = express.Router();

const {getAllDetails,getAllCourses,createCourse,deleteCourse,updateCourse,updateCourseProgress} = require('../controllers/Course');
const {deleteSection,updateSection,createSection} = require('../controllers/Section');
const {deleteSubSection,updateSubSection,createSubSection} = require('../controllers/SubSection');
const {createCategory,getAllCategory,getPageDetails} = require('../controllers/Category');


const {auth,isInstructor,isStudent,isAdmin} = require('../middlewares/auth');
//const { updateCourseProgress } = require('../controllers/courseProgress');


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
router.post('/getalldetails',getAllDetails);
router.get('/getallcourses',auth,getAllCourses);
router.post('/createcourse',auth,isInstructor,createCourse);
router.delete('/deletecourse',auth,isInstructor,deleteCourse);
router.delete('/deletesection/:sectionId/:courseId',auth,isInstructor,deleteSection);
router.post('/updatesection',auth,isInstructor,updateSection);
router.post('/createsection',auth,isInstructor,createSection);
router.delete('/deletesubsection/:subSectionId/:sectionId',auth,isInstructor,deleteSubSection);
router.post('/updatesubsection',auth,isInstructor,updateSubSection);
router.post('/createsubsection',auth,isInstructor,createSubSection);
router.post('/updatecourse',auth,isInstructor,updateCourse);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
router.post('/createcategory',auth,isAdmin,createCategory);
router.get('/getallcategory',getAllCategory);
router.post('/getpagedetails',getPageDetails);
router.post('/updatecourseprogress',auth,isStudent,updateCourseProgress);

module.exports = router;
