import { createSlice } from "@reduxjs/toolkit";


const authslice = createSlice({
    name:'auth',
    initialState: {user:null, token: null},
    reducers: {
        loginSuccess:(state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { loginSuccess, logout} = authslice.actions;
export default authslice.reducer;