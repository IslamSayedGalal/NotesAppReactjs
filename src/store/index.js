import {configureStore} from '@reduxjs/toolkit';
import toggleReducer from './toggleSlice';



const store = configureStore({reducer: {toggleColor: toggleReducer}});

export default store;
