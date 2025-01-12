import React from 'react'
import { useSelector } from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount'
import RenderCartCourses from './RenderCartCourses'

const Cart = () => {

    const {totalItems, totalPrice} = useSelector((state) => state.cart);

  return (
    <div className='text-richblack-5 flex flex-col gap-4'>
        <p className='text-3xl'>WishList</p>
        <p className='text-richblack-200'>{totalItems ?? 0} Courses in your cart</p>

        {
            totalPrice > 0 
            ? (
              <div className='flex gap-5 border-t border-t-richblack-700 items-start'>
                <RenderCartCourses/>  
                <RenderTotalAmount/>
              </div>
              ) : (
                <p className='text-richblack-200'>Your Cart is Empty.</p>
              )
        }
    </div>
  )
}

export default Cart