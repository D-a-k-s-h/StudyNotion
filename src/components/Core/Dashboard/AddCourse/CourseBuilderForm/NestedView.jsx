import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/sectionAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from "react-icons/rx";
import { FaCloudArrowUp } from 'react-icons/fa6';
import Upload from '../../Upload';


const SubSectionModal = ({
    modalData, setModalData, add = false, view = false, edit = false
}) => {

    const {
        handleSubmit, 
        formState: { errors }, 
        setValue, 
        getValues, 
        register
    } = useForm();

    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.title !== modalData.title ||
            currentValues.description !== modalData.description ||
            currentValues.videoFile !== modalData.videoURL) {
            return true;
        }
        else {
            return false;
        }
    };

    const handleEditSubSection = async () => {
        const currentValues = getValues();

        const formData = new FormData();

        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id)

        if (currentValues.title !== modalData.title) {
            formData.append("title", currentValues.title);
        }
        if (currentValues.description !== modalData.description) {
            formData.append("description", currentValues.description);
        }
        if (currentValues.videoFile !== modalData.videoFile) {
            formData.append("videoFile", currentValues.videoFile);
        }

        const result = await dispatch(updateSubSection(formData, token));
        console.log("updating sub-section result -> ", result);

        if(result) {
            //updating course using new subSection data
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
            const updatedCourse = {...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);
    };

    const submitHandler = async (data) => {
        console.log("sub section submit data -> ", data);

        if(view) {
            return;
        }

        if(edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made");
            }
            else {
                //edit form data
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        console.log("video file in form data -> ",data.videoFile);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("sectionId", modalData);
        formData.append("videoFile", data.videoFile);

        const result = await dispatch(createSubSection(formData, token));
        console.log("creating sub-section result -> ", result);

        if (result) {
            //updating course using new subSection data
            const updatedCourseContent = course?.courseContent.map((section) => section._id === modalData ? result : section);
            const updatedCourse = {...course, courseContent:updatedCourseContent}
            console.log("Updated course -> ",updatedCourse);
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);
    };

    useEffect(() => {
        if (view || edit) {
            setValue("title", modalData.title);
            setValue("description", modalData.description);
            setValue("videoFile", modalData.videoURL);
        }
    },[]);

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='flex flex-col w-full md:w-[32rem] lg:w-[32rem] border border-richblack-500 bg-richblack-800 rounded-md'>
                <div className='flex justify-between rounded-t-md border-b border-b-richblack-500 items-center bg-richblack-700 p-2'>
                    <p>{add && 'Adding'} {edit && 'Editing'} {view && 'Viewing'} Lecture</p>
                    <RxCross1 className='cursor-pointer hover:text-red' onClick={() => setModalData(null)} />
                </div>

                <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4 p-3 md:p-7'>
                    <Upload
                        name={"videoFile"}
                        label={"Lecture video"}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoURL : null}
                        editData={edit ? modalData.videoURL : null}
                    />
                    <div className='flex flex-col'>
                        <label htmlFor='title'>Lecture Title<sup className='text-red'>*</sup></label>
                        <input
                            name='title'
                            type='text'
                            readOnly={view ? true : false}
                            className='bg-richblack-700 text-richblack-5 rounded p-2 border-b border-b-richblack-500'
                            placeholder='Enter lecture title'
                            {...register("title", { required: true })} />
                        {errors.title && (
                            <span className='text-red'>Please enter title of the lecture</span>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='description'>Lecture Description</label>
                        <textarea
                            name='description'
                            placeholder='Enter lecture description'
                            readOnly={view ? true : false}
                            className='bg-richblack-700 text-richblack-5 rounded p-2 border-b border-b-richblack-500'
                            {...register("description", { required: true })} />
                        {errors.description && (
                            <span>Please enter description of the lecture</span>
                        )}
                    </div>

                    {!view && (
                        <div className='flex gap-3 justify-end'>
                            <button onClick={() => setModalData(null)} className='rounded-md bg-richblack-700 border border-richblack-500 py-2 px-4' type='button'>Cancel</button>
                            <button className='rounded-md bg-yellow-25 text-richblack-900 py-2 px-4' type='submit'>{edit ? 'Save changes' : 'Save'}</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default SubSectionModal