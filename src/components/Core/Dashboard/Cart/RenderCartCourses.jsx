import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { removeFromCart } from '../../../../slices/cartSlice';


const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div className='w-[70%]'>
        {
            cart.map((course,index) => (
                <div key={index} className='w-full border-t border-t-richblack-700 p-5'>
                    <div className='flex'>
                        <div className='flex gap-2 '>
                            <img src={course?.thumbnail} alt='thumbnailImage' className='w-[30%] object-fill rounded-xl'/>
                            <div className='flex flex-col gap-2'>
                                <p>{course?.name}</p>
                                <p>{course?.category?.name}</p>
                                <div className='flex items-center gap-2 text-yellow-50'>
                                    {/* Average Rating */}
                                    <span>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#FFD60A"
                                        emptyIcon={<FaRegStar/>}
                                        fullIcon={<FaStar/>}
                                    />
                                    <span className='text-richblack-200'>{`(${course?.ratingAndReview?.length} reviews)`} </span>
                                </div>
                                <ul className='flex gap-7 list-disc text-richblack-100'>
                                    <li className='list-none'>Total Courses</li>
                                    <li>Lessons</li>
                                    <li>Beginner</li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <button onClick={() => dispatch(removeFromCart(course._id))} className='flex border border-richblack-600 text-pink-300 font-medium rounded-xl bg-richblack-800 p-3 text-xl items-center gap-1'>
                                <LuTrash2 className='text-2xl'/> Remove
                            </button>
                            <span className='text-yellow-50 text-2xl font-semibold'>Rs. {course?.price}</span>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses