
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch delivery options
export const fetchDeliveryOptions = createAsyncThunk(
  'delivery/fetchDeliveryOptions',
  async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch('http://codeink.runasp.net/api/Orders/DeliveryMethods', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.data;
  }
);

const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    deliveryOption: 'FREE',
    id:'4',
    deliveryOptions: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setDeliveryOption: (state, action) => {
      state.deliveryOption = action.payload;
    },
    setDeliveryID: (state, action) => {
      const selectedOption = state.deliveryOptions.findIndex(
        (option) => option.shortName === state.deliveryOption
      );
      state.id=selectedOption+1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeliveryOptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveryOptions = action.payload;
      })
      .addCase(fetchDeliveryOptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setDeliveryOption, setDeliveryID } = deliverySlice.actions;
export default deliverySlice.reducer;