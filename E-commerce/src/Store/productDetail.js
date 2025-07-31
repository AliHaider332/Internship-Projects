import { createSlice } from "@reduxjs/toolkit";

const Detail = createSlice({
    name: 'ABC',
    initialState: {
      id: null,
      
    },
    
    reducers: {
      updateDetail: (state, action) => {
        state.id = action.payload.id;
       
      }
    }
  });
  
  export const { updateDetail } = Detail.actions;
  export default Detail; 
  
