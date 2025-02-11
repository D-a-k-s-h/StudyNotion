import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getAllCourseDetails } from '../services/operations/coursesAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/Core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/Core/ViewCourse/VideoDetailsSidebar';

const ViewCourse = () => {

    const [reviewModal,setReviewModal] = useState(null);
    const {courseId} = useParams();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await dispatch(getAllCourseDetails(courseId));
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
            setLoading(false);
        }

        setCourseSpecificDetails();
    },[]);

  return (
    <div className='flex'>
        {
            loading ? (
                <div className='spinner mt-40 ml-[50%]'></div>
            ) : (
                <div className='flex gap-0 md:gap-5 lg:gap-10'>
                    <VideoDetailsSidebar setReviewModal={setReviewModal}/>
                    <div className='p-1 md:p-0'>
                        <Outlet/>
                    </div>
                </div>
            )
        }
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </div>
  )
}

export default ViewCourse