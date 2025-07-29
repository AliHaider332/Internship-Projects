import { createSlice } from "@reduxjs/toolkit";
const barShow = createSlice({
    name: 'ABC',
    initialState: false,
    reducers: {
      setBarShow: (state) => !state,
    },
  });
export const {setBarShow}=barShow.actions;
export default barShow;
