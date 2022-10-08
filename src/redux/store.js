import {configureStore} from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import counterReducer from '../features/counter/counterSlice';
import studentReducer from './studentSlice';
import registereReducer from './registereFormSlice';
import userReducer from '../features/users/usersSlice';

export default configureStore({
    reducer: {
        counter:counterReducer,
        posts: postsReducer,
        users: userReducer,
        student: studentReducer,
        registerForm: registereReducer
    }
})