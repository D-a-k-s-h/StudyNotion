import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getPasswordResetToken } from '../services/operations/authAPI';


const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const[emailSent,setEmailSent] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }

  return (
    <div className='w-full h-screen flex justify-center items-center text-richblack-5'>
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
            ) 
            : 
            (
                <div className='w-[25%] flex flex-col gap-5'>
                    <div className='text-3xl'>
                        {
                            !emailSent ? 'Reset Your Password' : 'Check Email'
                        }
                    </div>
                    <div>
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                        }
                    </div>

                    <form className='flex flex-col gap-3' onSubmit={handleOnSubmit}>
                        {
                            !emailSent && 
                            (
                                
                                <div className='flex flex-col'>
                                    <label htmlFor='email' className='flex'>Email Address<span className='text-[#ec3535]'>*</span></label>
                                    <input type='email' name='email' required value={email} onChange={(e) => (setEmail(e.target.value))} placeholder='Enter email address' className='p-2 rounded text-richblack-400 bg-richblack-800'></input>
                                </div>
                                
                            )
                        }

                        <button type='submit' className='w-full bg-yellow-25 p-2 text-richblack-900 rounded hover:scale-95 transition-all duration-200'>
                            {
                                !emailSent ? 'Reset Password' : 'Resend Email'
                            }
                        </button>
                    </form>

                    <Link to={"/login"} className='flex items-center gap-2'>
                        <MdKeyboardArrowLeft/>
                        Back to login
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword