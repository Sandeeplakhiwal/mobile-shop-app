import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const Slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { loadUser } = Slice.actions;

export default Slice;
