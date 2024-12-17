import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";
import userSlice from "./userSlice";


export const store = configureStore({
  reducer: {
    books: booksSlice,
    user: userSlice
  },
});
