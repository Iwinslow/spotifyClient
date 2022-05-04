import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userSlice,
    //theme: themeSlice,
  },
});

export default store;