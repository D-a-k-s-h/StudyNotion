import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countryCode from '../../../data/countrycode.json';
//import { apiConnector } from '../../../services/apiConnector';
import toast from 'react-hot-toast';

const ContactUsForm = () => {

    const [loading,setLoading] = useState(false);

    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("DATA -> ",data);
        setLoading(true);
        try{
            //const response = await apiConnector("POST");
            const response = {status:"OK"}
            console.log("RESPONSE -> ",response);
            toast.success("Message Sent");

        } catch(error){
            console.log("Error -> ",error);
        }
        setLoading(false);
    }

    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                contactNumber:"",
                firstName:"",
                lastName:"",
                message:""
            })
        }
        //reset is the dependency because when form structure changes form gets reset
    },[isSubmitSuccessful,reset])

  return (
    <div>
        {
            loading ? (
                <div class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-4 text-richblack-5'>
                    <div className='w-[100%] lg:flex justify-between'>
                        <div className='flex flex-col'>
                            <label htmlFor='firstName'>First Name</label>
                            <input
                                type='text' 
                                required 
                                placeholder='First Name' 
                                name='firstName' 
                                className='text-richblack-5 bg-richblack-800 p-3 border-b border-b-richblack-400 rounded-md'
                                //to register the field
                                {...register("firstName",{required:true})}
                            />
                            {
                                errors.firstName && (
                                    <span>Please enter your name.</span>
                                )
                            }
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input 
                                type='text' 
                                required 
                                placeholder='Last Name' 
                                name='lastName' 
                                className=' text-richblack-5 bg-richblack-800 p-3 rounded-md border-b border-b-richblack-400'
                                {...register("lastName")}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='email'>Email Address</label>
                        <input 
                            type='email' 
                            required 
                            placeholder='Enter email address' 
                            name='email' 
                            className='text-richblack-5 bg-richblack-800 p-3 rounded-md border-b border-b-richblack-400'
                            {...register("email",{required:true})}
                        />
                        {
                            errors.email && (
                                <span>Please enter your email</span>
                            )
                        }
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='contactNumber'>Phone Number</label>
                        <div className='flex flex-row gap-2'>
                            <select {...register("countryCode",{required:true})} className='w-[20%] text-richblack-5 bg-richblack-800 p-3 rounded-md border-b border-b-richblack-400'>
                                {countryCode.map((element,index) => (
                                    <option key={index} value={element.code}>{element.code} - {element.country}</option>
                                ))}
                            </select>
                            
                            <input type='tel' 
                                className='w-full text-richblack-5 bg-richblack-800 p-3 rounded-md border-b border-b-richblack-400' 
                                name='contactNumber' 
                                placeholder='Phone Number'
                                required
                                {...register("contactNumber",{maxLength:{value:10,message:"Invalid Phone Number"},minLength:{value:8,message:"Invalid Phone Number"}})}
                            />
                        </div>
                        {
                            errors.contactNumber && (
                                <span className='text-[#ef3e3e]'>Invalid Phone Number</span>
                            )
                        }
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label htmlFor='message'>Message</label>
                        <textarea 
                            placeholder='Enter Message' 
                            name='message' 
                            className='text-richblack-5 bg-richblack-800 p-3 rounded-md border-b border-b-richblack-400'
                            rows={4}
                            {...register("message",{required:true})}
                        >
                        {
                            errors.message && (
                                <span>Please enter your message.</span>
                            )
                        }        
                        </textarea>
                    </div>

                    <button type='submit' className='w-full bg-yellow-25 font-semibold text-richblack-900 p-3 rounded hover:scale-95 transition-all duration-200'>Send Message</button>

                </form>
            )
        }
    </div>
  )
}

export default ContactUsForm