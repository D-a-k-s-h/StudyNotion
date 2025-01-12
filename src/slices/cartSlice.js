import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalPrice:localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart(state,action){
            const course = action.payload;
            //console.log(course);
            const index = state.cart.findIndex((item) => (item._id === course._id));

            //if item is already present then give error and return
            if(index >= 0){
                toast.error("Course Already in Cart");
                return;
            }

            //update total quantity and price
            state.cart.push(course);
            console.log("state.cart -> ",state.cart);
            state.totalPrice += course.price;
            console.log("totalPrice -> ",state.totalPrice);
            state.totalItems++;

            //update to local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

            toast.success("Course successfully added to cart");
        },
        removeFromCart(state,action){
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => (item._id === courseId));

            //item present in cart
            if(index >= 0){
                state.totalPrice -= state.cart[index].price;
                state.totalItems--; 
                state.cart.splice(index,1);

                //update in localStorage
                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

                toast.success("Course removed from cart");
                return;
            }

            toast.error("Course not found");
        },
        resetCart(state){

            state.cart = [];
            state.totalPrice = 0;
            state.totalItems = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("totalPrice");
            localStorage.removeItem("totalItems");

            toast.success("Cart is empty");
        }
    }
});

export const{addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;