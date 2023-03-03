import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../shared/baseUrl";
//const baseUrl = process.env.REACT_APP_BASE_URL;

const initialState ={
    carouselItems: [],
    status: 'idle',
    error: null
}

const carouselSlice = createSlice({
    name: 'carouselItems',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
        .addCase(fetchCorouselItems.pending, (state, action) => {
            state.status = 'loading';
          })
          .addCase(fetchCorouselItems.fulfilled, (state, action) => {
            state.status ='succeeded'
            // Add any fetched posts to the array
            state.carouselItems = state.carouselItems.concat(action.payload);
          })
          .addCase(fetchCorouselItems.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
    }
});

export const fetchCorouselItems = createAsyncThunk('carouselItems/fetchCorouselItems', async() => {
    const response = await fetch(baseUrl + '/carousels');
    return response.json();
  });

export default carouselSlice.reducer;