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
    <div className='w-11/12 flex mx-auto flex-row justify-between mt-28'>
        <div className='w-[49%] text-richblack-5 p-5'>
            <div className='mb-10'>
                <p className='w-[65%] text-3xl mb-3'>Join the millions learning to code with StudyNotion for free</p>
                <p className='w-[75%] text-richblack-200'>Build skills for today,tomorrow and beyond. <span className='font-edu-sa italic text-blue-100'>Education to future proof your career.</span></p>
            </div>

            <AccountSelector tabData={tabData} field={accountType} setField={setAccountType}/>

            <form onSubmit={submitHandler} className='flex flex-col gap-5 mb-10'>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        <label htmlFor='firstName'>First Name<sup className='text-[#e53939]'>*</sup></label>
                        <input onChange={changeHandler} type='text' name='firstName' value={firstName} placeholder='Enter First Name' required className='w-[90%] p-4 text-richblack-100 h-12 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='lastName'>Last Name<sup className='text-[#e53939]'>*</sup></label>
                        <input onChange={changeHandler} type='text' value={lastName} name='lastName' placeholder='Enter Last Name' required className='w-[90%] p-4 text-richblack-100 h-12 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email'>Enter Email<sup className='text-[#e53939]'>*</sup></label>
                    <input onChange={changeHandler} type='email' value={email} name='email' placeholder='Enter email address' required className='w-[74%] p-4 text-richblack-100 h-12 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='countryCode'>Phone Number <span className='text-[#e53e3e] -ml-[0.2rem]'>*</span></label>
                    <div className='flex gap-4'>
                        <select name='countryCode' className='w-[15%] h-12 p-2 bg-richblack-800 rounded-md border-b border-b-richblack-500'>
                            <option value={"India"}>+91</option>
                            {countryCode.map((element,index) => (
                                <option value={element.country} key={index}>{element.code}</option>
                            ))}
                        </select>
                        
                        <input type='tel' name='contactNumber' value={contactNumber} onChange={changeHandler} placeholder='Phone Number' required className='w-[56%] h-12 p-2 bg-richblack-800 rounded-md border-b border-b-richblack-500'/>
                    </div>

                    
                </div>
                <div className='flex flex-row'>
                    <div className='relative flex flex-col'>
                        <label htmlFor='password'>Create Password<sup className='text-[#e53939]'>*</sup></label>
                        <input onChange={changeHandler} type={isVisible ? 'text' : 'password'} value={password} name='password' placeholder='Create Password' required className='w-[90%] p-4 text-richblack-100 h-12 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                        <p className='absolute right-9 top-10 cursor-pointer' onClick={() => {setVisible()}}>{isVisible ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</p>
                    </div>
                    <div className='relative flex flex-col'>
                        <label htmlFor='confirmPassword'>Confirm Password<sup className='text-[#e53939]'>*</sup></label>
                        <input onChange={changeHandler} type={isVisible2 ? 'text' : 'password'} value={confirmPassword} name='confirmPassword' placeholder='Confirm Password' required className='w-[90%] p-4 text-richblack-100 h-12 border-b border-b-richblack-500 bg-richblack-800 rounded-md'/>
                        <p className='absolute right-9 top-10 cursor-pointer' onClick={() => {setVisible2()}}>{isVisible2 ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</p>
                    </div>
                </div>
                <button type='submit' className='w-[74%] rounded-md text-xl text-center p-3 bg-yellow-100 text-black hover:scale-95 transition-all duration-200'>Sign In</button>
            </form>
            
        </div>
        <div className='w-[50%] relative'>
            <img className='absolute z-10' src={signupImage} alt='SignUpImage'/>
            <img className='absolute z-0 mt-5 ml-5' src={frame} alt='frame'/>
        </div>
    </div>
  )
}

export default Signup