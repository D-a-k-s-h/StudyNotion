import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import { PiPlusCircleBold } from "react-icons/pi";
import NestedView from './NestedView';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/sectionAPI';


const CourseBuilderForm = () => {

  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const [loading,setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  } = useForm();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName","");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course?.courseContent?.length === 0){
      toast.error("Please add atleast one section.");
      return;
    }
    if(course.courseContent.some((section) => section?.subSection?.length === 0)){
      toast.error('Please add atleast one lecture in each section');
      return;
    }

    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId,sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  const submitHandler = async(data) => {
    console.log("DATA -> ",data);
    console.log("Course -> ",course);
    //console.log("Edit section name",editSectionName);
    setLoading(true);
    let result = null;

    if(editSectionName){
      result = await dispatch(updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName
        },
        token
      ))
    }
    else{
      result = await dispatch(createSection(
        {
          sectionName:data.sectionName,
          courseId:course._id
        }
        ,token
      ))
    }

    //update details
    if(result){
      console.log("CREATING/UPDATING SECTION RESULT ->",result);
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }

    //set loading false
    setLoading(false);
  }

  return (
    <div className='bg-richblack-800 flex flex-col gap-4 border border-richblack-500 rounded-md p-3 md:p-6'>
      <p className='text-2xl font-semibold'>Course Builder</p>
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-6'>

        <div className='flex flex-col'>
          <label htmlFor='sectionName'>Section Name</label>
          <input
            name='sectionName'
            type='text'
            placeholder='Enter section name to get started'
            className='p-2 bg-richblack-700 rounded text-richblack-100 border-b border-b-richblack-500'
            {...register("sectionName",{required:true})}
          />
          {
            errors.sectionName && (
              <span className='text-[#e03131]'>Please enter section name.</span>
            )
          }
        </div>
        <div className='flex items-end gap-4'>
          <button type='submit' className='w-fit flex items-center gap-2 rounded-md font-semibold text-yellow-100 border border-yellow-100 p-3'>
            <PiPlusCircleBold className='text-lg'/>
            {editSectionName ? 'Edit section name' : 'Create Section'}
          </button>
          {
            editSectionName && (
              <button onClick={cancelEdit} type='button' className='text-richblack-100 hover:underline transition-all duration-200'>Cancel Edit</button>
            )
          }
        </div>
      </form>
      
      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex gap-4'>
        <button type='button' onClick={goBack} className='flex items-center gap-2 bg-richblack-700 border border-richblack-500 text-richblack-100 rounded-md py-2 px-4'><FaArrowLeftLong className='text-sm'/>Back</button>
        <button type='button' onClick={goToNext} className=' flex items-center gap-2 bg-yellow-50 text-richblack-900 rounded-md py-2 px-4'>Next<FaArrowRightLong/></button>
      </div>

    </div>
  )
}

export default CourseBuilderForm