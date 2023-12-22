import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import productSlice from "./slices/productSlice.js";

export const server = "http://localhost:5000/api/v1";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    filters: productSlice.reducer,
  },
  devTools: true,
});
