import React from 'react'
import footerLogo from '../../assets/Logo/Logo-Full-Light.png';
import { SiFacebook } from "react-icons/si";
import { FaGoogle } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";
import { FooterLink2 } from '../../data/footer-links';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='border-t border-t-richblack-600'>
        <div className='flex flex-col bg-richblack-800 text-richblack-300'>
            <div className='lg:w-11/12 mx-auto flex flex-row justify-between border-b border-b-richblack-600 pt-24 px-10 lg:px-24 pb-10'>
                <div className='md:w-[50%] flex flex-col md:flex-row gap-10 mr-3 md:mr-10 lg:border-r border-r-richblack-600'>
                    <div className='flex flex-col space-y-2'>
                        <img src={footerLogo} alt='fotter logo' className=''/>
                        <p className='text-richblack-5'>Company</p>
                        <p>About</p>
                        <p>Carrier</p>
                        <p>Affiliates</p>
                        <div className='flex flex-row gap-6 text-2xl'>
                            <SiFacebook />
                            <FaGoogle />
                            <FaXTwitter />
                            <ImYoutube />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-richblack-5'>Resources</p>
                            <p>Article</p>
                            <p>Blog</p>
                            <p>Chart Sheet</p>
                            <p>Code Challenges</p>
                            <p>Docs</p>
                            <p>Projects</p>
                            <p>Videos</p>
                            <p>Workplaces</p>
                        </div>
                        <div>
                            <p className='text-richblack-5 '>Support</p>
                            <p>Help Center</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-richblack-5'>Plans</p>
                            <p>Paid Membership</p>
                            <p>For Students</p>
                            <p>Bussiness Solutions</p>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-richblack-5'>Community</p>
                            <p>Forums</p>
                            <p>Chapters</p>
                            <p>Events</p>
                        </div>
                    </div>
                </div>

                <div className='md:w-[50%] flex flex-col md:flex-row gap-10 pl-5'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-richblack-5'>{FooterLink2[0].title}</p>
                        {FooterLink2[0].links.map((sub,index) => (
                            <Link to={sub.link} key={index} className='hover:text-richblack-25'>{sub.title}</Link>
                        ))}
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-richblack-5'>{FooterLink2[1].title}</p>
                            {FooterLink2[1].links.map((sub,index) => (
                                <Link to={sub.link} key={index} className='hover:text-richblack-25'>{sub.title}</Link>
                            ))}
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-richblack-5'>{FooterLink2[2].title}</p>
                            {FooterLink2[2].links.map((sub,index) => (
                                <Link to={sub.link} key={index} className='hover:text-richblack-25'>{sub.title}</Link>
                            ))}
                    </div>
                </div>
            </div>

            <div className='w-11/12 mx-auto flex flex-col lg:flex-row justify-between mb-10'>
                <div className='flex justify-center lg:justify-start flex-row p-2'>
                    <p className='border-r border-r-richblack-600 pr-2'>Privacy Policy</p>
                    <p className='border-r border-r-richblack-600 pr-2 pl-2'>Cookie Policy</p>
                    <p className='pl-2'>Terms</p>
                </div>
                <div className='p-2'>
                    <p className='text-center'>Made With Love ❤️ Codedaksh © 2024 StudyNotion</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer