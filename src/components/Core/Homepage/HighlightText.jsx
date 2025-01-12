import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='bg-gradient-to-r from-[#0284C7] to-[#26C6DA] bg-clip-text text-transparent'>
        {" "}{text}{" "}
    </span>
  )
}

export default HighlightText