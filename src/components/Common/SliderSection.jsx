import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllRatingsAndReviews, getCourseSpecificRating } from '../../services/operations/ratingAndReview';
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay, Navigation, Pagination, FreeMode} from 'swiper/modules'
import RatingStars from './RatingStars';


const SliderSection = ({courseId}) => {

  const dispatch = useDispatch();
  const [reviews,setReviews] = useState(null);

  useEffect(() => {

    if(courseId){
      const fetchRatingsAndReviews = async() => {
        const result = await dispatch(getCourseSpecificRating(courseId));
        console.log("fetched ratings and reviews -> ",result);
  
        if(result){
          setReviews(result);
        }
      }

      fetchRatingsAndReviews();
    }
    else{
      const fetchRatingsAndReviews = async() => {
        const result = await dispatch(getAllRatingsAndReviews());
        //console.log("fetched ratings and reviews -> ",result);
  
        if(result){
          setReviews(result);
        }
      }

      fetchRatingsAndReviews();
    }

  },[]);

  return (
    <div className='w-full'>
        <div>
          <Swiper
            loop={true}
            autoplay={{delay:2500,disableOnInteraction:false}}
            freeMode={true}
            slidesPerView={4}
            spaceBetween={25}
            pagination={true}
            navigation={true}
            breakpoints={{
              1024:{slidesPerView:4}
            }}
            modules={[Autoplay,Navigation,Pagination,FreeMode]}
          >

            {
              reviews !== null ? reviews.map((review,index) => (
                <SwiperSlide key={index}>
                  <div className='bg-richblack-800 h-[190px] flex flex-col gap-2 p-4'>
                    <div className='flex gap-2'>
                      <img src={review?.user?.image} className='w-[3rem] object-cover rounded-full'/>
                      <div className='flex flex-col'>
                        <p className='font-medium'>{review.user.firstName} {review.user.lastName}</p>
                        <p className='text-richblack-500 font-medium'>{review.user.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className='text-richblack-25 text-sm'>{review?.review}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-semibold pt-[0.2rem] text-yellow-50 opacity-80'>{review?.rating.toFixed(1)}</p>
                      <p><RatingStars Review_Count={review?.rating}/></p>
                    </div>
                  </div>
                </SwiperSlide>
              )) : (
                <div className='text-2xl text-center'>No Ratings and Reviews for course</div>
              )
            }

          </Swiper>
        </div>
    </div>
  )
}

export default SliderSection