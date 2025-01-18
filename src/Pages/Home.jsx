import React from 'react'
import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/Core/Homepage/HighlightText';
import CTAButton from '../components/Core/Homepage/CTAButton';
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/Core/Homepage/CodeBlocks';
import LanguageLearningSection from '../components/Core/Homepage/LanguageLearningSection';
import TimeLineSection from '../components/Core/Homepage/TimeLineSection';
import InstructorSection from '../components/Core/Homepage/InstructorSection';
import SliderSection from '../components/Common/SliderSection';
import Footer from '../components/Common/Footer';
import ExploreMore from '../components/Core/Homepage/ExploreMore';


const Home = () => {
  return (
    <div>

        {/* section 1 */}
        <div className='relative text-white w-11/12 flex mx-auto flex-col items-center justify-between'>
            <div className='lg:w-1/2 mx-auto flex flex-col justify-center items-center gap-9'>
                <div>
                    <div className='group mt-10 lg:mt-16 w-fit mx-auto rounded-full font-semibold border-b border-b-richblack-700 bg-richblack-800 hover:outline outline-richblack-700 hover:scale-95 transition-all duration-200'>
                        <div className='text-sm lg:text-base flex items-center gap-2 p-2 transition-all duration-200 group-hover:bg-richblack-900'>
                            <Link to={'/signup'}>Become an Instructor</Link>
                            <FaChevronCircleRight/>
                        </div>
                    </div>

                </div>

                <div className='flex flex-col items-center gap-5'>
                    <p className=' text-4xl font-semibold'>Empower Your Future With<HighlightText text={"Coding Skills"}></HighlightText></p>
                    <p className='text-left lg:text-center text-richblack-200'>with our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands on projects, quizzes, and personalized feedback from the instructors.</p>
                </div>

                <div className='flex gap-3'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>
            </div>

            <div className='w-11/12 md:w-10/12 lg:w-8/12 my-12 shadow-[17px_17px_0px_0px_#ebf8ff]'>
                <video muted loop autoPlay>
                    <source src={banner} type='video/mp4'></source>
                </video>
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlocks position={"flex-col lg:flex-row"}
                            heading={
                                <div className='text-4xl font-semibold'>
                                    Unlock Your
                                    <HighlightText text={"Coding Potential"}/>
                                    With Our Online Courses
                                </div>
                            }
                            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}  
                            ctabtn1={
                                {
                                    btnText:"try it yourself",
                                    active:true,
                                    linkto:"/signup"
                                }
                            }
                            ctabtn2={
                                {
                                    btnText:"learn more",
                                    active:false,
                                    linkto:"/login"
                                }
                            }
                            codeblock={`<!DOCTYPE htm1>\n<htm1>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n/head>\nbody>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`} 
                            codeColor={'text-yellow-25'}
                            backgroundGradient={true}

                />
            </div>

            {/* Code Section 2 */}
            <div>
                <CodeBlocks position={"flex-col lg:flex-row-reverse"}
                            heading={
                                <div className='lg:w-[49%] text-4xl font-semibold'>
                                    Start
                                    <HighlightText text={`Coding in Second`}/>
                                </div>
                            }
                            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}  
                            ctabtn1={
                                {
                                    btnText:"Continue Lesson",
                                    active:true,
                                    linkto:"/login"
                                }
                            }
                            ctabtn2={
                                {
                                    btnText:"learn more",
                                    active:false,
                                    linkto:"/login"
                                }
                            }
                            codeblock={`<!DOCTYPE htm1>\n<htm1>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n/head>\nbody>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`} 
                            codeColor={'text-caribbeangreen-200'}
                            backgroundGradient={false}
                />
            </div>
            
            <ExploreMore/>

        </div>

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='h-[333px]'>
                <div className='w-11/12 h-full max-w-maxContent flex items-center justify-center gap-5 mx-auto'>
                    <div className='flex flex-row gap-9'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-2'>
                                Explore Full Catalog
                                <FaChevronCircleRight/>
                            </div>
                        </CTAButton>
                        <CTAButton linkto={"/signup"} active={false}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='w-11/12 max-w-fitContent mx-auto flex flex-col gap-7 items-center'>
                <div className='flex lg:flex-row flex-col justify-center items-center gap-3 lg:gap-20'>
                    <div className='text-3xl font-semibold lg:text-4xl lg:w-[40%]'>
                        Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                    </div>
                    <div className='flex flex-col gap-5 lg:w-[40%]'>
                        <div>
                            <p>The modern studynotion is the dictates in its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        </div>
                        <div className='w-fit'>
                            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        </div>
                    </div>
                </div>

                <TimeLineSection/>

                <LanguageLearningSection/>
            </div>
        </div>

        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent bg-richblack-900 flex flex-col text-white gap-8 items-center'>
            <InstructorSection/>
        </div>

        {/* Review Slider */}
        <div className='w-11/12 mx-auto text-richblack-5 flex items-center flex-col justify-center gap-4 py-20'>
            <h1 className='text-3xl md:text-4xl font-semibold'>Reviews From Other Learners</h1>
            <SliderSection/>
        </div>

        {/* footer */}
        <Footer/>

    </div>
  )
}

export default Home