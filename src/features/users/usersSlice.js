import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import fetch from "cross-fetch";
import { baseUrl } from "../../shared/baseUrl";

const initialState = [];

export const features = createAsyncThunk('users/fetchUsers', async()=> {
    const response = await fetch(baseUrl + 'users');
    return response.json();
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(features.fulfilled, (state, action) => {
            return action.payload
        })

    }
})

export default usersSlice.reducer;
