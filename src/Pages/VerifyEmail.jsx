import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { sendOtp, signUp } from '../services/operations/authAPI';


const VerifyEmail = () => {

    const {loading,signUpData} = useSelector((state) => state.auth);
    const [otp,setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if(!signUpData){
            navigate("/signup");
        }
    },[]);

    const {email} = signUpData;

    function submitHandler(e){
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            contactNumber,
            email,
            password,
            confirmPassword
        } = signUpData;

        dispatch(signUp(firstName,lastName,contactNumber,accountType,password,confirmPassword,otp,email,navigate));
    }

  return (
    <div>
        {
            loading ? 
            (
                <div class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : (
                <div onSubmit={submitHandler} className='w-full h-screen flex justify-center items-center text-richblack-5'>
                    <div className='w-[25%] flex flex-col gap-4'>
                        <p className='text-3xl'>Verify Email</p>
                        <p className='text-richblack-200 mb-3'>A verification code has been sent to you. Enter the code below</p>
                        <form className='flex flex-col gap-6 items-center'>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => <input {...props}
                            className='w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50' />}
                        />

                            <button type='submit' className='w-full p-2 bg-yellow-25 text-richblack-900 rounded hover:scale-95 transition-all duration-200'>Verify Email</button>
                        </form>

                        <div className='w-full flex justify-between'>
                            <Link to={"/login"} className='flex items-center gap-2'>
                                <MdKeyboardArrowLeft/>
                                Back to login
                            </Link>
                            <div>
                                <button className='flex gap-2 items-center text-blue-100' onClick={() => dispatch(sendOtp(email,navigate))}><FaClockRotateLeft/>Resend it</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail