import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlices";
import { apiConnector } from "../apiConnector";
import { endpoints, profile } from "../apis";
import { setUser } from "../../slices/profileSlices";
import { logout } from "./authAPI";

const {
    CHANGEPASSWORD_API
} = endpoints;

const {
    UPDATEPROFILE_API,
    UPDATEDISPLAYPICTURE_API,
    DELETEACCOUNT_API
} = profile;

export function updateProfile(about,gender,dateOfBirth,profession,token){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            console.log("BEFORE API CALL");
            const response = await apiConnector(
                "POST",
                UPDATEPROFILE_API,
                {about,gender,dateOfBirth,profession},
                {
                    Authorization:`Bearer ${token}`
                }
            );
            console.log("AFTER API CALL");

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("UPDATE PROFILE RESPONSE -> ",response);

            toast.success("Profile Updated Successfully");
            dispatch(setUser(response.data.user));

        } catch(error){
            console.log("Error -> ",error.message);
            toast.error("Profile cannot be updated");
        }
        dispatch(setLoading(false));
    }
}

export function updateDisplayPicture(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Updating Display Picture...");
        try{
            const response = await apiConnector(
                "POST",
                UPDATEDISPLAYPICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("UPDATE PICTURE RESPONSE -> ",response);

            toast.success("Display Picture Updated");
            //update user with new image
            dispatch(setUser(response.data.data));
        } catch(error){
            console.log("Error ->", error.message);
            toast.error("Error in updating picture");
        }
        toast.dismiss(toastId);
    }
}

export function changePassword(currentPassword,changePassword,confirmPassword,token){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Changing Password...");
        try{
            const response = await apiConnector(
                "PUT",
                CHANGEPASSWORD_API,
                {currentPassword,changePassword,confirmPassword},
                {
                    Authorization: `Bearer ${token}`
                }
            );

            console.log("CHANGE PASSWORD RESPONSE -> ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
        
            toast.success("Password Updated Successfully");
        } catch(error){
            console.log("Error -> ",error.message);
            toast.error("Cannot change password");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function deleteAccount(token,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "DELETE",
                DELETEACCOUNT_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            );

            console.log("RESPONSE -> ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account Deleted Successfully");
            dispatch(logout(navigate));
            navigate("/login");

        } catch(error){
            console.log("Error -> ",error.message);
            toast.error("Cannot delete account");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}