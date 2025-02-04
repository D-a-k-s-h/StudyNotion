import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import countryCode from '../data/countrycode.json'
import { changePassword, deleteAccount, updateDisplayPicture, updateProfile } from '../services/operations/settingsAPI';
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import toast from 'react-hot-toast';
import ConfirmationModal from '../components/Common/ConfirmationModal';


const Settings = () => {

    //change password -> confirm password
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password,setPassword] = useState(false);
    const [confirmPassword,setConfirmPassword] = useState(false);
    const [previewSource, setPreviewSource] = useState(null);
    const [image,setImage] = useState(null);
    const [confirmationModal,setConfirmationModal] = useState(null);

    const{
        register,
        reset,
        formState:{errors,isSubmitSuccessful},
        handleSubmit
    } = useForm();


    const HandleInformationChange = async(data) => {
        
        console.log("DATA -> ",data);

        const {
            displayName,
            about,
            dateOfBirth,
            gender,
            profession
        } = data;

        const firstName = displayName.split(" ").at(0);
        const lastName = displayName.split(" ").at(1);

        // console.log("firstName -> ",firstName);
        // console.log("lastName -> ",lastName);

        dispatch(updateProfile(firstName,lastName,about,gender,dateOfBirth,profession,token));
    }

    const handlePasswordChange = (data) => {

        console.log("HANDLE PASSWORD CHANGE DATA -> ",data);

        const {
            currentPassword,
            confirmPassword
        } = data;

        if(currentPassword && confirmPassword){
            dispatch(changePassword(currentPassword,confirmPassword,confirmPassword,token));
        }
    }

    const handleChangeDisplayPicture = () => {
        const formData = new FormData();
        formData.append("newProfileImage",image);
        dispatch(updateDisplayPicture(token, formData));
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    function handlePreview(e){
        const file = e.target.files[0];
        console.log("FILE -> ",file);
        if(file){
            setImage(file);
            previewFile(file);
        }
    }

    function informationResetHandler(){
        reset({
            displayName:`${user?.firstName} ${user?.lastName}`,
            about: user?.additionalDetails?.about,
            dateOfBirth: user?.additionalDetails?.dateOfBirth,
            gender: user?.additionalDetails?.gender,
            contactNumber: user?.contactNumber,
            profession: user?.additionalDetails?.profession
        });
        toast.success("Changes Discarded");
    }

    function passwordResetHandler(){
        reset({
            currentPassword:"",
            confirmPassword:""
        });
        toast.success("Changes Discarded");
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                about: user?.additionalDetails?.about,
                dateOfBirth: user?.additionalDetails?.dateOfBirth,
                gender: user?.additionalDetails?.gender,
                contactNumber: user?.contactNumber,
                profession: user?.additionalDetails?.profession,
                currentPassword:"",
                confirmPassword:""
            });
        }
    },[isSubmitSuccessful,reset,user]);

  return (
    <div className='overflow-x-hidden text-richblack-25 flex flex-col gap-10'>
        <div>
            <button onClick={() => navigate(-1)} className='text-richblack-300 flex items-center gap-2'>
                <MdKeyboardArrowLeft/>
                Back
            </button>
            <p className='text-3xl mt-3 text-richblack-5'>Edit Profile</p>
        </div>
        <div className='flex flex-col gap-10'>
            {/* Change Display Picture Section */}
            <div className='w-full md:w-[80%] lg:w-[70%] mx-auto flex flex-col text-center md:text-left md:flex-row gap-3 items-center border border-richblack-600 bg-richblack-800 p-5 rounded-lg'>
                <img src={previewSource || user?.image} alt='userImage' className='rounded-full w-[4rem] h-[4rem] object-cover'/>
                <div className='flex flex-col gap-2'>
                    <p className='text-richblack-5'>Change Profile Picture</p>
                    <div className='flex gap-3'>
                        <label htmlFor='changePicture' className='bg-richblack-700 text-richblack-5 py-1 px-3 border border-richblack-500 rounded inline-block cursor-pointer'>
                            <input 
                                type='file' 
                                name='changePicture'
                                id='changePicture' 
                                accept='image/jpg, image/png, image/webp, image/jpeg' 
                                className='hidden'
                                onChange={handlePreview}
                            />
                            Change
                        </label>
                        <button onClick={handleChangeDisplayPicture} className='bg-yellow-25 text-richblack-900 rounded py-1 px-3 flex gap-1 items-center'><LuUpload/>Upload</button>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className='flex flex-col gap-6'>

                {/* Information Change Form */}
                <form onSubmit={handleSubmit(HandleInformationChange)}>
                    <div className='w-full md:w-[80%] lg:w-[70%] mx-auto flex flex-col gap-4 border border-richblack-600 bg-richblack-800 p-3 md:p-5 rounded-lg'>
                        <p className='text-richblack-5'>Profile Information</p>
                        <div className='flex flex-col md:flex-row md:items-center'>
                            <div className='md:w-[50%] flex flex-col gap-4'>
                                <div className='flex flex-col'>
                                    <label htmlFor='displayName'>Display Name</label>
                                    <input 
                                        className='md:w-[91%] text-richblack-100 bg-richblack-700 p-2 rounded-md border-b border-b-richblack-400'
                                        type='text' 
                                        name='displayName'
                                        defaultValue={`${user?.firstName} ${user?.lastName}`}
                                        {...register("displayName")}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='dateOfBirth'>Date Of Birth</label>
                                    <input 
                                        className='w-full md:w-[91%] text-[#000814] bg-[#D3CCC0] p-2 rounded-md border-b border-b-richblack-400'
                                        type='date' 
                                        name='dateOfBirth'
                                        defaultValue={user?.additionalDetails?.dateOfBirth}
                                        {...register("dateOfBirth")}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='contactNumber'>Phone Number</label>
                                    <div className='flex flex-row gap-2'>
                                        <select {...register("countryCode")} className='w-[50%] md:w-[18%] text-richblack-100 bg-richblack-700 p-2 rounded-md border-b border-b-richblack-400'>
                                            {countryCode.map((element,index) => (
                                                <option key={index} value={element.code}>{element.code} - {element.country}</option>
                                            ))}
                                        </select>
                                        
                                        <input type='tel'
                                            className='w-full md:w-[70%] text-richblack-100 bg-richblack-700 p-2 rounded-md border-b border-b-richblack-400'
                                            name='contactNumber' 
                                            placeholder='Phone Number'
                                            required
                                            defaultValue={user?.contactNumber}
                                            {...register("contactNumber",{maxLength:{value:10,message:"Invalid Phone Number"},minLength:{value:8,message:"Invalid Phone Number"}})}
                                        />
                                    </div>
                                    {
                                        errors.contactNumber && (<span>Invalid Mobile Number</span>)
                                    }
                                </div>
                            </div>
                            <div className='md:w-[50%] flex flex-col gap-4'>
                                <div className='flex flex-col'>
                                    <label htmlFor='profession'>Profession</label>
                                    <input
                                        className='md:w-[91%] text-richblack-100 bg-richblack-700 p-2 rounded-md border-b border-b-richblack-400'
                                        type='text' 
                                        name='profession'
                                        defaultValue={user?.additionalDetails?.profession}
                                        placeholder='Enter Your Profession'
                                        {...register("profession")}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='name'>Gender</label>
                                    <div className='md:w-[91%] flex flex-col md:flex-row justify-around border-b border-b-richblack-500 rounded p-[0.58rem] bg-richblack-700'>
                                        <div className='flex flex-row justify-between md:justify-start items-center gap-1'>
                                            <label htmlFor='male'>Male</label>
                                            <input 
                                                type='radio'
                                                name='gender'
                                                value={"Male"}
                                                id='male'
                                                defaultChecked
                                                {...register('gender',{required:true})}
                                                className='appearance-none h-4 w-4 border border-richblack-400 rounded-full checked:bg-yellow-25 checked:border-transparent focus:outline-none'
                                            />
                                        </div>
                                        <div className='flex flex-row justify-between md:justify-start items-center gap-1'>
                                            <label htmlFor='female'>Female</label>
                                            <input 
                                                type='radio' 
                                                name='gender' 
                                                value={"Female"} 
                                                id='female' 
                                                {...register('gender',{required:true})}
                                                className='appearance-none h-4 w-4 border border-richblack-400 rounded-full checked:bg-yellow-25 checked:border-transparent focus:outline-none'
                                            />
                                        </div>
                                        <div className='flex flex-row justify-between md:justify-start items-center gap-1'>
                                            <label htmlFor='other'>Other</label>
                                            <input 
                                                type='radio' 
                                                name='gender' 
                                                value={"Other"} 
                                                id='other' 
                                                {...register('gender',{required:true})}
                                                className='appearance-none h-4 w-4 border border-richblack-400 rounded-full checked:bg-yellow-5 checked:border-transparent focus:outline-none'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='about'>About</label>
                                    <input 
                                        defaultValue={user?.additionalDetails?.about} 
                                        className='md:w-[91%] text-richblack-100 bg-richblack-700 p-2 rounded-md border-b border-b-richblack-400' 
                                        type='text' 
                                        name='about' 
                                        placeholder='Enter your bio'
                                        {...register("about")}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='w-full md:w-[80%] lg:w-[70%] mx-auto mt-5 flex justify-end flex-row gap-3'>
                        <p onClick={informationResetHandler} className='bg-richblack-800 p-2 border-r border-r-richblack-600 border-b cursor-pointer border-richblack-600 rounded text-richblack-5'>Cancel</p>
                        <button type='submit' className='bg-yellow-25 border-b-2 border-yellow-5 border-r-2 border-r-yellow-5 text-richblack-900 rounded py-2 px-3'>Save Changes</button>
                    </div>
                </form>
                                    
                {/* Password Change Form */}
                <form onSubmit={handleSubmit(handlePasswordChange)}>
                    <div className='w-full md:w-[80%] lg:w-[70%] mx-auto flex flex-col gap-4 border border-richblack-500 bg-richblack-800 rounded-md p-4'>
                        <p className='text-richblack-5'>Password</p>
                        <div className='flex flex-col md:flex-row items-center gap-5 md:gap-10'>
                            <div className='w-full md:w-[50%] flex flex-col relative'>
                                <label htmlFor='currentPassword'>Current Password</label>
                                <input 
                                    type={password ? 'text' : 'password'} 
                                    name='currentPassword' 
                                    placeholder='Enter current password'
                                    className='text-richblack-100 bg-richblack-700 p-2 rounded-md border-b border-b-richblack-400'
                                    {...register("currentPassword")}
                                />
                                <p className='absolute top-9 right-4 cursor-pointer' onClick={() => setPassword(!password)}>{password ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}</p>
                            </div>
                            <div className='w-full md:w-[50%] flex flex-col relative'>
                                <label htmlFor='confirmPassword'>Change Password</label>
                                <input 
                                    type={confirmPassword ? 'text' : 'password'} 
                                    name='confirmPassword' 
                                    placeholder='Enter new password'
                                    className='text-richblack-100 bg-richblack-700 p-2 rounded-md border-b border-b-richblack-400'
                                    {...register("confirmPassword")}
                                />
                                <p className='absolute top-9 right-4 cursor-pointer' onClick={() => setConfirmPassword(!confirmPassword)}>{confirmPassword ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-[80%] lg:w-[70%] mx-auto mt-4 flex justify-end flex-row gap-3'>
                        <p onClick={passwordResetHandler} className='bg-richblack-800 flex items-center p-2 border-r border-r-richblack-600 border-b cursor-pointer border-richblack-600 rounded text-richblack-5'>Cancel</p>
                        <button type='submit' className='bg-yellow-25 border-b-2 border-yellow-5 border-r-2 border-r-yellow-5 text-richblack-900 rounded py-2 px-3'>Change Password</button>
                    </div>
                </form>

                {/* Delete Profile Form */}
                <div className='w-full md:w-[80%] lg:w-[70%] mx-auto rounded-md border border-[#e03f3fc9] bg-[#340019] p-4 flex flex-col items-center md:items-start md:flex-row gap-5'>
                    <MdDelete className='w-[4rem] h-[4rem] text-4xl bg-[#691432] text-[#ef476f] rounded-full p-3'/>
                    <div className='flex flex-col gap-3'>
                        <p className='text-2xl font-semibold'>Delete Account</p>
                        <p>Would you like to delete account?</p>
                        <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                        <p className='italic text-[#D43D63] cursor-pointer' onClick={() => setConfirmationModal({
                            heading:"Are You Sure?",
                            para:"Your account will be deleted permanently with all enrolled courses.",
                            textBtn1:"Delete",
                            textBtn2:"Cancel",
                            textBtn1Action:() => dispatch(deleteAccount(token,navigate)),
                            textBtn2Action:() => setConfirmationModal(null)
                        })}>I want to delete my account.</p>
                    </div>
                </div>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Settings