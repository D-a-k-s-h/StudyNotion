import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './CTAButton'

const LanguageLearningSection = () => {
  return (
    <div>
        <div className='flex flex-col gap-10 mt-28'> 
            <div className='flex flex-col gap-2 text-center'>
                <p className='text-4xl font-semibold'>Your swiss knife <HighlightText text={"for learning any language"}/></p>
                <p className='w-[70%] mx-auto text-lg'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more</p>
            </div>

            <div className='flex flex-row mt-5 justify-center items-center'>
                <img className='relative object-contain -left-[21rem] blur-sm hover:blur-none transition-all duration-200' src={know_your_progress} alt='KnowYourProgressImage'/>
                <img className='absolute object-contain blur-sm hover:blur-none transition-all duration-200' src={compare_with_others} alt='CompareWithOthersImage'/>
                <img className='absolute object-contain right-[10rem] blur-sm hover:blur-none transition-all duration-200' src={plan_your_lessons} alt='PlanYourLessonsImage'/>
            </div>

            <div className='w-fit mx-auto my-14'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LanguageLearningSection