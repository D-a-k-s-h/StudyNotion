import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllCourseDetails } from '../../../../services/operations/coursesAPI';
import GetAvgRating from '../../../../utils/avgRating';
import RatingStars from '../../../Common/RatingStars';
import { BsInfoCircle } from 'react-icons/bs';
import { FaGlobe } from 'react-icons/fa';
import CourseInfo from './CourseInfo';
import CourseContent from './CourseContent';
import Footer from '../../../Common/Footer';
import { formatDate } from '../../../../services/formatDate';
import SliderSection from '../../../Common/SliderSection';

const CourseDetail = () => {

    const {courseId} = useParams();
    const dispatch = useDispatch();
    const [courseDetails,setCourseDetails] = useState(null);
    const [avgRatingCount,setAvgRatingCount] = useState(0);

    const totalLectures = courseDetails?.courseContent.reduce((acc,curr) => {
        acc += curr.subSection.length;
        return acc;
    },0);

    const totalDuration = courseDetails?.courseContent.reduce((acc,curr) => {
        acc += curr.subSection.reduce((acc,curr) => {
            acc += Number(curr.timeDuration);
            return acc;
        },0);
        return Math.round(acc);
    },0);

    useEffect(() => {
        const getDetails = async() => {
            const result = await dispatch(getAllCourseDetails(courseId));
            console.log("result -> ",result.courseDetails);
            if(result){
                setCourseDetails(result.courseDetails);
            }
        }

        getDetails();
        console.log("courseDetails -> ",courseDetails);
    },[]);

    useEffect(() => {
        const count = GetAvgRating(courseDetails?.ratingAndReview);
        setAvgRatingCount(count);
    },[]);

  return (
    <div className='text-richblack-200 flex flex-col gap-8'>

        {/* Header Section */}
        <div className='bg-richblack-800 w-full'>

            <div className='w-10/12 mx-auto lg:h-[318px] flex flex-row gap-5 py-6'>
                <div className='w-[70%] flex flex-col gap-4 border-r border-r-richblack-700'>
                    <p>Home / Learning / <span className='text-yellow-50'>{courseDetails?.name}</span></p>
                    <p className='text-3xl text-richblack-5'>{courseDetails?.name}</p>
                    <p>{courseDetails?.description}</p>
                    <div className='flex flex-row gap-2 items-center text-richblack-25'>
                        <span className='text-yellow-50'>{avgRatingCount || 0}</span>
                        <RatingStars Review_Count={avgRatingCount}/>
                        <span>{`(${courseDetails?.ratingAndReview?.length} ratings)`}</span>
                        <span>{`${courseDetails?.studentsEnrolled?.length} students`}</span>
                    </div>
                    <p className='text-richblack-25'>Created by {courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                    <div className='flex gap-3 text-richblack-25'>
                        <p className='flex items-center gap-2'><BsInfoCircle className='text-lg'/> Created at {formatDate(courseDetails?.createdAt)}</p>
                        <p className='flex items-center gap-2'><FaGlobe className='text-lg'/>English</p>
                    </div>
                </div>

                <div className='w-[30%] z-10'>
                    <CourseInfo courseDetails={courseDetails}/>
                </div>
            </div>

        </div>

        {/* Course Benefits */}
        <div className='w-10/12 mx-auto'>
            <div className='w-[60%] p-5 flex flex-col gap-3 border border-richblack-700'>
                <p className='text-3xl text-richblack-25'>What you'll learn</p>
                {
                    courseDetails?.whatYouWillLearn.split(".").map((element,index) => (
                        <p key={index}>{element}</p>
                    ))
                }
            </div>
        </div>

        {/* Course Content */}
        <div className='w-10/12 mx-auto flex flex-col gap-2'>
            <p className='text-2xl text-richblack-5 font-semibold'>Course Content</p>
            <ul className='flex list-disc gap-7'>
                <li className='list-none'>{courseDetails?.courseContent?.length} sections</li>
                <li>{totalLectures} lectures</li>
                <li>{`${totalDuration} mins total length`}</li>
            </ul>
            <CourseContent course={courseDetails}/>
        </div>

        {/* Author Details */}
        <div className='w-10/12 mx-auto flex flex-col gap-3'>
            <p className='text-richblack-5 text-3xl font-medium'>Author</p>
            <div className='flex items-center gap-3'>
                <img className='w-[3.5rem] rounded-full' src={courseDetails?.instructor?.image} alt='InstructorImage'/>
                <p className='text-richblack-5'>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
            </div>
            <p className='w-[70%]'>{courseDetails?.instructor?.additionalDetails?.about}</p>
        </div>

        {/* Review Slider */}
        <div className='w-11/12 mx-auto py-10'>
            <p className='text-center text-3xl font-semibold text-richblack-5'>Reviews From other learners</p>
            <SliderSection courseId={courseId}/>
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default CourseDetail