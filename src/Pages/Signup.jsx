import React, { useState } from 'react'
import signupImage from '../assets/Images/signup.webp';
import frame from '../assets/Images/frame.png';
import AccountSelector from '../components/Common/AccountSelector';
import countryCode from '../data/countrycode.json';
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { ACCOUNT_TYPE } from '../utils/constants';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { setSignUpData } from '../slices/authSlices';

const Signup = () => {

    const [isVisible,setIsVisible] = useState(false);
    const [isVisible2,setIsVisible2] = useState(false);
    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formData,setFormData] = useState({
        email:"",
        firstName:"",
        lastName:"",
        password:"",
        confirmPassword:"",
        contactNumber:""
    });

    const {firstName,lastName,email,password,confirmPassword,contactNumber} = formData;

    function changeHandler(e){
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const setVisible = () => {
        setIsVisible(!isVisible);
    }

    const setVisible2 = () => {
        setIsVisible2(!isVisible2);
    }

    function submitHandler(e){
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Create Password and Confirm Password must be same");
        }

        const signUpData = {
            ...formData,
            accountType
        }

        //set sign up data 
        dispatch(setSignUpData(signUpData));
        //send otp to verify email
        dispatch(sendOtp(formData.email,navigate));

        //Reset
        setFormData({
            firstName:'',
            lastName:'',
            email:'',
            contactNumber:'',
            password:'',
            confirmPassword:''
        });

        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    const tabData = [
        {
            id:1,
            tabName:"Student",
            type:ACCOUNT_TYPE.STUDENT
        },
        {
            id:2,
            tabName:"Instructor",
            type:ACCOUNT_TYPE.INSTRUCTOR
        }
    ]


  return (
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-row my-20'>
        <div className='md:w-[56%] text-richblack-5 p-5'>
            <div className='mb-10'>
                <p className='md:w-[65%] text-3xl mb-3'>Join the millions learning to code with StudyNotion for free</p>
                <p className='md:w-[75%] text-richblack-200'>Build skills for today,tomorrow and beyond. <span className='font-edu-sa italic text-blue-100'>Education to future proof your career.</span></p>
            </div>

            <AccountSelector tabData={tabData} field={accountType} setField={setAccountType}/>

            <form onSubmit={submitHandler} className='md:w-[80%] flex flex-col gap-5'>
                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='flex flex-col'>
                        <label htmlFor='firstName'>First Name<sup className='text-red'>*</sup></label>
                        <input onChange={changeHandler} type='text' name='firstName' value={firstName} placeholder='Enter first name' required className='md:w-full  p-3 text-richblack-100 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='lastName'>Last Name<sup className='text-red'>*</sup></label>
                        <input onChange={changeHandler} type='text' value={lastName} name='lastName' placeholder='Enter last name' required className='md:w-full  p-3 text-richblack-100 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email'>Enter Email<sup className='text-red'>*</sup></label>
                    <input onChange={changeHandler} type='email' value={email} name='email' placeholder='Enter email address' required className='p-3 text-richblack-100 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                </div>
                <div>
                    <label htmlFor='countryCode'>Phone Number <sup className='text-red'>*</sup></label>
                    <div className='flex flex-row gap-2 md:gap-4'>
                        <select name='countryCode' className='w-[30%] md:w-[17%] p-3 bg-richblack-800 rounded-md border-b border-b-richblack-500'>
                            <option value={"India"}>+91 - India</option>
                            {countryCode.map((element,index) => (
                                <option value={element.country} key={index}>{element.code} - {element.country}</option>
                            ))}
                        </select>
                        <input type='tel' name='contactNumber' value={contactNumber} onChange={changeHandler} placeholder='Phone Number' required className='w-full p-3 bg-richblack-800 rounded-md border-b border-b-richblack-500'/>
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row gap-3'>
                    <div className='relative flex flex-col'>
                        <label htmlFor='password'>Create Password<sup className='text-red'>*</sup></label>
                        <input onChange={changeHandler} type={isVisible ? 'text' : 'password'} value={password} name='password' placeholder='Create Password' required className='md:w-full  p-3 text-richblack-100 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                        <p className='absolute right-6 top-10 cursor-pointer' onClick={() => {setVisible()}}>{isVisible ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</p>
                    </div>
                    <div className='relative flex flex-col'>
                        <label htmlFor='confirmPassword'>Confirm Password<sup className='text-red'>*</sup></label>
                        <input onChange={changeHandler} type={isVisible2 ? 'text' : 'password'} value={confirmPassword} name='confirmPassword' placeholder='Confirm Password' required className='md:w-full  p-3 text-richblack-100 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                        <p className='absolute right-6 top-10 cursor-pointer' onClick={() => {setVisible2()}}>{isVisible2 ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</p>
                    </div>
                </div>
                <button type='submit' className='rounded-md text-xl text-center p-3 bg-yellow-100 text-black hover:scale-95 transition-all duration-200'>Sign In</button>
            </form>
        </div>
        <div className='relative hidden md:block md:w-[50%]'>
            <img className='absolute z-10' src={signupImage} alt='SignUpImage'/>
            <img className='absolute z-0 mt-5 ml-5' src={frame} alt='frame'/>
        </div>
    </div>
  )
}

export default Signup