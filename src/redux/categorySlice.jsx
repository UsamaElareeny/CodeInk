import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { getState }) => {
    const token = localStorage.getItem('jwt_token');
    const response = await axios.get('http://codeink.runasp.net/api/categories', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (category, { getState }) => {
    const token = localStorage.getItem('jwt_token');
    const response = await axios.post('http://codeink.runasp.net/api/categories', category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data; // Ensure the response includes the newly created category with its ID
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (category, { getState }) => {
    const token = localStorage.getItem('jwt_token');
    const response = await axios.put(`http://codeink.runasp.net/api/categories`, category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, { getState }) => {
    const token = localStorage.getItem('jwt_token');
    await axios.delete(`http://codeink.runasp.net/api/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return id;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(category => category.id !== action.payload);
            });
    }
});

export default categorySlice.reducer;