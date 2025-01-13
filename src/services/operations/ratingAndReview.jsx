import toast from "react-hot-toast";
import { ratingAndReview } from "../apis";
import { apiConnector } from "../apiConnector";


const {
    LECTURE_COMPLETION_API,
    GET_ALL_RATINGS_AND_REVIEWS,
    GET_COURSE_SPECIFIC_RATINGS
} = ratingAndReview

export function markLectureAsComplete(formData,token){
    return async() => {
        let result = null;
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                LECTURE_COMPLETION_API,
                formData,
                {
                    Authorization:`Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.success;
            toast.success("Lecture Completed");

        } catch(error){
            console.log("Error while marking lecture as completed -> ",error);
            toast.error("Error in marking lecture as completed")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getAllRatingsAndReviews(){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await apiConnector(
                "GET",
                GET_ALL_RATINGS_AND_REVIEWS
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.data;
            //toast.success("Rating and Reviews fetched successfully");

        } catch(error){
            console.log("Error while fetching rating and reviews -> ",error);
            toast.error("Cannot get ratings and reviews");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getCourseSpecificRating(courseId){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try{
            const response = await apiConnector(
                "GET",
                GET_COURSE_SPECIFIC_RATINGS,
                {courseId}
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("course specific rating response -> ",response);

            result.push(response.data.data);
            //toast.success("course specific rating and reviews fetched");

        } catch(error){
            console.log("Error while fetching course specific rating and review -> ",error);
            toast.error("Cannot get ratings and reviews for particular course");
        }
        toast.dismiss(toastId);
        return result;
    }
}