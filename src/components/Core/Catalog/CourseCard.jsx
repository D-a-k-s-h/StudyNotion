import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../Common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';

const CourseCard = ({course,Height}) => {

  const [avgRatingCount, setAvgRatingCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReview)
    setAvgRatingCount(count);
  },[course]);

  return (
    <div>
        <Link to={`/course/${course._id}`} className='flex flex-col gap-3'>
          <div>
            <img src={`${course?.thumbnail}`} className={`${Height} rounded-xl object-fill w-full`} alt='courseThumbnail'/>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-richblack-25'>{course?.name}</p>
            <p>By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className='flex flex-row gap-2'>
              <span className='text-yellow-50'>{avgRatingCount}</span>
              <RatingStars Review_Count={avgRatingCount}/>
              <span>{course?.ratingAndReview?.length} Reviews</span>
            </div>
            <p className='text-richblack-5'>Rs. {course?.price}</p>
          </div>
        </Link>
    </div>
  )
}

export default CourseCard