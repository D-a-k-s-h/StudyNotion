import toast from "react-hot-toast";
import { section } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    CREATE_SUB_SECTION_API,
    UPDATE_SUB_SECTION_API,
    DELETE_SECTION_API,
    DELETE_SUB_SECTION_API
} = section;

export function createSection(data,token){
    return async() => {
        const toastId = toast.loading("Creating section...");
        let result = [];
        try{
            const response = await apiConnector(
                "POST",
                CREATE_SECTION_API,
                data,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            //console.log("CREATING SECTION RESPONSE -> ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.data;
            toast.success("Section created successfully");

        } catch(error){
            console.log("Error in creating section -> ",error);
            toast.error("Error in creating section")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function updateSection(data,token){
    return async() => {
        let result = [];
        try{
            const response = await apiConnector(
                "POST",
                UPDATE_SECTION_API,
                data,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.data;
            toast.success("Section updated");
            
        } catch(error){
            console.log("Updating section error -> ",error);
            toast.error("Section cannot be updated");
        }
        return result;
    }
}

export function createSubSection(formData,token){
    return async() => {
        const toastId = toast.loading("Creating lecture");
        let result = null;
        try{
            const response = await apiConnector(
                "POST",
                CREATE_SUB_SECTION_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
                
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            //console.log("Create sub-section response -> ",response);

            result = response.data.data;
            toast.success("Lecture Added");

        } catch(error){
            console.log("Error while creating sub-section -> ",error);
            toast.error("Error in creating lecture");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function updateSubSection(formData,token){
    return async() => {
        const toastId = toast.loading("Updating lecture...");
        let result = null
        try{
            const response = await apiConnector(
                "POST",
                UPDATE_SUB_SECTION_API,
                formData,
                {
                    "Content-Type":"multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            //console.log("updating sub-section response -> ",response);

            result = response.data.data;
            toast.success("Lecture updated successfully");
            

        } catch(error){
            console.log("Error while updating sub section -> ",error);
            toast.error("Error in updating lecture");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function deleteSection(data,token){
    return async() => {
        const toastId = toast.loading("Deleting section...");
        let result = null;
        try{
            
            const response = await apiConnector(
                "DELETE",
                DELETE_SECTION_API,
                data,
                {
                    Authorization: `Bearer ${token}`
                }
                
            )

            //console.log("Response while deleting section",response);

            result = response.data.data;
            toast.success("Section deleted successfully");
            //console.log("deleting section result -> ",result);

        } catch(error){
            console.log("Error while deleting section",error);
            toast.error("Cannot delete section");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function deleteSubSection(data,token){
    return async() => {
        const toastId = toast.loading("Deleting lecture...");
        let result = null;
        try{
            
            const response = await apiConnector(
                "DELETE",
                DELETE_SUB_SECTION_API,
                data,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            //console.log("Response while deleting sub-section",response);

            result = response.data.data;
            toast.success("Lecture deleted");

        } catch(error){
            console.log("Error while deleting sub-section",error);
            toast.error("Unable to delete");
        }
        toast.dismiss(toastId);
        return result;
    }
}