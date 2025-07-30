import { createSlice } from "@reduxjs/toolkit";

const Detail = createSlice({
    name: 'ABC',
    initialState: -1,
    reducers: {
      updateDetail: (state, action) => action.payload
    }
  });
  
  export const { updateDetail } = Detail.actions;
  export default Detail; 
  
