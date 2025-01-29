import React from 'react'
import RenderSteps from './RenderSteps'
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';


const AddCourse = () => {

    const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-5'>
        <button onClick={() => navigate("/dashboard")} className='-mt-4 text-richblack-300 flex items-center gap-2'>
            <MdKeyboardArrowLeft/>
            Back to dashboard
        </button>
        <h1 className='text-3xl self-start text-richblack-5'>Add Course</h1>
        <div className='text-richblack-5 flex flex-col md:flex-row gap-10 md:gap-1 items-start'>
            <div className='w-full md:w-[50%] mx-auto'>
                <RenderSteps/>
            </div>
            <div className='w-full md:w-[40%] mx-auto border border-richblack-700 bg-richblack-800 rounded-md flex flex-col gap-3 p-4'>
                <p className='text-xl flex flex-row items-center gap-1'><BsFillLightningChargeFill className='text-yellow-5'/>Course Upload Tips</p>
                <ul className='text-sm text-richblack-100 list-disc pl-5 flex flex-col gap-2'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AddCourse