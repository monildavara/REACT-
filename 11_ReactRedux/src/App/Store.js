import { configureStore } from '@reduxjs/toolkit';
import todoReucer from '../Fechers/Todo/TodoSlice';

export const store = configureStore({
    reducer : todoReucer
})

