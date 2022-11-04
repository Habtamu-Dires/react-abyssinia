import {configureStore} from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import counterReducer from '../features/counter/counterSlice';
import studentReducer from './studentSlice';
import carouselItemReducer from './carouselItemSlice';
import registereReducer from './registereFormSlice';
import userReducer from '../features/users/usersSlice';
import programReducer from './programsSlice';



export default configureStore({
    reducer: {
        programs:programReducer,
        students: studentReducer,
        carouselItems: carouselItemReducer,
        counter:counterReducer,
        posts: postsReducer,
        users: userReducer,        
        registerForm: registereReducer
    }
});