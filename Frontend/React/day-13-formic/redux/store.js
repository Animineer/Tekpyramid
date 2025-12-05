
import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "./todoSlice"

export const store = configureStore({
    reducer : {
        todo : todoReducer    // name of slice : and reducer imported from slice as todoreducer
    }
})