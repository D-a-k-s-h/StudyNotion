import React from 'react'
import CTAButton from './CTAButton'
import { FaChevronCircleRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex ${position} mx-28 my-20 gap-[7.5rem]`}>

        {/* Section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-semibold'>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaChevronCircleRight/>
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* Section 2 */}
        <div className='relative z-10 h-fit border-l border-t border-richblack-700 flex flex-row w-[100%] lg:w-[600px] py-4'>
            {/* BG Gradient */}
            <div className={`absolute z-0 right-[25rem] bottom-[10rem] rounded-full ${backgroundGradient ? 'animate-pulse shadow-[0px_0px_298px_80px_#f6e05e]' : 'animate-pulse shadow-[0px_0px_298px_80px_#68d391]' }`}></div>
            <div className='w-[10%] z-10 pointer-events-none text-center font-inter font-semibold text-richblack-400 flex flex-col'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] pointer-events-none z-10 flex flex-col gap-2 font-mono font-semibold ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence={[codeblock,1000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                />
            </div>
            
        </div>
    </div>
  )
}

export default CodeBlocks