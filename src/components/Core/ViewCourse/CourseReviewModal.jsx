import React, { useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { useForm } from 'react-hook-form';
import { createRatingAndReview } from '../../../services/operations/studentsFeatureAPI';


const CourseReviewModal = ({setReviewModal}) => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {courseEntireData} = useSelector((state) => state.viewCourse);

  const{
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  } = useForm();

  const ratingChanged = (newRating) => {
    setValue("rating",newRating);
  }

  const submitHanlder = async(data) => {
    await dispatch(createRatingAndReview(
      {
        rating:data.rating,
        review:data.review,
        courseId:courseEntireData._id
      },token
    ))

    setReviewModal(false);
  }

  useEffect(() => {
    setValue("rating",0);
    setValue("review","");
  },[]);

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center p-4 md:p-0 overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='text-richblack-5 rounded-md w-full md:w-[60%] lg:w-[35%] bg-richblack-800'>

        {/* Modal Header */}
        <div className='flex justify-between rounded-t-md items-center bg-richblack-600 p-2 border-b border-b-richblack-300'>
          <p className='font-semibold'>Add Review</p>
          <button onClick={() => setReviewModal(false)}><RxCross2 className='hover:text-red transition-all duration-100'/></button>
        </div>

        {/* Modal Body */}
        <div className='flex flex-col justify-center items-center p-6 gap-10'>
          <div className='flex gap-3 items-center'>
            <img src={user?.image} alt='userProfileImage' className='rounded-full w-[4rem] aspect-square object-cover'/>
            <div className='flex flex-col gap-1'>
              <p className='text-lg font-medium'>{user?.firstName} {user?.lastName}</p>
              <p className='text-richblack-100'>Posting Publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(submitHanlder)} className='w-full flex flex-col gap-4'>
            <div className='self-center'>
              <ReactStars
                count={5}
                half={true}
                onChange={ratingChanged}
                size={24}
                activeColor={"#ffd700"}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='review'>Add Your Experience<sup className='text-red'>*</sup></label>
              <textarea
                name='review'
                className='p-2 bg-richblack-700 text-richblack-5 rounded-md min-h-[120px]'
                placeholder='Share details of your own experience for this course'
                {...register("review",{required:true})}
              />
              {
                errors.review && (
                  <span className='text-red'>Please tell us something about your experience</span>
                )
              }
            </div>
            <div className='flex gap-3 justify-end'>
              <button onClick={() => setReviewModal(false)} className='bg-richblack-700 border border-richblack-600 p-2 px-4 hover:scale-95 transition-all duration-100 rounded-md'>Cancel</button>
              <button type='submit' className='text-richblack-900 bg-yellow-50 font-medium rounded-md hover:scale-95 transition-all duration-100 p-2 px-4'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal