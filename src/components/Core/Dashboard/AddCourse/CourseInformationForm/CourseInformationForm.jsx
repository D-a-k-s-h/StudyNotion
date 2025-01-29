import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { createCourse, editCourseDetails, getAllCategories } from '../../../../../services/operations/coursesAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import toast from 'react-hot-toast';
import ChipInput from './ChipInput';
import RequirementField from './RequirementField';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { setLoading } from '../../../../../slices/authSlices';
import { COURSE_STATUS } from '../../../../../utils/constants';
import Upload from '../../Upload';


const CourseInformationForm = () => {

    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const {course, editCourse} = useSelector((state) => state.course);
    const [image,setImage] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const fileInput = useRef(null);
    const {token} = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{isSubmitSuccessful,errors},
        reset
    } = useForm();

    const getCategories = async() => {
        const toastId = toast.loading("Fetching Categories...")
        const categories = await dispatch(getAllCategories());
        //console.log(categories[0]);
        if(categories[0].length > 0){
            setCategory(categories[0]);
        }
        toast.dismiss(toastId);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const previewHandler = (e) => {
        const file = e.target.files[0];
        if(file){
            previewFile(file);
            setImage(file);
        }
    }

    const isFormUpdated = () => {
        const currentValues = getValues();
        
        if(currentValues.name !== course.name || 
            currentValues.description !== course.description ||
            currentValues.price !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValues.category !== course.category ||
            currentValues.thumbnail !== course.thumbnail || 
            currentValues.instruction.toString() !== course.instructions.toString())
        {
            return true;
        }
        else{
            return false;
        }
    }

    const submitHandler = async(data) => {
        console.log("DATA -> ",data);
        //console.log("Tags",data.courseTags.toString());

        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                //console.log("Course Tags",currentValues.courseTags.toString());
                // console.log("instructions -> ",currentValues.courseTags);
                // console.log("course.tag -> ",course.tag);
                
                formData.append("courseId",course._id);
                if(currentValues.name !== course.name){
                    formData.append("name",data.name);
                }
                if(currentValues.description !== course.description){
                    formData.append("description",data.description);
                }
                if(currentValues.courseTags.toString() !== course.tag.toString()){
                    formData.append("tag",JSON.stringify(data.courseTags));
                }
                if(currentValues.whatYouWillLearn !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.whatYouWillLearn);
                }
                if(currentValues.category !== course.category){
                    formData.append("category",data.category);
                }
                if(currentValues.thumbnail !== course.thumbnail){
                    formData.append("thumbnail",image);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions",JSON.stringify(data.courseRequirements));
                }
                if(currentValues.price !== course.price){
                    formData.append("price",data.price);
                }

                setLoading(true);
                const result = await dispatch(editCourseDetails(formData,token));
                console.log("Edit form result",result);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No changes made");
            }
        }
        else{
            //create new course
            const formData = new FormData();
            formData.append("thumbnail",image);
            formData.append("name",data.name);
            formData.append("description",data.description);
            formData.append("price",data.price);
            formData.append("whatYouWillLearn",data.whatYouWillLearn);
            formData.append("tag",JSON.stringify(data.courseTags));
            formData.append("instructions",JSON.stringify(data.courseRequirements));
            formData.append("category",data.category);
            formData.append("status",COURSE_STATUS.DRAFT);

            setLoading(true);
            const result = await dispatch(createCourse(formData,token));
            console.log("Create form, result -> ",result);
            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result));
                //console.log("course -> ",course);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();

        //console.log("Course -> ",course);
        console.log("Edit course -> ",editCourse);
        // console.log(course?.tag);
        // console.log(course?.instructions);
        if(editCourse){
            setValue("name",course.name);
            setValue("description",course.description);
            setValue("price",course.price);
            setValue("courseTags",course.tag);
            setValue("whatYouWillLearn",course.whatYouWillLearn);
            setValue("category",course.category);
            setValue("thumbnail",course.thumbnail);
            setValue("courseRequirements",course.instructions);
            setPreviewSource(course.thumbnail);
        }
    },[]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-3 p-4 border border-richblack-700 bg-richblack-800 rounded-md'>
        <div className='flex flex-col'>
            <label htmlFor='name'>Course Title<sup className='text-[#f23e3e]'>*</sup></label>
            <input 
                type='text'
                name='name'
                placeholder='Enter course name'
                defaultValue={editCourse ? course.name : ''}
                className='p-2 bg-richblack-700 text-richblack-5 rounded-md border-b border-b-richblack-400'
                {...register("name",{required:true})}
            />
            {
                errors.name && (
                    <span className='text-[#eb3b3b]'>Please enter course title.</span>
                )
            }
        </div>
        <div className='flex flex-col'>
            <label htmlFor='courseDescription'>Course Description<sup className='text-[#f23e3e]'>*</sup></label>
            <textarea 
                name='courseDescription'
                placeholder='Enter course description'
                defaultValue={editCourse ? course.description : ''}
                {...register("description",{required:true})}
                className='min-h-[140px] p-2 bg-richblack-700 text-richblack-5 rounded-md border-b border-b-richblack-400'
            />
            {
                errors.description && (
                    <span className='text-[#eb3b3b]'>Please enter course description</span>
                )
            }
        </div>
        <div className='flex flex-col relative'>
            <label htmlFor='coursePrice'>Course Price<sup className='text-[#f23e3e]'>*</sup></label>
            <input
                type='text'
                placeholder='Enter price'
                name='coursePrice'
                defaultValue={editCourse ? course.price : ''}
                {...register("price",{required:true,valueAsNumber:true})}
                className='p-2 bg-richblack-700 pl-10 text-richblack-5 rounded-md border-b border-b-richblack-400'
            />
            <HiOutlineCurrencyRupee className='absolute text-2xl top-8 left-2 text-richblack-300'/>
            {
                errors.price && (
                    <span className='text-[#ec3434]'>please enter valid value.</span>
                )
            }
        </div>
        <div className='flex flex-col'>
            <label>Select Category <sup className='text-[#f23e3e]'>*</sup></label>
            <select {...register("category",{required:true})} defaultValue="" className='p-2 bg-richblack-700 text-richblack-5 rounded-md border-b border-b-richblack-400'>
                <option value="" disabled>Choose a category</option>
                {
                    category.map((element,index) => (
                        <option key={index} value={element._id}>{element.name}</option>
                    ))
                }
            </select>
            {
                errors.category && (
                    <span className='text-[#eb3b3b]'>Please specify category.</span>
                )
            }
        </div>
        <div>
            <ChipInput
                label='Tags'
                name='courseTags'
                register={register}
                errors={errors}
                placeholder='Enter tags and press enter'
                setValue={setValue}
                getValues={getValues}
            />
        </div>

        {/*Choose thumbnail*/}
        <Upload
            name="courseThumbnail"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
        />
        <div className='flex flex-col'>
            <label htmlFor='courseBenefits'>Enter Benefits of the course<sup className='text-[#e23b3b]'>*</sup></label>
            <textarea
                name='courseBenefits'
                placeholder='Enter Benefits of the course'
                defaultValue={editCourse ? course.whatYouWillLearn : ''}
                className='min-h-[140px] p-2 bg-richblack-700 text-richblack-5 rounded-md border-b border-b-richblack-400'
                {...register("whatYouWillLearn",{required:true})}
            />
            {
                errors.whatYouWillLearn && (
                    <span className='text-[#eb3b3b]'>Please enter benefits of the course.</span>
                )
            }
        </div>
        <div>
            <RequirementField
                name='courseRequirements'
                label='Requirements / instructions'
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
        </div>
        <div className='flex justify-end gap-2'>
            {
                editCourse && (
                    <div className='flex gap-2'>
                        <button onClick={() => dispatch(setStep(2))} className='bg-richblack-700 rounded-md border border-richblack-500 p-2'>Continue without saving</button>
                    </div>
                )
            }
            <button type='submit' className='py-2 px-4 text-richblack-900 bg-yellow-25 rounded-md'>{!editCourse ? 'Next' : 'Save changes'}</button>
        </div>
    </form>
  )
}

export default CourseInformationForm