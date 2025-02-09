import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const ChipInput = ({label,name,placeholder,register,errors,setValue,getValues}) => {

  const {editCourse,course} = useSelector((state) => state.course);
  const [requirement,setRequirement] = useState("");
  const [chip,setChip] = useState([]);

  const handleAddRequirement = (e) => {
    if(e.key === 'Enter' || e.key === ',' || e.key === '.'){

      e.preventDefault();

      if(requirement){
        const newChip = [...chip,requirement];
        setChip(newChip);
        setRequirement("");
      }
    }
  }

  const handleRemoveRequirement = (index) => {
    const list = [...chip];
    list.splice(index,1);
    setChip(list);
  }

  useEffect(() => {
    if(editCourse){
      setChip(JSON.parse(course?.tag));
    }
    register(name,{required:true});
  },[]);

  useEffect(() => {
    setValue(name,chip);
  },[chip]);
  
  return (
    <div className={`flex flex-col ${chip.length > 0 ? 'gap-2' : 'gap-0'}`}>
        <label htmlFor={name}>{label}</label>
        {
          chip && (
            <ul className='flex flex-wrap items-center gap-2'>
              {
                chip.map((element,index) => (
                  <li key={index} className='flex flex-row gap-1 items-center bg-yellow-300 text-sm rounded-full px-3 py-1'>
                    <p>{element}</p>
                    <p onClick={() => handleRemoveRequirement(index)} className='cursor-pointer'><RxCross2 className='text-lg'/></p>
                  </li>
                ))
              }
            </ul>
          )
        
        }
        <input
            name={name}
            placeholder={placeholder}
            value={requirement}
            className='p-2 bg-richblack-700 text-richblack-5 rounded-md border-b border-b-richblack-400'
            onChange={(e) => setRequirement(e.target.value)}
            onKeyDown={handleAddRequirement}
        />
        {
          errors[name] && (
            <span className='text-red'>Please enter tags</span>
          )
        }
    </div>
  )
}

export default ChipInput