import toast from "react-hot-toast";
import { course, profile } from "../apis";
import { apiConnector } from "../apiConnector";


const {
    GET_ENROLLED_COURSES_DETAILS_API,
    GET_INSTRUCTOR_DASHBOARD_DETAILS
} = profile;

const {
    GET_INSTRUCTOR_COURSES_DETAILS_API
} = course;

export function getEnrolledCourses(token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try{
            const response = await apiConnector(
                "GET",
                GET_ENROLLED_COURSES_DETAILS_API,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.messsage);
            }

            console.log("ENROLLED COURSE RESPONSE -> ",response);

            //toast.success("Enrolled courses fetched successfully");

            result = response.data.data;

        } catch(error){
            console.log("ERROR WHILE FETCHING ENROLLED COURSES",error);
            toast.error("error while fetching enrolled courses");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getAllCourses(token){
    return async() => {
        const toastId = toast.loading("Fetching Courses...");
        let result = [];
        try{
            const response = await apiConnector(
                "GET",
                GET_INSTRUCTOR_COURSES_DETAILS_API,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.messsage);
            }

            console.log("INSTRUCTOR COURSES RESPONSE -> ",response);

            result.push(response.data.data);
            //toast.success("Courses Fetched Successfully");

        } catch(error){
            console.log("ERROR -> ",error);
            toast.error("Error while fetching course details");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getInstructorDashboardDetails(token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try{
            const response = await apiConnector(
                "POST",
                GET_INSTRUCTOR_DASHBOARD_DETAILS,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.courses;
            //toast.success("Instructor details fetched successfully");

        } catch(error){
            console.log("Error while getting instructor dahsboard details -> ",error);
            toast.error("Details not fetched");
        }
        toast.dismiss(toastId);
        return result;
    } 
}