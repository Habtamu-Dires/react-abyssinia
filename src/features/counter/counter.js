import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment,incrementByAmount,incrementAsync,selectCount } from "./counterSlice";

 function Counter(){
    //any time an action has been dispatched and redux store has been updated 
    //useSelector will re-run our selector function.
    //if the selector render different value , useSelector will make sure our component 
    // to rerender with the new value.
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    return(
        <div className="container">
            <div>
                <button aria-label="Increment value"
                    onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
            <div>
                <input aria-label="Set increment amount"
                value={incrementAmount}
                onChange={e => setIncrementAmount(e.target.value)}/>
                <button onClick={()=>
                    dispatch(incrementByAmount(Number(incrementAmount) || 0))
                }>
                    Add Amount
                </button>
                <button onClick={()=> 
                   dispatch(incrementAsync(Number(incrementAmount)|| 0)) 
                }>
                    Add Async
                </button>
            </div>
        </div>
    )
}

export default Counter;

//  NO. Global state that is needed across the app should go in the Redux store. 
//  State that's only needed in one place(component) should be kept in component state