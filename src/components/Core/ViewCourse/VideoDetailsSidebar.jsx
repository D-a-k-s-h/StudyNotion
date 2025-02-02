import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { FaPlay } from 'react-icons/fa6';


const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus,setActiveStatus] = useState(null);
    const [videoBarActive,setVideoBarActive] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId,subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLecture
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
      ;(() => {
        if(!courseSectionData?.length){
          return;
        }
        console.log("completedLecture -> ",completedLecture);
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
        
        const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        setVideoBarActive(activeSubSectionId);
      })()
    },[courseSectionData,courseEntireData,location.pathname]);

  return (
    <div className='relative min-h-[calc(100vh-3.5rem)] text-richblack-5 flex flex-col gap-6 lg:min-w-[222px] bg-richblack-800 border-r border-r-richblack-700'>
      {/* For buttons and headings */}
      <div className='flex flex-col gap-4 p-1 md:p-4 lg:p-6 border-b border-b-richblack-700'>
          <div className='flex flex-col md:flex-row gap-2 md:gap-5 lg:gap-10 justify-between'>
            <button className='flex gap-1 items-center text-richblack-200' onClick={() => navigate("/dashboard/enrolled-courses")}>
              <FaLongArrowAltLeft/>
              Back
            </button>

            <button className='p-1 md:p-2 bg-yellow-50 flex md:gap-1 items-center text-richblack-900 justify-center text-sm md:text-base rounded-md font-medium' onClick={() => setReviewModal(true)}>
              <AiOutlinePlusCircle className='hidden md:block text-lg'/> Add Review
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            <p>{courseEntireData?.name}</p>
            <p className={`text-sm ${completedLecture.length === totalNoOfLectures ? 'text-caribbeangreen-100' : 'text-richblack-100'}`}>{completedLecture.length ? completedLecture.length : 0} / {totalNoOfLectures}</p>
          </div>
      </div>

      {/* For section and subSection */}
      <div>
        {
          courseSectionData.map((section,index) => (
            <div key={index} className='flex flex-col gap-1'>
                {/* Section */}
                <div onClick={() => setActiveStatus(section._id)} className='cursor-pointer flex justify-between border border-richblack-600 bg-richblack-700 p-2 md:p-3 items-center'>
                  <p>{section.sectionName}</p>
                  <MdKeyboardDoubleArrowDown className={`${activeStatus !== section._id && 'rotate-90'} transition-all duration-200`}/>
                </div>
                
                {/* SubSections */}
                <div>
                  {
                    activeStatus === section._id && (
                      <div>
                        {
                          section.subSection.map((topic,index) => (
                            <div key={index} 
                              className={`cursor-pointer ${completedLecture.includes(topic._id) ? ' opacity-60 line-through transition-all duration-200' : ''} p-2 flex items-center gap-2 ${videoBarActive === topic._id ? 'text-blue-100' : 'text-richblack-5'}`}
                              onClick={() => navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${topic._id}`)}
                            >
                              {
                                videoBarActive === topic._id ? (
                                  <div>
                                    <FaPlay/>
                                  </div>
                                ) : (
                                  <input 
                                    type='checkbox'
                                    checked={completedLecture.includes(topic._id)}
                                    readOnly={true}
                                  />
                                )
                              }

                              <span>{topic.title}</span>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default VideoDetailsSidebar