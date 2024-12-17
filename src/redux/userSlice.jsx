import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    error: null,
    loading: false,
    message: '',
};
const API_URL = 'http://codeink.runasp.net';
export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/Account/Login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email, password
                })
            });

            const data = await response.json();

            if (response.status !== 200 || !response.ok) {
                return rejectWithValue(data);
            } else {
                return { data, email, password };
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ email, password, displayName, userName }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/Account/Register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email, password, displayName, userName
                })
            });

            const data = await response.json();

            if (response.status !== 201 || !response.ok) {
                return rejectWithValue(data);
            } else {
                return { data, email, password, name };
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            // const { email, password } = action.payload;
            // state.user = { email, password };
        },
        register: (state, action) => {
            console.log(action.payload);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.loading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                console.log("From pending");
                state.loading = true;
                state.error = null;
                // localStorage.clear();
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("From fulfilled");
                const { data, email, password } = action.payload;
                state.loading = false;
                state.token = data.token;
                state.message = data.message;
                state.user = { email, password };
                localStorage.setItem('oauth_token', data.token);
                localStorage.setItem('user', JSON.stringify({ email, password }));
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("From rejected");
                console.log("From rejected", action.payload);
                state.loading = false;
                state.error = true
                state.token = null;
                state.user = null
                state.message = action.payload.errorMessage;
                // localStorage.clear();
            });

        builder
            .addCase(registerUser.pending, (state) => {
                console.log("From pending");
                state.loading = true;
                state.error = null;
                localStorage.clear();
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("From fulfilled");
                console.log("From fulfilled", action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log("From rejected");
                console.log("From rejected", action.payload);
            });
    }
})

export const { login, register, logout } = userSlice.actions;

export default userSlice.reducer;