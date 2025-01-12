import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step:1,
    editCourse:false,
    course:null,
    paymentLoading:false
}

const courseSlice = createSlice({
    name:"course",
    initialState:initialState,
    reducers:{
        setStep(state,action){
            state.step = action.payload;
        },
        setEditCourse(state,action){
            state.editCourse = action.payload;
        },
        setCourse(state,action){
            state.course = action.payload;
        },
        resetCourseState(state){
            state.step = 1;
            state.editCourse = false;
            state.course = null
        },
        setPaymentLoading(state,action){
            state.paymentLoading = action.payload;
        }
    }
})

export const {setStep,setEditCourse,setCourse,resetCourseState,setPaymentLoading} = courseSlice.actions;
export default courseSlice.reducer;
