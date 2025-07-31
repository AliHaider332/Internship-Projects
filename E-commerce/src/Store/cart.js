import { createSlice } from "@reduxjs/toolkit";

const CART = createSlice({
  name: 'ABC',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);  // <- push payload directly
    }
  }
});

export const { addToCart } = CART.actions;
export default CART; // <- export reducer (not whole slice)
