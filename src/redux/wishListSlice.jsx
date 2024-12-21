import { createSlice, isAction } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
    wishlistSize: JSON.parse(localStorage.getItem('wishlistSize')) || 0,
};

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const filteredBook = state.items.find(book => book.id === action.payload.id);
      if(!filteredBook){
        state.items.push({...action.payload,isAction:true});
        state.wishlistSize = state.items.length; 
        localStorage.setItem('wishlist', JSON.stringify(state.items));
        localStorage.setItem('wishlistSize', JSON.stringify(state.wishlistSize));
      }
    },
    removeFromWishlist: (state, action) => {
      const deletedBook = state.items.find(book => book.id === action.payload); 
      deletedBook.isAction = false; 
      const updatedWishlist = state.items.filter(book => book.id !== action.payload);
      state.items = updatedWishlist;
      state.wishlistSize = updatedWishlist.length;
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      localStorage.setItem('wishlistSize', JSON.stringify(updatedWishlist.length));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;