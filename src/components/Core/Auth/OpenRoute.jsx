import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const OpenRoute = ({children}) => {

    const {user} = useSelector((state) => state.profile);
    console.log("USER -> ",user);

    if(user !== null){
        return children;
    }
    else{
        return <Navigate to={"/login"}/>
    }
}

export default OpenRoute