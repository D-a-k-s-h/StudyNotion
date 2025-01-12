import React from 'react'
import * as Icons from 'react-icons/vsc'
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({link,iconName}) => {

  const Icon = Icons[iconName];
  const location = useLocation();
  
  const matchRoute = (route) => {
    return matchPath({path:route},location.pathname);
  }

  return (
    <NavLink to={link.path} className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? 'bg-yellow-400' : 'text-richblack-300'}`}>
      <span className={`w-[0.2rem] absolute top-0 left-0 h-full bg-yellow-50 ${matchRoute(link.path) ? 'opacity-100' : 'opacity-0'}`}></span>
      <div className='flex flex-row items-center gap-2'>
        <Icon className='text-lg'/>
        <p>{link.name}</p>
      </div>
    </NavLink>
  )
}

export default SidebarLink