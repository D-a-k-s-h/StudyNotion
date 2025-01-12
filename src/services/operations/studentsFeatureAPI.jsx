import toast from "react-hot-toast";
import { studentFeatures } from "../apis";
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { removeFromCart, resetCart } from "../../slices/cartSlice";
import rzpLogo from '../../assets/Logo/rzplogo.jpg'

const {
    CAPTURE_PAYMENT_API,
    VERIFY_PAYMENT_API,
    SEND_SUCCESSFULL_PAYMENT_RESPONSE_API,
    CREATE_RATING_AND_REVIEW_API
} = studentFeatures;

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })

}

export function buyCourse(courses,token,userDetails,dispatch,navigate){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            //load the script
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if(!res){
                toast.error("payment SDK failed to load");
                return;
            }

            const orderResponse = await apiConnector(
                "POST",
                CAPTURE_PAYMENT_API,
                {courses},
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if(!orderResponse.data.success){
                throw new Error(orderResponse.data.message);
            }

            console.log("order response -> ",orderResponse);

            //options
            const options = {
                key:process.env.REACT_APP_RAZORPAY_KEY,
                currency:orderResponse.data.message.currency,
                amount:orderResponse.data.message.amount,
                order_id:orderResponse.data.message.id,
                name:"StudyNotion",
                description:"Thank you for purchasing the course",
                image:rzpLogo,
                prefill:{
                    email:userDetails.email,
                    name:userDetails.firstName
                },
                handler: function(response){
                    //send successfull payment mail
                    sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);

                    //verifyPayment
                    verifyPayment({...response,courses},token,navigate,dispatch);
                }
            }

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            paymentObject.on("payment.failed",function(response){
                toast.error("oops!! payment failed");
                console.log(response.error);
            })

        } catch(error){
            console.log("Error while capturing payment",error);
            toast.error("Not able to capture payment");
        }
        toast.dismiss(toastId);
    }
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector(
            "POST",
            SEND_SUCCESSFULL_PAYMENT_RESPONSE_API,
            {
                orderId:response.razorpay_order_id,
                paymentId:response.razorpay_payment_id,
                amount
            },
            {
                Authorization: `Bearer ${token}`
            }
        )

        toast.success("Mail Sent");

    } catch(error){
        console.log("Error while sending mail",error);
        toast.error("Email not sent");
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector(
            "POST",
            VERIFY_PAYMENT_API,
            bodyData,
            {
                Authorization: `Bearer ${token}`
            }
        );

        console.log("VERIFY PAYMENT RESPONSE -> ",response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful");
        navigate("/dashboard/enrolled-courses");
        console.log("Body data -> ",bodyData);

        //remove course from cart, if bought seperately
        for(const courseId of bodyData.courses){
            dispatch(removeFromCart(courseId))
        }
        
        //reset cart if courses bought from cart
        if(bodyData?.courses?.length > 1){
            dispatch(resetCart());
        }

    } catch(error){
        console.log("Error while verifying payment",error);
        toast.error("Payment Error");
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
}

export function createRatingAndReview(formData,token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await apiConnector(
                "POST",
                CREATE_RATING_AND_REVIEW_API,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.data;
            toast.success("Course Rated Successfully");

        } catch(error){
            console.log("Error while creating feedback -> ",error);
            toast.error("Cannot add rating and review");
        }
        toast.dismiss(toastId);
        return result;
    }
}