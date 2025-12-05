import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice.js'

export const store =configureStore({
    reducer:{
        todo: todoReducer, //any desired name and the 'todo' place name should be same from todoslice.js
                            //this name will we use for rendering as state.todo in useSelector

    }
})