/* 
    - A slice is a collection of reducer logic and actions for a single feature
     in your app.
   createSlice - takes care of  generating action type strings,
      action creator functions, and action objects.
    createSlice function lets you write immutable updates an easier way.
        --lets you to write code that mutate ---track and returns immutable update --  
*/

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action)=> {
            state.value += action.payload
        }
    }
});

//Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = counterSlice.actions;
//The function below is called Thunk and allowed as to perform async logic.
// a special kind of Redux function that perform async logic.
export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 1000)
}
//The function below is called a selector and allow us to select a value from the state.
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
