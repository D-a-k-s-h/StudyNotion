import React, { useState } from 'react'
import loginImage from '../assets/Images/login.webp';
import frame from '../assets/Images/frame.png';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import AccountSelector from '../components/Common/AccountSelector';
import { useDispatch } from 'react-redux';
import { login } from '../services/operations/authAPI';
import { ACCOUNT_TYPE } from '../utils/constants';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isVisible,setIsVisible] = useState(false);
    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const[formData,setFormData] = useState({
        email:"",
        password:""
    })
    
    const{email,password} = formData;

    const setVisible = () => {
        setIsVisible(!isVisible);
    }

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(email,password,navigate));

        //Reset
        setFormData({
            email:"",
            password:""
        })

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
    <div className='w-11/12 max-w-maxContent mx-auto text-richblack-5 flex flex-row gap-10 my-28'>
        <div className='md:w-[56%] flex flex-col gap-5 mt-4'>
            <p className='text-4xl'>Welcome Back</p>
            <p className='md:w-[65%]'>Build skills for today,tomorrow and beyond. <span className='font-edu-sa italic text-blue-100'>Education to future proof your career.</span></p>
            
            <AccountSelector tabData={tabData} field={accountType} setField={setAccountType}/>

            <form onSubmit={handleSubmit} className='md:w-[65%] flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email'>Email Address <span className=' text-[#e53e3e] -ml-[0.2rem]'>*</span></label>
                    <input name='email' onChange={changeHandler} value={email} type='email' placeholder='Enter email address' required className='p-4 text-richblack-100 h-12 border-b border-b-richblack-500 bg-richblack-800 rounded-md'></input>
                </div>
                <div className='relative flex flex-col gap-2 mb-5'>
                    <label htmlFor='password'>Password <span className=' text-[#e53e3e] -ml-[0.2rem]'>*</span></label>
                    <input name='password' onChange={changeHandler} value={password} type={isVisible ? 'text' : 'password'} placeholder='Enter Password' required className='p-4 text-richblack-100 h-12 border-b border-b-richblack-500 bg-richblack-800 rounded-md'></input>
                    <p onClick={setVisible} className='absolute right-5 bottom-[2.4rem] text-richblack-500 cursor-pointer text-xl'>{isVisible ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}</p>
                    <Link to={"/resetpassword"} className='text-blue-100 text-xs text-right '>Forgot Password</Link>
                </div>
                <button type='submit' className='bg-yellow-25 text-richblack-900 w-full p-2 font-semibold rounded hover:scale-95 transition-all duration-200'>Login</button>
            </form>
        </div>
        <div className='relative hidden md:block w-[50%]'>
          <img className='absolute z-10' src={loginImage} alt='loginImage'/>
          <img className='absolute z-0 mt-5 ml-5' src={frame} alt='frame'/>
        </div>
    </div>
  )
}

export default Login