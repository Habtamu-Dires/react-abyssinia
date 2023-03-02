import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import {baseUrl} from '../shared/baseUrl';
const baseUrl = process.env.REACT_APP_BASE_URL;

const initialState ={
    classes: [],
    status: 'idle',
    error: null 
};

const classSlice = createSlice({
    name: "classes",
    initialState,
    reducers:{        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchClasses.pending, (state, action) =>{
                state.status = 'loading';
            })
            .addCase(fetchClasses.fulfilled, (state,action)=>{
                state.status = 'succeeded';
                //add any fetched program to the array
                state.classes = state.classes.concat(action.payload);
            })
            .addCase(fetchClasses.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.message;
            })
    }
    
});

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async()=>{
    const response = await fetch(baseUrl + 'classes')
    return response.json()
})

export default classSlice.reducer;