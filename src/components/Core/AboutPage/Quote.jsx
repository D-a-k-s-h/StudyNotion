import React from 'react'
import HighlightText from '../Homepage/HighlightText'

const Quote = () => {
  return (
    <div className='text-4xl text-richblack-5 text-center'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={'combines technology'}/> <span className='bg-gradient-to-b from-[#f57c00] to-[#ffa726] bg-clip-text text-transparent'>expertise</span> and community to create an <span className='bg-gradient-to-b from-[#f57c00] to-[#FFCA28] bg-clip-text text-transparent'>unparalleled educational experience.</span>
    </div>
  )
}

export default Quote