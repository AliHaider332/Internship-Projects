import { createSlice } from "@reduxjs/toolkit";

const CART = createSlice({
  name: 'ABC',
  initialState: {
    arr: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.arr.find(item => item.ID === action.payload.ID);
      if (existing) {
        existing.count += action.payload.count;
      } else {
        state.arr.push(action.payload);
      }
    },

    deleteFromCart: (state, action) => {
      const index = state.arr.findIndex(item => item.ID === action.payload.id);
      if (index !== -1) {
        if (state.arr[index].count > 1) {
          state.arr[index].count--;
        } else {
          state.arr.splice(index, 1);
        }
      }
    },

    totalAmount: (state) => {
      state.totalAmount = state.arr.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
    },
  },
});

export const { addToCart, deleteFromCart, totalAmount } = CART.actions;
export default CART;
