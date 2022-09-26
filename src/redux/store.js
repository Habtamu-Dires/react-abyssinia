import {configureStore} from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import counterReducer from '../features/counter/counterSlice';
import studentReducer from './studentSlice';

export default configureStore({
    reducer: {
        counter:counterReducer,
        posts: postsReducer,
        student: studentReducer
    }
})