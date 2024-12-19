import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("cart"))||[],
    shippingCost: 99,
    totalCost: JSON.parse(localStorage.getItem("totalCost"))||0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add an item to the cart
        addItem: (state, action) => {
            console.log(action.payload)
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity || 1; // Increment quantity
                state.totalCost += existingItem.price;
            } else {
                state.items.push({ id: item.id, name: item.title, price: item.price, quantity: item.quantity || 1, pictureUrl: item.coverImageUrl });
                state.totalCost += item.price;
            }
            localStorage.setItem("cart", JSON.stringify(state.items))
            localStorage.setItem("totalCost", JSON.stringify(state.totalCost))
            
        },
        // Remove an item from the cart
        removeItem: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload)
            state.totalCost -= (item.price * item.quantity);
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items))
            localStorage.setItem("totalCost", JSON.stringify(state.totalCost))
        },
        // Update item quantity
        updateQuantity: (state, action) => {
            const { id, quantity, increase } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item) {
                item.quantity = quantity||1;
                if (increase) state.totalCost += item.price;
                else if (quantity>0) state.totalCost -= item.price;
            }
            localStorage.setItem("cart", JSON.stringify(state.items))
            localStorage.setItem("totalCost", JSON.stringify(state.totalCost))
        },
    },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
