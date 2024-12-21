import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to send order data to the API
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    const token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.post(
        "http://codeink.runasp.net/api/Orders",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
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
    success: false,
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
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
        localStorage.setItem("orderDetails", JSON.stringify(action.payload));
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
