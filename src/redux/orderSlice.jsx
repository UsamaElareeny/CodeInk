import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to send order data to the API
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://codeink.runasp.net/api/Orders",
        orderData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data; // Return data if successful
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order Failed");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: null, // Order response data
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.orderDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
