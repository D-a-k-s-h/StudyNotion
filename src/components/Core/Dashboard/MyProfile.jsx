import React from 'react'
import { useSelector } from 'react-redux'
import EditBtn from '../../Common/EditBtn';

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);

  return (
    <div className='md:w-[80%] lg:w-[70%] mx-auto text-richblack-25 flex flex-col gap-5 lg:gap-10'>
        <p className='text-3xl font-semibold'>My Profile</p>
        <div className='flex flex-col gap-4'>
            {/* Display Picture */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 bg-richblack-800 rounded-md border border-richblack-500 p-4 md:p-7'>
                <div className='flex flex-col md:flex-row gap-1 md:gap-3 items-center'>
                    <img src={user.image} alt='userImage' className='aspect-square rounded-full w-[4rem] object-cover'/>
                    <div className='flex flex-col'>
                        <p className='text-sm md:text-base text-center md:text-left'>{user.firstName} {user.lastName}</p>
                        <p className='text-sm md:text-base text-richblack-100 text-center md:text-left'>{user.email}</p>
                    </div>
                </div>
                <EditBtn/>
            </div>

            {/* About Section */}
            <div className='flex text-center md:text-left flex-col md:flex-row gap-3 md:gap-0 items-center justify-between bg-richblack-800 rounded-md border border-richblack-500 p-7'>
                <div className='flex flex-col gap-4'>
                    <p className='text-xl md:text-base text-richblack-5'>About</p>
                    <p className='md:w-[91%] text-richblack-200'>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>
                </div>
                <EditBtn/>
            </div>

            {/* Personal Details */}
            <div className='flex flex-col gap-3 md:gap-0 md:flex-row text-center md:text-left items-center justify-between bg-richblack-800 rounded-md border border-richblack-500 p-7'>
                <div className='flex flex-col gap-4 md:gap-12'>
                    <p className='text-xl md:text-base text-richblack-5'>Personal Details</p>
                    <div className='flex flex-col md:flex-row gap-5 md:gap-10'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p>First Name</p>
                                <p className='text-richblack-100'>{user.firstName}</p>
                            </div>
                            <div>
                                <p>Email</p>
                                <p className='text-richblack-100 text-sm md:text-base'>{user.email}</p>
                            </div>
                            <div>
                                <p>Gender</p>
                                <p className='text-richblack-100'>{user?.additionalDetails?.gender ?? "Add Your Gender"}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p>Last Name</p>
                                <p className='text-richblack-100'>{user.lastName}</p>
                            </div>
                            <div>
                                <p>Phone Number</p>
                                <p className='text-richblack-100'>{user.contactNumber}</p>
                            </div>
                            <div>
                                <p>Date of Birth</p>
                                <p className='text-richblack-100'>{user?.additionalDetails?.dateOfBirth ?? "Enter Date of Birth"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <EditBtn/>
            </div>
        </div>
    </div>
  )
}

export default MyProfile