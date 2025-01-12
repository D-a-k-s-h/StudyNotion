import React from 'react'
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


const EditBtn = () => {

    const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => navigate("/dashboard/settings")} className='flex items-center gap-2 rounded-md bg-yellow-25 text-richblack-900 p-1'>
            <p>Edit</p>
            <FiEdit/>
        </button>
    </div>
  )
}

export default EditBtn