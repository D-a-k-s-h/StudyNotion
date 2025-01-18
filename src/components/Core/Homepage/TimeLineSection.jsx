import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineimage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        logo:logo1,
        heading:"Leadership",
        Description:"Fully Conmmited to Success Company."
    },
    {
        logo:logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority."
    },
    {
        logo:logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skill."
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution."
    }
]

const TimeLineSection = () => {
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-40 mt-5 lg:mt-10'>
            <div className='relative w-full lg:w-[40%] lg:mx-auto flex flex-col gap-16'>

                {timeline.map((data,index) => (
                    <div className='flex flex-row items-center gap-4' key={index}>
                        <div className='w-[2.5rem] h-[2.5rem] grid place-items-center rounded-full shadow-[0px_0px_5px_3px_#00000024]'>
                            <img src={data.logo} alt='logo'/>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <p className='font-semibold'>{data.heading}</p>
                            <p className='text-sm text-richblack-400'>{data.Description}</p>
                        </div>
                    </div>
                ))}

                <div className='absolute left-[1.2rem] top-14 h-12 border-l-2 border-dashed border-l-richblack-100'></div>
                <div className='absolute left-[1.2rem] top-[10.5rem] h-12 border-l-2 border-dashed border-l-richblack-100'></div>
                <div className='absolute left-[1.2rem] top-[17.5rem] h-12 border-l-2 border-dashed border-l-richblack-100'></div>

            </div>

            <div className='relative lg:w-[60%] mx-auto'>
                <div className='relative z-10 w-[100%]'>
                    <img src={timelineimage} alt='timelineimage' className='shadow-[0px_0px_60px_2px_#3182ce]'/>
                </div>
                <div className='absolute z-20 -bottom-16 right-20 uppercase flex flex-col md:flex-row w-[70%] justify-center items-center p-5 text-richblack-5 bg-caribbeangreen-700'>
                    <div className='lg:w-[40%] h-fit flex flex-row gap-4 items-center md:border-r border-richblack-400 '>
                        <p className='font-bold text-4xl'>10</p>
                        <p className='text-sm text-richblack-200'>Years<br/>Experience</p>
                    </div>
                    <div className='lg:w[60%] h-fit flex flex-row gap-5 items-center py-5 pl-5'>
                        <p className='font-bold text-4xl'>250</p>
                        <p className='text-sm text-richblack-200'>Types of <br/> Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection