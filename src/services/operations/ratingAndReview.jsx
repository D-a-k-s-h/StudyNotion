import toast from "react-hot-toast";
import { ratingAndReview } from "../apis";
import { apiConnector } from "../apiConnector";


const {
    LECTURE_COMPLETION_API,
    GET_ALL_RATINGS_AND_REVIEWS
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