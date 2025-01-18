import React from 'react'
import InstructorImage from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaChevronCircleRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row w-[100%] mx-auto items-center mt-20 gap-20'>
        <div className='md:w-[45%] shadow-[-11px_-10px_0px_0px_#f7fafc]'>
            <img src={InstructorImage} alt='InstructorImage'/>
        </div>
        <div className='md:w-[55%] flex flex-col gap-3'>
            <p className='font-semibold text-4xl'>Become an <br/> <HighlightText text={"Instructor"}/></p>
            <p className='text-richblack-400 w-[75%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            
            <div className='w-fit mt-10'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Teaching Today
                        <FaChevronCircleRight/>
                    </div>
                </CTAButton>
            </div>
           
        </div>
    </div>
  )
}

export default InstructorSection