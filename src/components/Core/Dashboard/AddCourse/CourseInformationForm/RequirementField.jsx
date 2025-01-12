import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {

    const {editCourse,course} = useSelector((state) => state.course); 
    const [requirement,setRequirement] = useState("");
    const [requirementList,setRequirementList] = useState([]);

    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const list = [...requirementList];
        list.splice(index,1);
        setRequirementList(list);
    }

    useEffect(() => {
        if(editCourse){
            setRequirementList(JSON.parse(course?.instructions));
        }
        register(name,{required:true});
    },[]);

    useEffect(() => {
        setValue(name,requirementList);
    },[requirementList]);

  return (
    <div className={`flex flex-col justify-start ${requirementList.length > 0 ? 'gap-1' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <input
            name={name}
            placeholder='Enter requirements/instructions'
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='p-2 bg-richblack-700 text-richblack-5 rounded-md border-b border-b-richblack-400'
        />
        <button type='button' className='w-fit text-yellow-50' onClick={handleAddRequirement}>Add</button>
        {
            requirementList && (
                <ul className='flex flex-row flex-wrap gap-2 mt-1 mb-2'>
                    {
                        requirementList.map((element,index) => (
                            <li key={index} className='w-fit flex p-1 px-2 text-sm flex-row items-center gap-1 rounded-full bg-richblack-700'>
                                <span>{element}</span>
                                <button type='button' onClick={() => handleRemoveRequirement(index)} className='text-xs text-pure-greys-100'>clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span className='text-[#eb3b3b]'>Please enter valid information.</span>
            )
        }
    </div>
  )
}

export default RequirementField