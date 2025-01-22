import React from 'react'
import HighlightText from '../components/Core/Homepage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import Quote from '../components/Core/AboutPage/Quote';
import FoundingStoryImage from '../assets/Images/FoundingStory.png';
import StatsComponent from '../components/Core/AboutPage/StatsComponent';
import LearningGrid from '../components/Core/AboutPage/LearningGrid';
import ContactFormSection from '../components/Core/AboutPage/ContactFormSection';
import Footer from '../components/Common/Footer';
import SliderSection from '../components/Common/SliderSection';

const Aboutus = () => {

  return (
    <div>
      {/* Section 1 */}
      <section className='bg-richblack-800 text-richblack-5 flex flex-col gap-5 md:pt-20 lg:pt-32'>
        <div className='md:w-[50%] px-5 md:px-0 pt-10 md:pt-0 text-3xl mx-auto md:text-center font-semibold'>
          Driving Innovation in Online Education for a
          <HighlightText text={"Brighter Future"}/>
        </div>

        <div>
          <p className='md:w-[52%] px-5 md:px-0 mx-auto md:text-center text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </div>
        <div className='relative flex flex-row gap-10 justify-center -mt-1'>
          <div className='absolute top-40 z-0 w-10 shadow-[0px_0px_100px_100px_#ed8936]'></div>
          <div className='relative top-16 flex flex-row gap-10'>
            <img src={BannerImage1} alt='BannerImage1'/>
            <img className='z-10 hidden md:block' src={BannerImage2} alt='BannerImage2'/>
            <img src={BannerImage3} className='hidden lg:block' alt='BannerImage3'/>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className='w-[85%] mx-auto my-28 mt-36'>
        <Quote/>
      </section>

      {/* Section 3 */}
      <section className='text-richblack-300 my-10 md:my-20 flex flex-col gap-10 md:gap-32'>
        <div className='flex flex-col gap-3 lg:gap-0 md:flex-row md:justify-between lg:justify-evenly items-center'>
            <div className='md:w-[55%] lg:w-[36%] px-5  flex flex-col gap-4'>
              <p className='text-3xl font-semibold bg-gradient-to-bl from-[#BF26B6] to-[#C82333] bg-clip-text text-transparent'>Our Founding Story </p>
              <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
              <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
            <div>
              <img className='lg:w-[100%] p-4 lg:pr-4' src={FoundingStoryImage} alt='FoundingStoryImage'/>
            </div>
        </div>

        <div className='flex flex-col md:flex-row justify-evenly items-center'>
          <div className='md:w-[35%] p-4 md:p-0 flex flex-col gap-4'>
            <p className='text-3xl font-semibold bg-gradient-to-b from-[#EA580C] to-[#FB923C] bg-clip-text text-transparent'>Our Vision</p>
            <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>
          <div className='md:w-[34%] p-4 md:p-0 flex flex-col gap-4'>
            <p className='text-3xl font-semibold bg-gradient-to-b from-[#14b1eb] to-[#56e5fc] bg-clip-text text-transparent'>Our Mission</p>
            <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className='bg-richblack-800 mb-20'><StatsComponent/></section>

      {/* Section 5 */}
      <section className='px-7 md:p-16'><LearningGrid/></section>

      {/* Section 6 */}
      <section className='md:w-[50%] lg:w-[33%] px-6 md:px-0 mx-auto mt-10 md:mt-20'><ContactFormSection/></section>

      {/* Section 7 */}
      <section className='text-richblack-5 w-11/12 mx-auto flex flex-col gap-7 justify-center items-center py-20'>
        <div className='text-4xl font-semibold'>Review From Other Learners</div>
        <SliderSection/>
      </section>

      {/* Footer */}
      <Footer/>

    </div>
  )
}

export default Aboutus