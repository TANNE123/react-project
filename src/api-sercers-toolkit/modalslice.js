import { createSlice } from "@reduxjs/toolkit";


const ModalSlice=createSlice({
    name:"ModalSlice",
    initialState:{
        loading:false,
    },
    reducers:{
        uploadFiles:(state,action)=>{
            return {loading:action.payload}
        }
    }
})

export const {uploadFiles}=ModalSlice.actions;
export default ModalSlice.reducer