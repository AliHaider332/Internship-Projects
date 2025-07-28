import { createSlice } from "@reduxjs/toolkit"
const topBarState=createSlice({
    name:'abc',
    initialState:false,
    reducers:{
        updateTopBar:(state)=>!state
    }
})
export const {updateTopBar}=topBarState.actions;
export default topBarState;