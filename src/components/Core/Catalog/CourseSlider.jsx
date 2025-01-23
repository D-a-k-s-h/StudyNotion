import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import CourseCard from './CourseCard'
import {Autoplay, Navigation, Pagination} from 'swiper/modules'

const CourseSlider = ({Courses}) => {
  return (
    <div>
        {
          Courses?.length ? (
            <Swiper
              loop={true} 
              spaceBetween={25} 
              slidesPerView={1} 
              autoplay={{delay:2500, disableOnInteraction:false}}
              pagination={true}
              navigation={true}
              breakpoints={{
                640:{slidesPerView:1},
                768:{slidesPerView:2},
                1024:{slidesPerView:3}
              }}
              modules={[Autoplay,Pagination,Navigation]}
            >
              {
                Courses.map((course,index) => (
                  <SwiperSlide key={index}>
                    <CourseCard course={course} Height={'h-[240px]'}/>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          ) : (
            <p>No Course Found</p>
          )
        }
    </div>
  )
}

export default CourseSlider