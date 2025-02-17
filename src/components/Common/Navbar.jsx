import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useDispatch, useSelector } from 'react-redux';
import { FaOpencart } from "react-icons/fa";
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { RiArrowDownWideLine } from "react-icons/ri";
import { logout } from '../../services/operations/authAPI';
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import toast from 'react-hot-toast';

const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggleHamburger,setToggleHamburger] = useState(false);
    //console.log(toggleHamburger);

    const {CATEGORIES_API} = categories;

    const location = useLocation();
    const [subLinks,setSubLinks] = useState([]);

    const fetchSubLinks = async() => {
        const toastId = toast.loading("Loading...");
        try{
            const result = await apiConnector("GET",CATEGORIES_API);
            //console.log("Printing SubLinks Result: ",result);
            setSubLinks(result.data.data);

        } catch(error){
            console.log(error.message);
        }
        toast.dismiss(toastId);
    }

    useEffect(() => { 
        fetchSubLinks();
    },[]);

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='h-14 border-b border-b-richblack-500 flex items-center justify-center'>
        <div className='w-full md:w-11/12 mx-auto p-2 flex flex-row items-center justify-around'>
            <Link to={"/"}>
                <img src={logo} alt='logo' width={160} height={42} loading='lazy'/>
            </Link>
            <ul className='text-richblack-5 hidden md:flex gap-5'>
                {NavbarLinks.map((element,index) => (
                    <li key={index}>
                        {
                            element.title === "Catalog" ? (
                                <div className='flex gap-2 cursor-pointer relative items-center group'>
                                    <p>{element.title}</p>
                                    <RiArrowDownWideLine/>

                                    <div className='invisible absolute z-[999] lg:w-[200px] -left-[100%] top-[100%] translate-y-2 flex flex-col gap-2 font-semibold rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200'>

                                        <div className='absolute left-[73%] -top-2 h-6 w-6 rotate-45 rounded-md bg-richblack-5'></div>

                                        {
                                            subLinks.length ? (
                                                    subLinks.map((subLink,index) => (
                                                    <Link to={`/category/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index} className='hover:text-[#0284C7] transition-all duration-200'>{subLink.name}</Link>
                                                ))
                                            ) : (<div>No Categories</div>)
                                        }

                                    </div>
                                    
                                </div>

                                ) : (

                                <Link to={element?.path} key={index} className={`${matchRoute(element?.path) ? 'text-[#0284C7] [text-shadow:_0_0_50px_#0284C7]' : 'text-richblack-5' }`}>{element.title}</Link>
                            )
                        }
                    </li>
                ))}
            </ul>
            <div className='flex flex-row items-center gap-2 md:gap-3'>
                <div className='relative flex md:hidden group'>
                    <div className='text-richblack-5 text-2xl border border-richblack-700 rounded-md'><RxHamburgerMenu/></div>
                    {
                        (
                            <ul className='absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 text-richblack-900 bg-richblack-5 rounded-md flex flex-row -left-44 md:-left-36 top-10 gap-1 z-50'>
                                {NavbarLinks.map((element,index) => (
                                    <li key={index} className='p-2'>
                                        {
                                            element.title === "Catalog" ? (
                                                <div className='flex gap-2 cursor-pointer relative items-center group'>
                                                    <p onClick={() => setToggleHamburger(!toggleHamburger)}>{element.title}</p>
                                                    <RiArrowDownWideLine/>

                                                    {
                                                        toggleHamburger && (
                                                            <div className='invisible absolute z-[999] lg:w-[200px] -left-[100%] top-[100%] translate-y-2 flex flex-col gap-2 font-semibold rounded-md bg-richblack-700 p-4 text-richblack-5 border border-richblack-400 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200'>

                                                                <div className='absolute left-[73%] -top-2 h-6 w-6 rotate-45 rounded-md bg-richblack-700 text-richblack-5'></div>

                                                                {
                                                                    subLinks.length ? (
                                                                            subLinks.map((subLink,index) => (
                                                                            <Link to={`/category/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index} className='hover:text-[#0284C7] transition-all duration-200'>{subLink.name}</Link>
                                                                        ))
                                                                    ) : (<div>No Categories</div>)
                                                                }

                                                            </div>
                                                        )
                                                    }
                                                    
                                                </div>

                                                ) : (

                                                <Link to={element?.path} key={index} className={`${matchRoute(element?.path) ? 'text-[#0284C7] [text-shadow:_0_0_50px_#0284C7]' : 'text-richblack-900' }`}>{element.title}</Link>
                                            )
                                        }
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className='text-sm md:text-base p-2 rounded-md text-richblack-100 border hover:text-[#0284C7] transition-all duration-200 bg-richblack-800'>Login</button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className='text-sm md:text-base p-2 text-richblack-100 border rounded-md hover:text-[#0284C7] transition-all duration-200 bg-richblack-800'>Signup</button>
                        </Link>
                    )
                }

                {
                    user && (
                        <div className='flex flex-row items-center gap-2 md:gap-5'>
                            {
                                user?.accountType !== "Instructor" && (
                                    <Link to={"/dashboard/wishlist"}>
                                    <FaOpencart className='relative text-2xl text-richblack-5'/>
                                        {
                                            totalItems > 0 && (
                                                <span className=' bg-caribbeangreen-300 rounded-full p-1 animate-bounce text-xs top-2 absolute'>{totalItems}</span>
                                            )
                                        }
                                    </Link>
                                )
                            }
                            <div className='group relative flex items-center gap-2'>
                                <img src={user?.image} alt='useImage' className='w-7 h-7 rounded-full cursor-pointer object-cover'/>
                                <RiArrowDownWideLine className='text-richblack-5 text-xl'/>
                                <div className='invisible w-36 absolute z-50 border border-richblack-500 rounded-md p-4 opacity-0 flex flex-col gap-3 bg-richblack-800 -left-20 md:-left-8 top-8 group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                                    <div className='flex items-center gap-2 text-richblack-300 hover:text-richblack-5 transition-all duration-200'>
                                        <CgProfile/>
                                        <Link to={"/dashboard/my-profile"} className='font-semibold'>My Profile</Link>
                                    </div>
                                    <div className='flex items-center gap-2 text-richblack-300 hover:text-[#ea4a4a] transition-all duration-200'>
                                        <CiLogout/>
                                        <p className='font-semibold cursor-pointer' onClick={() => dispatch(logout(navigate))}>Log Out</p>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar