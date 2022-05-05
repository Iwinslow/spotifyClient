import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as themeServices from "../services/themeServices";

const themeInitialState = {
  loading: false,
  darktheme: true,
  error: "",
};

export const themeToggle = createAsyncThunk(
  "TOGGLE",
  themeServices.toggleTheTheme
);

export const getTheme = createAsyncThunk(
  "GET THEME FROM LS",
  themeServices.getThemeFromLocalStorage
);

const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  extraReducers: {
    //EXTRAREDUCERs para themeToggle
    [themeToggle.pending]: (state) => {
      state.loading = true;
    },
    [themeToggle.fulfilled]: (state, action) => {
      state.darktheme = action.payload;
      state.loading = false;
    },
    [themeToggle.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    //EXTRAREDUCERs para getTheme
    [getTheme.pending]: (state) => {
      state.loading = true;
    },
    [getTheme.fulfilled]: (state, action) => {
      state.darktheme = action.payload;
      state.loading = false;
    },
    [getTheme.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export default themeSlice.reducer;
