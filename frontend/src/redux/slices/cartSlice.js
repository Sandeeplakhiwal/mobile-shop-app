import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: 0,
};

const Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      state.cartItems += 1;
    },
  },
});

export const { AddToCart } = Slice.actions;

export default Slice;
