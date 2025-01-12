import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete, MdEdit } from 'react-icons/md';
import ConfirmationModal from '../../../../Common/ConfirmationModal';
import { TiPlus } from "react-icons/ti";
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/sectionAPI';
import { setCourse } from '../../../../../slices/courseSlice';



const NestedView = ({handleChangeEditSectionName}) => {

    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();

    const [addSubSection,setAddSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);
    const [viewSubSection,setViewSubSection] = useState(null);
    const [confirmationModal,setConfirmationModal] = useState(null);

    const handleDeleteSection = async(sectionId) => {
        const result = await dispatch(deleteSection(
            {
                sectionId:sectionId,
                courseId:course._id
            },
            token
        ))

        if(result){
            dispatch(setCourse(result));
        }

        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async(subSectionId,sectionId) => {
        //console.log("Course id at delete sub-section",course._id);
        const result = await dispatch(deleteSubSection(
            {
                subSectionId:subSectionId,
                sectionId:sectionId
            },
            token
        ))

        if(result){
            //updating course using new subSection data
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)
            const updatedCourse = {...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }

    useEffect(() => {
        console.log("course ->",course)
    },[]);

  return (
    <div>
        <div className='text-richblack-200 bg-richblack-700 border border-richblack-600 p-4 rounded-md'>
            <div className='flex flex-col gap-5' >
                {
                    course?.courseContent.map((section,index) => (
                        <details key={index} open className='group flex flex-col gap-3 border-b border-b-richblack-500'>
                            <summary className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <RxDropdownMenu className='text-2xl'/>
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className='flex flex-row items-center gap-1'>
                                    <div className='flex gap-1 pr-1 border-r border-r-richblack-500'>
                                        <button className='hover:text-richblack-25 transition-all duration-200' onClick={() => handleChangeEditSectionName(section._id,section.sectionName)}><MdEdit className='text-xl'/></button>
                                        <button className='hover:text-[#e15656] transition-all duration-200' onClick={() => {
                                            setConfirmationModal({
                                                heading:"Are You Sure?",
                                                para:"All the lectures in the section will be deleted.",
                                                textBtn1:"Delete",
                                                textBtn2:"Cancel",
                                                textBtn1Action:() => handleDeleteSection(section._id),
                                                textBtn2Action:() => setConfirmationModal(null)
                                            })
                                        }}><MdDelete className='text-xl'/></button>
                                    </div>
                                    <IoMdArrowDropdown className='rotate-90 cursor-pointer group-open:rotate-0 text-richblack-300 text-2xl'/>
                                </div>
                            </summary>

                            <div className='flex flex-col gap-3'>
                                {
                                    section.subSection.map((data,index) => (
                                        <div key={index} onClick={() => setViewSubSection(data)} className='flex cursor-pointer justify-between pl-5 pr-7'>
                                            <div className='flex items-center gap-2'>
                                                <RxDropdownMenu className='text-2xl'/>
                                                <p className='inline-block'>{data.title}</p>
                                            </div>

                                            <div onClick={(e) => e.stopPropagation()} className='flex flex-row items-center gap-1'>
                                                <div className='flex gap-1 pr-1 border-r border-r-richblack-500'>
                                                    <button className='hover:text-richblack-5 z-10' onClick={() => setEditSubSection({...data,sectionId:section._id})}><MdEdit className='text-xl'/></button>
                                                    <button className='hover:text-[#e15656] transition-all z-10 duration-200' onClick={() => {
                                                        setConfirmationModal({
                                                            heading:"Are You Sure?",
                                                            para:"This lecture will be deleted.",
                                                            textBtn1:"Delete",
                                                            textBtn2:"Cancel",
                                                            textBtn1Action:() => handleDeleteSubSection(data._id,section._id),
                                                            textBtn2Action:() => setConfirmationModal(null)
                                                        })
                                                    }}><MdDelete className='text-xl'/></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button
                                    type='button'
                                    onClick={() => setAddSubSection(section._id)}
                                    className='flex items-center gap-1 font-semibold text-yellow-100'
                                >
                                    <TiPlus/>
                                    Add Lecture
                                </button>
                            </div>

                        </details>
                    ))
                }

            </div>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        {addSubSection && <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>}
        {viewSubSection && <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>}
        {editSubSection && <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>}
    </div>
  )
}

export default NestedView