import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`px-3 py-2 rounded-md bg-richblack-800 font-semibold text-center hover:scale-95 hover:shadow-none transition-all duration-200 ${active ? "bg-yellow-100 text-richblack-900" : "hover:outline text-richblack-100 shadow-[1px_1px_0px_0px_#e2e8f0]"}`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton

