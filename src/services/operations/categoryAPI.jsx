import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { category } from "../apis";

const {
    GET_ALL_CATEGORY_DETAILS
} = category;

export function getAllCategoryDetails(categoryId){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await apiConnector(
                "POST",
                GET_ALL_CATEGORY_DETAILS,
                {categoryId}
            );

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("Get all category details response -> ",response);

            //toast.success("Details fetched successfully");
            result = response.data.data;

        } catch(error){
            console.log("Error while fetching details -> ",error);
            toast.error("Cannot fetch category details");
        }
        toast.dismiss(toastId);
        return result;
    }
}