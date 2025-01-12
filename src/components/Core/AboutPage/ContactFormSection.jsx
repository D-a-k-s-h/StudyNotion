import React from 'react'
import ContactUsForm from '../../Common/ContactUsPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='text-richblack-5 flex flex-col gap-2'>
      <p className='text-center text-3xl font-semibold'>Get in Touch</p>

      <p className='text-center text-richblack-200 mb-12'>We'd love to be here for you, Please fill out this form.</p>

      <ContactUsForm/>
    </div>
  )
}

export default ContactFormSection