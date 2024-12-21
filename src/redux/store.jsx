import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import wishListSlice from "./wishListSlice";
import paymentSlicer from "./paymentSlice";
import deliverySlice from "./deliverySlice";
import orderSlice from "./orderSlice";

export const store = configureStore({
  reducer: {
    books: booksSlice,
    user: userSlice,
    cart: cartSlice,
    wishlist: wishListSlice,
    payment: paymentSlicer,
    delivery: deliverySlice,
    order: orderSlice,
  },
});
