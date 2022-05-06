import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import themeSlice from "./theme";

const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
  },
});

export default store;
