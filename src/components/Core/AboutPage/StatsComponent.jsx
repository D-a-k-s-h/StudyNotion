import React from 'react'

const StatsComponent = () => {

    const stats = [
        {count:"5K", label:"Active Students"},
        {count:"10+",label:"Mentors"},
        {count:"200+", label:"Courses"},
        {count:"50+", label:"Awards"}
    ];

  return (
    <div className='py-10 flex justify-around text-center'>
        {
            stats.map((element,index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <p className='text-richblack-5 text-3xl'>{element.count}</p>
                    <p className='text-richblack-300'>{element.label}</p>
                </div>
            )) 
        }
    </div>
  )
}

export default StatsComponent