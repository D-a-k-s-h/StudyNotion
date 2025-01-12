import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../../../services/operations/profileAPI';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { LuClock9 } from "react-icons/lu";
import { deleteCourse } from '../../../../services/operations/coursesAPI';
import ConfirmationModal from '../../../Common/ConfirmationModal';
import { setCourse } from '../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formatDate } from '../../../../services/formatDate';

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [courses,setCourses] = useState([]);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    // const {editCourse} = useSelector((state) => state.course);

    const getCourseDetails = async() => {
        const response = await dispatch(getAllCourses(token));
        //console.log("Courses array -> ",response[0]);
        setCourses(response[0]);
        //console.log("Courses array -> ",courses);
    }

    const handleDeleteCourse = async(courseId) => {
        const result = await dispatch(deleteCourse(courseId,token));

        if(result){
            dispatch(setCourse(result));
        }
        getCourseDetails();
        setConfirmationModal(null);
    }

    useEffect(() => {
        getCourseDetails();
    },[]);

  return (
    <div className='flex flex-col gap-10 text-richblack-5 overflow-x-hidden'>
        <div className='w-full flex justify-between'>
            <p className='text-3xl'>My Courses</p>
            <button onClick={() => navigate("/dashboard/add-course")} type='button' className='flex items-center gap-1 text-richblack-900 bg-yellow-50 rounded-md p-2'>Add Course<FaPlus/></button>
        </div>

        <Table className='border border-richblack-700'>
            {/* BAR */}
            <Thead className='border-b border-b-richblack-700'>
                <Tr className='flex justify-around p-2'>
                    <Th className='w-[70%]'>Courses</Th>
                    <Th>Duration</Th>
                    <Th>Price</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>

            {/* Course Details */}
            <Tbody>
                {
                    courses === null ? (
                        <Tr>
                            <Td>No Courses Found</Td>
                        </Tr>
                    ) : (
                            courses.map((course,index) => (
                                <Tr key={index} className='flex gap-10 p-2 justify-center'>
                                    <Td className='w-[70%] lg:flex items-center gap-4'>
                                        <img src={course?.thumbnail} alt='CourseImage' className='lg:w-[35%] object-cover rounded-md'/>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-xl'>{course?.name}:</p>
                                            <p className='text-richblack-200'>{course?.description}</p>
                                            <p className='text-richblack-25 text-sm'>Created: {formatDate(course?.createdAt)}</p>
                                            <p>
                                                {
                                                    course?.status === COURSE_STATUS.DRAFT ? (
                                                        <div className='w-fit text-sm bg-richblack-700 rounded-full py-1 px-3 flex flex-row items-center justify-center text-pink-100 gap-1'><LuClock9/>Draft</div>
                                                    ) : (
                                                        <div className='w-fit text-sm bg-richblack-700 rounded-full py-1 px-3 flex flex-row items-center justify-center text-yellow-25 gap-1'><MdVerified/>Published</div>
                                                    )
                                                }
                                            </p>
                                        </div>
                                    </Td>
                                    <Td className='text-richblack-200'>2hr 30min</Td>
                                    <Td className='text-richblack-200'>₹{course?.price}</Td>
                                    <Td className='text-richblack-200'>
                                        <button><MdOutlineModeEdit onClick={() => navigate(`/dashboard/edit-course/${course?._id}`)} className='text-2xl hover:text-richblack-5 transition-all duration-200'/></button>
                                        <button onClick={() => setConfirmationModal({
                                            heading:"Do you want to delete this course?",
                                            para:"All data related to this course will be deleted.",
                                            textBtn1:"Delete",
                                            textBtn2:"Cancel",
                                            textBtn1Action: () => handleDeleteCourse(course?._id),
                                            textBtn2Action: () => setConfirmationModal(null)
                                        })}><MdDeleteOutline className='text-2xl hover:text-[#f65d5d] transition-all duration-200'/></button>
                                    </Td>
                                </Tr>
                            ))
                    )
                }
            </Tbody>
        </Table>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default MyCourses