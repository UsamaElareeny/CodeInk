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
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const token = localStorage.getItem('jwt_token'); // Retrieve the token from local storage
  const response = await axios.get('http://codeink.runasp.net/api/Orders/all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data.items;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: null, // Order response data
    loading: false,
    error: null,
    success: false,
    orders: [],
    status: 'idle',
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
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
