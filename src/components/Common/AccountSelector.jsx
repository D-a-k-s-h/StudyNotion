import React from 'react'

const AccountSelector = ({tabData,field,setField}) => {

  return (
    <div className='w-[30%] rounded-full bg-richblack-700 py-1 px-1 my-10 flex gap-1'>
        {
          tabData.map((tab) => (
            <button key={tab.id} onClick={() => setField(tab.type)} className={`${field === tab.type ? 'bg-richblack-900 text-richblack-5 px-3 py-1 rounded-full transition-all duration-200' : 'px-3 py-1 bg-transparent text-richblack-100 hover:text-richblack-25'}`}>{tab?.tabName}</button>
          ))
        }
    </div>
  )
}

export default AccountSelector