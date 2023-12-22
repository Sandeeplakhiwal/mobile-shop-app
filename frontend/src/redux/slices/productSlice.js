import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: "",
  name: "",
  processor: "",
  memory: "",
  os: "",
  products: null,
  productsLoading: false,
};

const Slice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    loadFilters: (state, action) => {
      state.price = action.payload.price;
      state.name = action.payload.name;
      state.processor = action.payload.processor;
      state.memory = action.payload.memory;
      state.os = action.payload.os;
    },
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { loadFilters } = Slice.actions;

export default Slice;
