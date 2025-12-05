import {createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:"todo", 
    initialState:[],
    reducers :{
        todoAdd : (state,action)=>{state.push(action.payload)},  //action.payload is the data we send - we used in GopalTorture.jsx as data
                                                            //state is the initial state
                                                            //action is the object which contains type and payload
                                                        //state.find 
        todoDel : (state,action)=>{return state.filter((_,id)=>id!=action.payload)}
    }
})

export const {todoAdd,todoDel} = todoSlice.actions;

export default todoSlice.reducer;