import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";


export const store = configureStore({
  reducer: {
    books: booksSlice,
    user: userSlice,
    cart: cartSlice
  },
});
