import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userServices from "../services/userServices";

const userInitialState = {
  loading: false,
  token: "",
  error: "",
};

export const userLogin = createAsyncThunk(
  "LOGIN",
  userServices.userLoginService
);

export const userLogout = createAsyncThunk("LOGOUT", userServices.userLogout);

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  extraReducers: {
    //EXTRAREDUCERs para userLogin
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    [userLogin.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    //EXTRAREDUCERs para userLogut
    [userLogout.pending]: (state) => {
      state.loading = true;
    },
    [userLogout.fulfilled]: (state, action) => {
      state.token = "";
      state.loading = false;
    },
    [userLogout.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
