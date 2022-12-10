import {configureStore} from '@reduxjs/toolkit';
import carouselItemReducer from './carouselItemSlice';
import programReducer from './programsSlice';
import classReducer from './classSlice'


export default configureStore({
    reducer: {
        programs:programReducer,
        classes: classReducer,
        carouselItems: carouselItemReducer,
    }
});