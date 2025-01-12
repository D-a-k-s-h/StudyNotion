import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';


const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [enrolledCourses,setEnrolledCourses] = useState(null);

    useEffect(() => {
        const getUserEnrolledCourses = async() => {
            try{
                const response = await dispatch(getEnrolledCourses(token));
                console.log("enrolled courses response -> ",response)
                setEnrolledCourses(response);
    
            } catch(error){
                console.log("error while fetching courses",error.message);
            }
        } 

        getUserEnrolledCourses();
    },[dispatch,token]);

  return (
    <div className='text-richblack-5 flex flex-col gap-10 overflow-x-hidden'>
        <div className='text-4xl'>Enrolled Courses</div>
        {
            !enrolledCourses ? (
                
                <div className="spinner"></div>
            ) 
            :enrolledCourses.length === 0 ? (<div className='text-center text-2xl mt-4 text-richblack-300'>You have not enrolled in any course yet.</div>) 
            :(
                <Table className='border border-richblack-700 rounded-t-md'>
                    <Thead className='border border-richblack-700'>
                        <Tr className='w-full p-2 bg-richblack-700'>
                            <Th className='w-[60%]'>Courses</Th>
                            <Th>Duration</Th>
                            <Th>Progress</Th>
                        </Tr>
                    </Thead>
                    {
                        enrolledCourses.map((course,index) => (
                            <Tbody key={index} className='border-b border-b-richblack-700'>
                                <Tr className='cursor-pointer' onClick={() => navigate(`/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)}>
                                    <Td className='md:flex gap-3 p-3'>
                                        <img src={course.thumbnail} alt='thumbnailImage' className='lg:w-[20%] md:w-[20%] object-fill rounded-xl'/>
                                        <div>
                                            <p className='font-medium'>{course.name}</p>
                                            <p className='text-richblack-200'>{`${course.description.split(" ").splice(0,200).join(" ")}`}</p>
                                        </div>
                                    </Td>

                                    <Td className='text-center'>{course?.totalDuration}</Td>

                                    <Td className='px-10'>
                                        <p>Progress: {course?.progressPercentage || 0}%</p>
                                        <ProgressBar
                                            completed={course?.progressPercentage || 0}
                                            maxCompleted={100}
                                            isLabelVisible={false}
                                            height='8px'
                                        />
                                    </Td>
                                </Tr>
                            </Tbody>
                        ))
                    }
                </Table>
            )
            
        }
    </div>
  )
}

export default EnrolledCourses