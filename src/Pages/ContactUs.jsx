import React from 'react'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";
import ContactUsForm from '../components/Common/ContactUsPage/ContactUsForm';
import Footer from '../components/Common/Footer';


const ContactUs = () => {
  return (
    <div>
        <div className='w-full lg:w-11/12 p-3 md:p-10 lg:pl-24 mx-auto flex flex-col md:flex-row gap-10 py-10 md:my-20'>
            {/* Section 1 */}
            <section className='md:w-[50%] lg:w-[40%] h-fit text-richblack-5 flex flex-col gap-10 bg-richblack-800 p-7 rounded-xl'>

                <div className='flex flex-row gap-3'>
                    <div className='pt-1'>
                        <HiOutlineChatBubbleLeftRight className='text-xl text-richblack-200'/>
                    </div>
                    <div>
                        <p className='font-semibold text-lg'>Chat with us</p>
                        <p className='text-richblack-200'>Our friendly team is here to help.</p>
                        <p className='text-richblack-200'>@mail address</p>
                    </div>
                </div>

                <div className='flex flex-row gap-3'>
                    <div className='pt-1'>
                        <BsGlobeCentralSouthAsia className='text-richblack-200 text-xl'/>
                    </div>
                    <div>
                        <p className='font-semibold text-lg'>Visit us</p>
                        <p className='text-richblack-200'>Come and say hello at our office HQ.</p>
                        <p className='text-richblack-200'>Here is the location/ address</p>
                    </div>
                </div>
                <div className='flex flex-row gap-3'>
                    <div className='pt-1'>
                        <IoCallSharp className='text-xl text-richblack-200'/>
                    </div>
                    <div>
                        <p className='font-semibold text-lg'>Call us</p>
                        <p className='text-richblack-200'>Mon - Fri From 8am to 5pm</p>
                        <p className='text-richblack-200'>+91 9871876808</p>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className='w-full lg:w-[46%] text-richblack-5 border p-3 md:p-10 border-richblack-500 rounded-xl'>
                <div className='flex flex-col gap-2 mb-10'>
                    <p className='text-3xl font-semibold'>Got a Idea? We've got the skills. <br/> Let's team up</p>
                    <p className='text-richblack-200'>Tell us more about yourself and what you've got in mind.</p>
                </div>
                <ContactUsForm/>
            </section>
        </div>
        
        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default ContactUs