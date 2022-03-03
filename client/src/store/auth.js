import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

// auth slice
const initialAuthState = {
  user: {},
  isAuth: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
