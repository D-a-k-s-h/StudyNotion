import React from 'react'
import CTAButton from '../Homepage/CTAButton'
import HighlightText from '../Homepage/HighlightText';

const LearningGrid = () => {

    const learningGrid = [
        {
            order:-1,
            heading:"World-Class Learning for",
            highlightText:"Anyone, Anywhere",
            description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText:"Learn More",
            BtnLink:"/"
        },
        {
            order:1,
            heading:"Curriculum Based on Industry Needs",
            description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            order:2,
            heading:"Our Learning Methods",
            description:"The learning process uses the namely online and offline."
        },
        {
            order:3,
            heading:"Certification",
            description:"You will get a certificate that can be used as a certification during job hunting."
        },
        {
            order:4,
            heading:'Rating "Auto-grading"',
            description:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
        },
        {
            order:5,
            heading:"Ready To Work",
            description:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
        }
    ];

  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 text-richblack-5'>
        {
            learningGrid.map((element,index) => (
                <div key={index} className={`${index === 0 && 'lg:col-span-2 bg-transparent'}
                                            ${element.order % 2 === 1 ? 'bg-richblack-700' : 'bg-richblack-800'}
                                            ${element.order === 3 && 'lg:col-start-2'} p-10
                `}>
                    {
                        element.order < 0 ? (
                            <div className='flex flex-col gap-3'>
                                <p className='w-[70%] text-4xl font-semibold'>
                                    {element.heading}
                                    <HighlightText text={element.highlightText}/>
                                </p>
                                <p className='w-[85%] text-richblack-300'>
                                    {element.description}
                                </p>
                                <div className='w-fit mt-10'>
                                    <CTAButton active={true} linkto={element.BtnLink}>
                                        {element.BtnText}
                                    </CTAButton>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-10'>
                                <p className='text-xl'>{element.heading}</p>
                                <p className='text-richblack-300 w-[95%]'>{element.description}</p>
                            </div>
                        )
                    }
                </div>
            ))
        }
    </div>
  )
}

export default LearningGrid