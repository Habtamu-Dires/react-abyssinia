import { createSlice } from "@reduxjs/toolkit";
import {STUDENT} from '../shared/student';

const initialState = STUDENT;

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        studentAdded(state, action) {
            state.push(action.payload);
        }
    }

})

export const {studentAdded} = studentSlice.actions;

export default studentSlice.reducer;