import React, { useState } from 'react'
import { TbFileCheck } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../slices/cartSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentsFeatureAPI';
import ConfirmationModal from '../../../Common/ConfirmationModal';
import { IoShareSocialSharp } from "react-icons/io5";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../../utils/constants';

const CourseInfo = ({courseDetails}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {courseId} = useParams();
  const [confirmationModal,setConfirmationModal] = useState(null);

  const alreadyEnrolled = () => {
    if(user !== null && user?.courses.includes(courseId)){
      //console.log("courses.includes -> ",user.courses.includes(courseId))
      return true;
    }
    else{
      return false;
    }
  }

  const handleBuyCourse = () => {
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("Instructor can't buy course");
    }
    else if(alreadyEnrolled() === false){
      if(user === null){
        setConfirmationModal({
          heading:"Please login",
          para:"Please login to purchase course.",
          textBtn1:"Login",
          textBtn2:"Cancel",
          textBtn1Action: () => navigate("/login"),
          textBtn2Action: () => setConfirmationModal(null)
        })
      }
      else{
        dispatch(buyCourse([courseId],token,user,dispatch,navigate));
      }
    }
    else{
      navigate("/dashboard/enrolled-courses");
    }
  }

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  }

  const handleAddToCart = () => {
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("Instructor can't buy course");
    }
    else if(token){
      dispatch(addToCart(courseDetails));
    }
    else{
      setConfirmationModal({
        heading:"Please login",
        para:"Please login to add course to cart.",
        textBtn1:"Login",
        textBtn2:"Cancel",
        textBtn1Action: () => navigate("/login"),
        textBtn2Action: () => setConfirmationModal(null)
      })
    }
  }

  return (
    <div className='flex flex-col rounded-md bg-richblack-700'>
        <img src={courseDetails?.thumbnail} alt='course thumbnail' className='rounded-t-md'/>
        <div className='flex flex-col gap-4 p-5'>
            <p className='text-4xl text-richblack-5'>Rs. {courseDetails?.price}</p>
            <button onClick={handleAddToCart} className={`${alreadyEnrolled() ? 'hidden' : 'block'} bg-yellow-50 text-richblack-900 rounded-md p-2 border-b border-b-richblack-5 font-medium`}>Add to Cart</button>
            <button onClick={handleBuyCourse} className='rounded-md bg-richblack-900 p-2 text-richblack-5 border-b border-b-richblack-400'>
              {alreadyEnrolled() ? 'Go to Course' : 'Buy Now'}
            </button>
            <p className='text-center text-richblack-50'>30-Day Money-Back Guarantee</p>
            <div className='flex flex-col gap-2'>
                <p className='text-richblack-5'>This course includes:</p>
                {
                  courseDetails && JSON.parse(courseDetails?.instructions).map((instruction,index) => (
                    <p className='text-caribbeangreen-200 flex gap-2 items-center' key={index}>
                      <TbFileCheck className='text-lg'/>
                      {instruction}
                    </p>
                  ))
                }
            </div>
            <button onClick={handleShare} className='text-yellow-25 flex gap-2 items-center justify-center'>
              <IoShareSocialSharp/>
              Share
            </button>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseInfo