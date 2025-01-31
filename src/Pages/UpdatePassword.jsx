import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";



const UpdatePassword = () => {
    
    const dispatch = useDispatch();
    const location = useLocation()
    const {loading} = useSelector((state) => state.auth);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const[formData,setFormData] = useState({
        newPassword:'',
        confirmPassword:''
    })

    const {newPassword,confirmPassword} = formData;

    const showconfirmPasswordHandler = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    }

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(newPassword,confirmPassword,token));
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

            ) : (
                <div className='lg:w-[25%] md:w-[50%] p-10 md:p-0 flex flex-col gap-4'>
                    <p className='text-3xl font-semibold'>Choose New Password</p>
                    <p className='text-richblack-300'>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={submitHandler} className='flex flex-col gap-5'>
                        <div className='flex flex-col relative'>
                            <label htmlFor='newPassword' className='flex'>New Password<span className='text-[#dd3737]'>*</span></label>
                            <input onChange={changeHandler} value={newPassword} name='newPassword' type={showPassword ? 'text' : 'password'} required placeholder='New Password' className='p-2 rounded text-richblack-400 bg-richblack-800'></input>
                            <p className='absolute right-5 top-[2.1rem] text-xl cursor-pointer text-richblack-300' onClick={() => {showPasswordHandler()}}>{showPassword ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}</p>
                        </div>

                        <div className='flex flex-col relative'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input onChange={changeHandler} value={confirmPassword} name='confirmPassword' type={showConfirmPassword ? 'text' : 'password'} required placeholder='Confirm Password' className='p-2 rounded text-richblack-400 bg-richblack-800'></input>
                            <p className='absolute right-5 top-[2.1rem] text-xl cursor-pointer text-richblack-300' onClick={() => {showconfirmPasswordHandler()}}>{showConfirmPassword ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>}</p>
                        </div>

                        <button type='submit' className='w-full p-2 bg-yellow-25 rounded text-richblack-900 hover:scale-95 transition-all duration-200'>Reset Password</button>
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

export default UpdatePassword