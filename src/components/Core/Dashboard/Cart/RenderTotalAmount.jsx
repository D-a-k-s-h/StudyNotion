import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentsFeatureAPI';

const RenderTotalAmount = () => {

    const {totalPrice, cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    function handleBuyNow(){
      const courses = cart.map((course) => course._id);
      //console.log("Courses ready to buy",courses);
      
      dispatch(buyCourse(courses,token,user,dispatch,navigate));
    }

  return (
    <div className='md:w-[40%] lg:w-[30%] bg-richblack-800 border mt-4 border-richblack-700 rounded-xl p-7 flex flex-col gap-3'>
        <p className='font-medium text-richblack-300'>Total Amount:</p>
        <p className='text-yellow-50 text-2xl font-semibold'>Rs. {totalPrice}</p>
        {
          totalPrice > 3500 && (
            <p className='text-richblack-300 line-through'>Rs. {totalPrice - 1000}</p>
          )
        }
        <button onClick={handleBuyNow} className='bg-yellow-50 rounded-md p-2 text-richblack-900 font-semibold'>Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount