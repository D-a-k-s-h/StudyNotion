import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links' 
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../Common/ConfirmationModal'


const Sidebar = () => {

    const {user,loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(profileLoading || authLoading){
        return(
            <div class="spinner"></div>
        )
    }

  return (
    <div className='relative flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
        <div className='flex flex-col'>
            {
                sidebarLinks.map((element) => {
                    if(element?.type && user?.accountType !== element?.type){
                        return null;
                    }
                    return(
                        //sidebar link represents link on tab
                        <SidebarLink link={element} key={element.id} iconName={element.icon}/>
                    )
                })
            }

            <hr className='w-52 mx-auto text-richblack-500 my-4'></hr>
            <div className='w-full mx-auto flex flex-col '>
                <SidebarLink link={{name:"Settings",path:"/dashboard/settings"}} iconName="VscSettingsGear"/>
                <button onClick={() => setConfirmationModal({
                    heading:"Are You Sure?",
                    para:"You will be logged out of your account.",
                    textBtn1:"Logout",
                    textBtn2:"Cancel",
                    textBtn1Action:() => dispatch(logout(navigate)),
                    textBtn2Action:() => setConfirmationModal(null)
                })} className='font-medium text-sm text-richblack-300 '>
                    
                    <div className='py-2 px-8 flex items-center gap-2'>
                        <VscSignOut className='text-lg'/>
                        <p>Logout</p>
                    </div>

                </button>
            </div>
        </div>
        <div className='absolute -right-[42rem] top-[15rem]'>{confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}</div>
    </div>
  )
}

export default Sidebar