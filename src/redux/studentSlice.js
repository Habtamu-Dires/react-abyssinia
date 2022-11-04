import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../shared/baseUrl";


const initialState = {
    students: [],
    status: 'idle',
    error: null
};

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        studentAdded(state, action) {
            state.students.concat(action.payload);
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchStudents.pending, (state, action)=>{
            state.status = 'loading';
        })
        .addCase(fetchStudents.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            //console.log(action.payload);
            state.students = state.students.concat(action.payload);
        })
        .addCase(fetchStudents.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }

})

export const fetchStudents = createAsyncThunk('students/fetchStudents', async ()=>{
    const response = await fetch(baseUrl + 'students');
    return response.json();
})

export const {studentAdded} = studentSlice.actions;

export default studentSlice.reducer;