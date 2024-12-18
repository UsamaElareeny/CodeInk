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
    async ({ email, password, displayName, UserName ,C_password }, { rejectWithValue }) => {
        try {
            if(C_password!==password) throw ({errorMessage:"Passwords do not match"});
            const response = await fetch(`${API_URL}/api/Account/Register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email, password, displayName, UserName
                })
            });

            const data = await response.json();

            if (response.status !== 201 || !response.ok) {
                return rejectWithValue(data);
            } else {
                return { data, email, password, UserName };
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
            localStorage.clear();
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
                state.token = data.data.token;
                state.message = data.errorMessage;
                state.user = { email, password };
                localStorage.setItem('jwt_token', data.data.token);
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
                state.loading = false;
                state.error = true
                state.token = null;
                state.user = null
                state.message = action.payload.errorMessage;
            });
    }
})

export const { login, register, logout } = userSlice.actions;

export default userSlice.reducer;