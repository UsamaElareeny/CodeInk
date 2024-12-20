import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    paymentDetails: {
        nameOnCard: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
    },
    addressDetails: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
    },
    loading: false,
    error: null,
    success: false,
};

// Thunk to send payment data to the API
export const processPayment = createAsyncThunk(
    'payment/processPayment',
    async (paymentData, { rejectWithValue }) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await axios.post(
                'http://codeink.runasp.net/api/Payments',
                paymentData,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json' 
                    },
                }
            );
            return response.data; // Return data if successful
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Payment Failed');
        }
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        updatePaymentDetails: (state, action) => {
            state.paymentDetails = { ...state.paymentDetails, ...action.payload };
        },
        updateAddressDetails: (state, action) => {
            state.addressDetails = { ...state.addressDetails, ...action.payload };
        },
        clearPaymentDetails: (state) => {
            state.paymentDetails = {
                nameOnCard: '',
                cardNumber: '',
                expiryDate: '',
                cvc: '',
            };

            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearAddressDetails: (state) => {
            state.addressDetails = {
                firstName: '',
                lastName: '',
                street: '',
                city: '',
                state: '',
                postalCode: '',
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(processPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(processPayment.fulfilled, (state,action) => {
                state.loading = false;
                state.success = true;
                localStorage.setItem('payment', JSON.stringify(action.payload.data));
            })
            .addCase(processPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { updatePaymentDetails, updateAddressDetails, clearPaymentDetails, clearAddressDetails } = paymentSlice.actions;
export default paymentSlice.reducer;