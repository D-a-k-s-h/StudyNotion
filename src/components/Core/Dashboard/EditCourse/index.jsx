import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderSteps from '../AddCourse/RenderSteps';
import { getAllCourseDetails } from '../../../../services/operations/coursesAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { useParams } from 'react-router-dom';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    //const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async() => {
            const result = await dispatch(getAllCourseDetails(courseId));

            if(result){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
        }

        populateCourseDetails();
    },[]);

  return (
    <div className='text-richblack-5'>
        <p className='text-3xl'>Edit Course</p>
        <div className='w-7/12 mx-auto '>
            {
                course ? (<RenderSteps/>) : (<p>No Course Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse