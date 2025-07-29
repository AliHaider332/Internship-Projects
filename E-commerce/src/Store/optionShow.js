import { createSlice } from "@reduxjs/toolkit"
const optionShow=createSlice({
    name:'ABC',
    initialState:false,
    reducers:{
        setOption: state=>!state
    }
})
export const {setOption}=optionShow.actions;
export default optionShow;