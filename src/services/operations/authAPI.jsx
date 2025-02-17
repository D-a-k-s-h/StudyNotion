import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlices"
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlices";


const {
    RESETPASSWORD_API,
    RESETPASSTOKEN_API,
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
} = endpoints;

export function getPasswordResetToken(email,setEmailSent){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email});

            console.log("RESET PASSWORD TOKEN -> ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Email Sent Successfully");
            setEmailSent(true);

        } catch(error){
            console.log(error.message);
            toast.error("Email cannot be sent");
        }
        toast.dismiss(toastId);
    }
}

export function resetPassword(password,confirmPassword,token){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});

            console.log("RESET PASSWORD RESPONSE -> ",response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Password Successfull");

        } catch(error){
            toast.error("Password cannot be reset");
            console.log(error.message);
        }
        toast.dismiss(toastId);
    }
}

export function sendOtp(email,navigate){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",SENDOTP_API,{email});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("SENDOTP_API RESPONSE -> ",response)

            toast.success(`OTP sent to ${email}`);
            navigate("/verify-email");

        } catch(error){
            toast.error("OTP could not be sent");
            console.log(error.message);
        }
        toast.dismiss(toastId);
    }
}

export function signUp(
    firstName,
    lastName,
    contactNumber,
    accountType,
    password,
    confirmPassword,
    otp,
    email,
    navigate
){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",SIGNUP_API,{firstName,lastName,contactNumber,email,password,confirmPassword,accountType,otp});
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("SIGNUP RESPONSE -> ",response);

            toast.success("Sign Up Successfull");
            navigate("/login");

        } catch(error){
            console.log("SIGN UP DISMISSED...",error);
            toast.error("Sign up failed");
            navigate("/signup");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function login(email,password,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",LOGIN_API,{email,password});

            if(!response.data.success){
                throw new Error("LOGIN_API RESPONSE",response.data.message);
            }

            console.log("LOGIN_API RESPONSE -> ",response);

            toast.success("Login Successfull");
            //set token value retrieved from response
            dispatch(setToken(response.data.token));
            //get user image from response
            const userImage = response?.data?.existingUser?.image ? response?.data?.existingUser?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existingUser.firstName} ${response.data.existingUser.lastName}`
            //set user details
            const userResponse = {...response.data.existingUser,image:userImage};
            dispatch(setUser(userResponse));
            //set user value in local storage
            localStorage.setItem("user",JSON.stringify(userResponse));
            //set token value in local storage as well
            localStorage.setItem("token",JSON.stringify(response.data.token));
            navigate("/dashboard/my-profile");
        } catch(error){
            toast.error("Login Failed");
            console.log(error);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    } 
}

export function logout(navigate){
    return async(dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        // dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/login");
    }
}