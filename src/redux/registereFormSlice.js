import { createSlice } from "@reduxjs/toolkit";
import { RegistereForm } from "../shared/registeredForm";


const initialState = RegistereForm;

export const RegisterFormSlice =createSlice({
    name: 'registerForm',
    initialState,
    reducers: {
        resetingForm: (state) => {
            state.fullName = '';
        },
        persistForm: (state, action) => {
            state.fullName = action.payload.fullName;
            state.phone = action.payload.phone;
            state.gender = action.payload.gender;
            state.program = action.payload.program;
            state.otherProgram = action.payload.otherProgram;
            state.education = action.payload.education;
            state.days = action.payload.days;
            state.time = action.payload.time;
        }
    }
})

export const {resetingForm, persistForm} = RegisterFormSlice.actions;

export default RegisterFormSlice.reducer;