import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name : "todo",
    initialState : [],
    reducers : {
        todoAdd : (state,action)=>{ state.push(action.payload)},
        todoDelete : (state,action)=>{
            return state.filter((_,index)=>index!==action.payload)
        }
    }
})

export const {todoAdd,todoDelete} = todoSlice.actions;
export default todoSlice.reducer;