import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../shared/baseUrl";


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
            .addCase(fetchPrograms.pending, (state, acction) =>{
                state.status = 'loading';
            })
            .addCase(fetchPrograms.fulfilled, (state,acction)=>{
                state.status = 'succeeded';
                //add any fetched program to the array
                console.log("0202wwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
                state.programs = state.programs.concat(acction.payload);
            })
            .addCase(fetchPrograms.rejected, (state, acction)=>{
                state.status = 'failed'
                state.error = acction.error.message;
            })
    }
});

export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async()=>{
    const response = await fetch(baseUrl + 'programs');
    return response.json();
})


export default programSlice.reducer;