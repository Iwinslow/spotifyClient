import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as userServices from "../services/userServices";

const userInitialState = {
  loading: false,
  token: "",
  error: "",
  albums: [],
};

export const userLogin = createAsyncThunk(
  "LOGIN",
  userServices.userLoginService
);

export const userLogout = createAsyncThunk("LOGOUT", userServices.userLogout);

export const getUserAlbums = createAsyncThunk(
  "GET ALBUMS",
  userServices.getAlbums
);

export const saveUserAlbum = createAsyncThunk(
  "SAVE ALBUM",
  userServices.saveAlbum
);

export const removeUserAlbum = createAsyncThunk(
  "REMOVE ALBUM",
  userServices.removeAlbum
);

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
    //EXTRAREDUCERs para getAlbums
    [getUserAlbums.pending]: (state) => {
      state.loading = true;
    },
    [getUserAlbums.fulfilled]: (state, action) => {
      state.albums = action.payload;
      state.loading = false;
    },
    [getUserAlbums.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    //EXTRAREDUCERs para Agregar album al perfil
    [saveUserAlbum.pending]: (state) => {
      state.loading = true;
    },
    [saveUserAlbum.fulfilled]: (state, action) => {
      state.albums = action.payload;
      state.loading = false;
    },
    [saveUserAlbum.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    //EXTRAREDUCERs para Eliminar album del perfil
    [removeUserAlbum.pending]: (state) => {
      state.loading = true;
    },
    [removeUserAlbum.fulfilled]: (state, action) => {
      state.albums = action.payload;
      state.loading = false;
    },
    [removeUserAlbum.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
