import {configureStore} from '@reduxjs/toolkit';
import noteReducers from './notesSlice';
 const  store = configureStore({
    reducer: {
        note:noteReducers
    }
}) 
export default store;

