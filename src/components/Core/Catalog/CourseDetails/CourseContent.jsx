import React from 'react'
import { HiComputerDesktop } from 'react-icons/hi2'
import { IoIosArrowDown } from 'react-icons/io'

const CourseContent = ({course}) => {

    function totalDuration(section){
        
        let time = 0;
        section.subSection.reduce((acc,curr) => {
            //console.log("curr -> ",curr);
            //console.log("curr.timeDuration",curr.timeDuration);
            acc = curr.timeDuration
            //console.log("acc -> ",acc)
            time += Number(acc);
        },0);
        return time;
    }

  return (
    <div className='w-[68%]'>
        {
            course && course?.courseContent.map((section,index) => (
                <details key={index} className='w-full group border border-richblack-700'>
                    <summary className='w-full bg-richblack-800 border-b border-b-richblack-700 flex p-3 px-5'>
                        <div className='w-full flex justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                                <IoIosArrowDown className='cursor-pointer group-open:rotate-0 -rotate-90'/>
                                <p>{section?.sectionName}</p>
                            </div>
                            <div className='flex gap-4'>
                                <p className='text-yellow-50'>{section?.subSection?.length} lectures</p>
                                <p>{`${totalDuration(section)} mins`}</p>
                            </div>
                        </div>
                    </summary>
                    <div className='bg-richblack-900 p-3 px-5'>
                        {
                            section?.subSection.map((element,index) => (
                                <details className='group flex flex-col gap-2' key={index}>
                                    <summary className='flex text-richblack-25 justify-between items-center gap-2'>
                                        <div className='flex gap-2 items-center'>
                                            <HiComputerDesktop/>
                                            <p>{element.title}</p>
                                            <IoIosArrowDown className='cursor-pointer text-richblack-50'/>
                                        </div>
                                        <p>{element?.timeDuration} mins</p>
                                    </summary>

                                    <div className='px-5 pb-5 text-richblack-100'>{element?.description}</div>
                                </details>
                            ))
                        }
                    </div>
                </details>
            ))
        }
    </div>
  )
}

export default CourseContent