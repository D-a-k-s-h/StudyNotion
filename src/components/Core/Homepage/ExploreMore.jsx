import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText';
import { MdPeople } from "react-icons/md";
import { ImTree } from "react-icons/im";

const setTags = ["Free","New to coding","Most popular","Skills paths","Career paths"];

const ExploreMore = () => {

    const [currentTab,setCurrentTab] = useState(HomePageExplore[0].tag);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        if(setTags.includes(value)){
            setCurrentTab(value);
        }
        setCurrentCard(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className='relative'>
        <div className='flex flex-col gap-2'>
            <p className='lg:text-center text-4xl font-semibold text-richblack-5'>Unlock The <HighlightText text={"Power of code"}/></p>
            <p className='text-richblack-200 lg:text-center'>Learn to build anything you imagine.</p>
        </div>

        <div className='lg:w-[38%] hidden mx-auto bg-richblack-800 md:flex justify-around rounded-full gap-7 py-1 px-4 mt-10 -mb-7'>
            {HomePageExplore.map((element,index) => (
                <p className={`text-sm text-richblack-200 rounded-full cursor-pointer hover:text-richblack-5 transition-all duration-200  py-1 ${currentTab === element.tag ? 'text-richblack-5 bg-black p-2' : ''}`} onClick={() => setMyCard(element.tag)} key={index}>{element.tag}</p>
            ))}
        </div>

        <div className='relative top-20 flex md:flex-row flex-col justify-center gap-10'>
            {courses.map((element,index) => (
                <div className={`lg:w-[21%] flex flex-col gap-3 bg-richblack-800 py-5 ${currentCard === element.heading ? 'bg-white text-richblack-800 shadow-[11px_11px_0px_0px_#f6e05e] transition-all duration-200' : ''}`} onClick={() => setMyCard(element.heading)} key={index}>
                    <div className='font-semibold px-4'>{element.heading}</div>
                    <div className='text-sm text-richblack-500 px-4'>{element.description}</div>
                    <div className='flex flex-row justify-between mt-12 border-t-2 border-t-richblack-500 border-dashed pt-2'>
                        <p className={`flex gap-2 items-center text-sm font-medium px-4 pt-3 ${currentCard === element.heading ? 'text-blue-400' : 'text-richblack-200'} `}><MdPeople/> {element.level} </p>
                        <p className={`flex gap-2 px-4 pt-3 text-sm ${currentCard === element.heading ? 'text-blue-400' : 'text-richblack-200'} `}> <ImTree className='mt-[0.2rem]'/> {element.lessionNumber} Lessons</p>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default ExploreMore