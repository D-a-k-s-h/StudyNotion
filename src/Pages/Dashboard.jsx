import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Core/Dashboard/Sidebar';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading){
        return(
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] overflow-hidden'>
        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
            <div className='lg:w-screen max-w-maxContent mx-auto p-4 md:p-6 lg:p-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard