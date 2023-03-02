import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { baseUrl } from "../shared/baseUrl";
const baseUrl = process.env.REACT_APP_BASE_URL;

const initialState = {
    programs: [],
    status: 'idle',
    error: null
};

const programSlice = createSlice({
    name: "programs",
    initialState,
    reducers:{
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPrograms.pending, (state, action) =>{
                state.status = 'loading';
            })
            .addCase(fetchPrograms.fulfilled, (state,action)=>{
                state.status = 'succeeded';
                //add any fetched program to the array
                state.programs = state.programs.concat(action.payload);
            })
            .addCase(fetchPrograms.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.message;
            })
    }
});

export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async()=>{
    const response = await fetch(baseUrl + 'programs');
    return response.json();
})


export default programSlice.reducer;