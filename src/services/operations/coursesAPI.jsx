import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { categories, course } from "../apis";

const {
    DELETE_COURSE_API,
    CREATE_COURSE_API,
    UPDATE_COURSE_API,
    GET_ALL_COURSE_DETAILS_API
} = course;

const{
    CATEGORIES_API
} = categories;

export function deleteCourse(courseId,token){
    return async() => {
        const toastId = toast.loading("Deleting Course...");
        let result = null
        try{
            const response = await apiConnector(
                "DELETE",
                DELETE_COURSE_API,
                {courseId},
                {
                    Authorization:`Bearer ${token}`
                }
            )

            console.log("DELETING COURSE RESPONSE -> ",response);

            result = response.data.data;
            toast.success("Course Successfully Deleted");
            

        } catch(error){
            console.log("Error -> ",error.message);
            toast.error("Error in deleting course");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getAllCategories(){
    return async() => {
        let result = [];
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("GET",CATEGORIES_API);

            if(!response.data.success){
                throw new Error(response.data.error);
            }

            console.log("FETCH CATEGORY RESPONSE -> ",response);

            result.push(response.data.data);

        } catch(error){
            console.log("Fetch Category Error -> ",error.message);
            toast.error("Unable to fetch categories");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function editCourseDetails(formData,token){
    return async() => {
        const toastId = toast.loading("Changing data...")
        let result = null;
        try{
            const response = await apiConnector(
                "POST",
                UPDATE_COURSE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("Update course response -> ",response);

            result = response.data.data;
            toast.success("Course updated successfully");
            
        } catch(error){
            console.log("Error while updating course details -> ",error);
            toast.error("Cannot update course");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function createCourse(formData,token){
    return async() => {
        const toastId = toast.loading("Creating course...");
        let result = null;
        try{
            const response = await apiConnector(
                "POST",
                CREATE_COURSE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            );

            console.log("CREATING COURSE RESPONSE -> ",response);

            if(!response.data.success){
                throw new Error(response.data.error);
            }
            
            result = response.data.data;
            toast.success("Course created successfully");

        } catch(error){
            console.log("Course creation api call error -> ",error);
            toast.error("Course couldn't be created")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getAllCourseDetails(courseId){
    return async() => {
        let result = null;
        try{
            const response = await apiConnector(
                "POST",
                GET_ALL_COURSE_DETAILS_API,
                {courseId}
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("Get all course details response -> ",response);
            
            result = response.data.data;
            toast.success("Course details fetched successfully");

        } catch(error){
            console.log("Error while fetching all course details -> ",error);
            toast.error("Course details not found");
        }
        return result;
    }
}

