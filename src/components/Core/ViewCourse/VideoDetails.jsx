import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { markLectureAsComplete } from '../../../services/operations/ratingAndReview';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineReplay } from 'react-icons/md';
import { SiTicktick } from "react-icons/si";


const VideoDetails = () => {

  const {courseId,sectionId,subSectionId} = useParams();
  const {token} = useSelector((state) => state.auth);
  const {courseEntireData,courseSectionData,completedLecture} = useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();
  const playerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [videoData,setVideoData] = useState([]);
  const [videoEnded,setVideoEnded] = useState(false);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }
    else{
      return false;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);
  
    const totalNoOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

    if(currentSectionIndex === courseSectionData?.length - 1 && currentSubSectionIndex === totalNoOfSubSections - 1){
      return true;
    }
    else{
      return false;
    }
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);

    const totalNoOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    if(currentSubSectionIndex !== totalNoOfSubSections - 1){
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    }
    else{
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection?.[0]?._id;

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);

    if(currentSubSectionIndex !== 0){
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    }
    else{
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const totalNoOfSubSections = courseSectionData[currentSectionIndex - 1]?.subSection?.length;

      const prevSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[totalNoOfSubSections - 1]?._id;

      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  }

  const handleLectureCompletion = async() => {
    const result = await dispatch(markLectureAsComplete(
      {
        courseId:courseId,
        subSectionId:subSectionId
      },
      token
    ))

    if(result){
      dispatch(updateCompletedLectures(subSectionId));
    }
  }

  useEffect(() => {
    const setVideoDetails = async() => {
      if(!courseEntireData){
        return;
      }
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }
      else{
        //set video details if everything is fine
        const filteredData = courseSectionData.filter((data) => data._id === sectionId);

        const filterVideoData = filteredData?.[0]?.subSection.filter((data) => data._id === subSectionId);

        setVideoData(filterVideoData?.[0]);
        setVideoEnded(false);
      }
    }

    setVideoDetails();
  },[courseEntireData,courseSectionData,location.pathname]);

  return (
    <div className='min-w-[235px] md:min-w-[600px] lg:min-w-[1000px] text-richblack-5'>
        {
          !videoData ? (
            <p>No Lecture Found</p>
          ) : (
            <div className='flex flex-col gap-5 py-6'>
              <Player className={`relative z-10 ${videoEnded ? 'pointer-events-none blur-sm' : ''}`} ref={playerRef} preload='metadata' src={videoData?.videoURL} playsInline aspectratio='16:9' onEnded={() => setVideoEnded(true)}/>

              {
                videoEnded && (
                  <div className='absolute w-[60%] md:w-[70%] md:h-[40%] lg:w-[65%] lg:h-[70%] flex flex-col gap-2 justify-center items-center z-20'>
                    {
                      !completedLecture.includes(subSectionId) && (
                        <button className='rounded-md flex items-center gap-2 bg-yellow-50 text-richblack-900 p-2' onClick={handleLectureCompletion}><SiTicktick/>Mark as completed</button>
                      )
                    }

                    <button 
                      className='rounded-md flex items-center gap-1 bg-yellow-50 text-richblack-900 p-2'
                      onClick={() => {
                        if(playerRef?.current){
                          playerRef?.current.seek(0);
                          playerRef?.current.play();
                          setVideoEnded(false);
                        }
                      }
                    }><MdOutlineReplay/>Replay</button>

                    <div className='flex gap-3'>
                      {
                        !isFirstVideo() && (
                          <button className='rounded-md flex items-center gap-1 bg-yellow-50 text-richblack-900 p-2 px-3' onClick={goToPrevVideo}><MdKeyboardDoubleArrowLeft/>Prev</button>
                        )
                      }
                      {
                        !isLastVideo() && (
                          <button className='rounded-md flex items-center gap-1 bg-yellow-50 text-richblack-900 p-2 px-3' onClick={goToNextVideo}>Next<MdKeyboardDoubleArrowRight/></button>
                        )
                      }
                    </div>
                  </div>
                )
              }
              
              <div className='flex flex-col gap-1'>
                <p className='text-2xl font-semibold'>{videoData?.title}</p>
                <p className='text-richblack-50'>{videoData?.description}</p>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default VideoDetails