import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux'
import { Player } from 'video-react';
import { FaCloudArrowUp } from "react-icons/fa6";
import "video-react/dist/video-react.css"

const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null
}) => {

    const {course} = useSelector((state) => state.course);
    const [previewSource,setPreviewSource] = useState(viewData ? viewData : editData ? editData : "");
    const [selectedFile,setSelectedFile] = useState(viewData ? viewData : editData ? editData : "");

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    }

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if(file){
            previewFile(file);
            setSelectedFile(file);
        }
    }

    const previewFile = (file) => {
        console.log("FILE -> ",file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSource(reader.result);
        }
    }

    const {getRootProps,getInputProps,isDragActive} = useDropzone({
        accept:!video
        ? {"image/*": [".jpeg",".jpg",".png"]}
        : {"video/*": [".mp4"]},
        onDrop
    });

    useEffect(() => {
        register(name,{required:true});
    },[register]);

    useEffect(() => {
        setValue(name,selectedFile);
    },[selectedFile,setValue]);

  return (
    <div>
        <label>{label} {!viewData && <sup className='text-red'>*</sup>}</label>
        <div className={`${isDragActive ? 'bg-richblack-600' : 'bg-richblack-700'} rounded-md bg-richblack-700 text-richblack-200 border-2 border-dashed border-richblack-500`}>
            {
                previewSource ? (
                    <div className='w-full flex flex-col p-6'>
                        {
                            !video ? (
                                <img 
                                    src={previewSource}
                                    alt='PreviewImage'
                                    className='w-full h-full rounded-md object-cover'
                                />
                            ) : (
                                <Player aspectRatio='16:9' playsInline src={previewSource}/>
                            )
                        }
                        {
                            !viewData && (
                                <button
                                    type='button'
                                    onClick={() => {
                                        setPreviewSource("");
                                        setSelectedFile(null);
                                        setValue(name,null);
                                    }}
                                    className='pt-3 text-richblack-200 hover:underline transition-all duration-200'
                                >Cancel</button>
                            )
                        }
                    </div>
                ) : (
                    <div {...getRootProps()} onClick={handleClick} className='w-full cursor-pointer rounded-md p-6 flex flex-col gap-4 items-center'>
                        <input {...getInputProps()} ref={inputRef}/>
                        <FaCloudArrowUp className='text-5xl text-yellow-50 bg-richblack-900 rounded-full p-2'/>
                        <p className='text-center'>
                            Drag and drop an {!video ? "image" : "video"}, or <span className='text-yellow-50'>Browse</span><br/>
                            Max 6MB each (12MB for videos)
                        </p>
                        <ul className='flex list-disc text-sm gap-10 font-semibold text-richblack-300'>
                            <li>Aspect Ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )
            }
            {
                errors[name] && (
                    console.log(errors),
                    <span className='text-red'>Please provide {video ? "video" : "thumbnail"} for the course</span>
                )
            }
        </div>
    </div>
  )
}

export default Upload