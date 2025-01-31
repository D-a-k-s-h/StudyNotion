import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { MdArrowBack } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { COURSE_STATUS } from '../../../../../utils/constants';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/coursesAPI';
import toast from 'react-hot-toast';

const PublishForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);
  const {
    handleSubmit,
    setValue,
    getValues,
    register
  } = useForm();

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  }

  const saveAsDraft = async() => {
    const formData = new FormData();

    formData.append("courseId",course._id);
    formData.append("status",COURSE_STATUS.DRAFT);

    const toastId = toast.loading("Loading...");
    const result = await dispatch(editCourseDetails(formData,token));
    if(result){
      toast.success("Saved as Draft");
      goToCourses();
    }
    toast.dismiss(toastId);
  }

  const handleCoursePublish = async() => {
    if((course?.status === COURSE_STATUS.PUBLISHED && getValues("status") === true) ||
    (course?.status === COURSE_STATUS.DRAFT && getValues("status") === false)){
      //no need to update
      goToCourses();
      return;
    }

    const formData = new FormData();

    formData.append("courseId",course._id);
    const courseStatus = getValues("status") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append("status",courseStatus);

    const result = await dispatch(editCourseDetails(formData,token));
  
    if(result){
      goToCourses();
    }
  }

  const submitHandler = async() => {
    handleCoursePublish();
  }

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("status",true);
    }
  },[]);

  return (
    <div className='text-richblack-5 border flex flex-col gap-4 p-4 border-richblack-600 rounded-md bg-richblack-800'>
        <p className='text-2xl font-semibold'>Publish Settings</p>

        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-5'>
          <div>
            <label htmlFor='publishCourse' className='text-richblack-300 flex items-center gap-1'>
              <input
                name='publishCourse'
                type='checkbox'
                {...register("status")}
                className='w-4 h-4 cursor-pointer'
              />
              Make this course public
            </label>
          </div>

          <div className='flex gap-4 lg:gap-0 flex-col md:flex-row justify-between md:items-center'>
            <div>
              <button type='button' onClick={() => dispatch(setStep(2))} className='flex items-center bg-richblack-700 shadow-[2px_2px_0px_0px_#585D69] p-2 hover:scale-95 rounded-md transition-all duration-200'><MdArrowBack/>Back</button>
            </div>
            <div className='flex gap-3 flex-col md:flex-row md:gap-2'>
              <button type='submit' onClick={saveAsDraft} className='bg-richblack-700 rounded-md p-2 shadow-[2px_2px_0px_0px_#585D69] hover:scale-95 transition-all duration-200'>Save as Draft</button>
              <button type='submit' className='bg-yellow-50 rounded-md p-2 text-richblack-900 hover:scale-95 transition-all duration-200'>Save and publish</button>
            </div>
          </div>
        </form>
    </div>
  )
}

export default PublishForm