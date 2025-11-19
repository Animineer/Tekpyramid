import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name : "todo",
    initialState : [],
    reducers : {
        todoAdd : (state,action)=>{ state.push(action.payload)}, //this payload pass data
        todoDelete : (state,action)=>{
            return state.filter((_,index)=>index!==action.payload) // this payload pass the index
        }
    }
})

export const {todoAdd,todoDelete} = todoSlice.actions;
export default todoSlice.reducer;