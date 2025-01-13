import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getInstructorDashboardDetails } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {

    const [courses,setCourses] = useState([]);
    const [instructorData,setInstructorData] = useState(null);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [loading,setLoading] = useState(false);

    const totalAmount = instructorData?.reduce((acc,curr) => acc += curr.totalAmountGenerated,0);
    const totalStudents = instructorData?.reduce((acc,curr) => acc += curr.totalStudentsEnrolled,0);

    useEffect(() => {
        const getInstructorDetailsWithStats = async() => {
            setLoading(true);
            const instructorApiData = await dispatch(getInstructorDashboardDetails(token));
            console.log("instructor dashboard data -> ",instructorApiData);

            const coursesData = await dispatch(getAllCourses(token));
            console.log("courses data -> ",coursesData);

            if(instructorApiData){
                setInstructorData(instructorApiData);
            }

            if(coursesData?.length){
                setCourses(coursesData[0]);
            }
            setLoading(false);
        }

        getInstructorDetailsWithStats();
    },[dispatch,token]);

  return (
    <div className='text-richblack-5'>
        <div>
            <p>Hi {user?.firstName}<span className='text-xl'>👋</span></p>
            <p>Let's start something new.</p>
        </div>
        {
            loading ? (
                <div className='spinner'></div>
            ) : (
                <div>
                    {
                        courses.length > 0 ? (
                            <div className='flex flex-col gap-3'>
                                <div className='flex w-full justify-between gap-2'>
                                    {instructorData && <InstructorChart courses={instructorData}/>}
                                    <div className='w-[20%] flex flex-col gap-4 rounded bg-richblack-800 p-3'>
                                        <p className='text-xl font-semibold'>Statistics</p>
                                        <div className='flex flex-col'>
                                            <p className='text-richblack-100'>Total Courses</p>
                                            <p className='text-3xl  text-richblack-25 font-semibold'>{courses.length}</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-richblack-100'>Total Students</p>
                                            <p className='text-3xl  text-richblack-25 font-semibold'>{totalStudents}</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-richblack-100'>Total Earnings</p>
                                            <p className='text-3xl text-richblack-25 font-semibold'>Rs. {totalAmount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 rounded bg-richblack-800 p-3'>
                                    {/* Render 3 Courses */}
                                    <div className='flex justify-between'>
                                        <p className='font-bold text-lg'>Your Courses</p>
                                        <Link to={"/dashboard/my-courses"} className='text-yellow-50 font-medium cursor-pointer'>view all</Link>
                                    </div>
                                    <div className='flex gap-3'>
                                        {
                                            courses && courses.splice(0,3).map((course,index) =>(
                                                <div key={index} className='flex flex-col'>
                                                    <img src={course?.thumbnail} alt='courseThumbnail' className='object-cover lg:min-h-[184.05px] lg:min-w-[327.2px]'/>
                                                    <p>{course.name}</p>
                                                    <div className='flex gap-1 text-richblack-200'>
                                                        <p>Students: {course?.studentsEnrolled?.length}</p>
                                                        <p> | </p>
                                                        <p>Rs. {course?.price}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='text-center'>
                                <p className='text-xl'>You have not created any courses yet.</p>
                                <Link to={"/dashboard/add-course"} className='text-yellow-50 font-medium cursor-pointer'>Create your first course</Link>
                            </div>
                        )
                    }
                </div>
            )
        }

    </div>
  )
}

export default Instructor