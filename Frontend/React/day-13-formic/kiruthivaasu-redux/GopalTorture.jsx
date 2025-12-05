import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { todoAdd ,todoDel } from './todoSlice';
function GopalTorture() {
    const [data,setData]=useState({uname:'',pass:''});
   
    const allData =useSelector((state)=>state.todo)  //name in todoSlice
                                                    //state.todo - 'todo' is from store.js
    console.log(allData);
    const dispatch= useDispatch()

    function add(){
        if(data.uname!='' && data.pass != '')
        dispatch(todoAdd(data)); // this data is action.payload in todoSlice.js
        setData({uname:'',pass:''});
    }
    function del(ind){
        dispatch(todoDel(ind)) //here ind is action.payload in todoSlice.js
    }

  return (
    <div>
        <input type="text" placeholder='username' onChange={(e)=>setData((p)=>{return{...p,uname:e.target.value}})}     value={data.uname} />
        <input type='password' placeholder='password' onChange={(e)=>setData((pre)=>{return{...pre,pass:e.target.value}})} value={data.pass} onKeyDown={(e)=>e.key=='Enter' && add()}/>
        <button onClick={add}>Add</button>
        <div>
            {
                allData.map((e,ind)=>{
                    return <div key={ind}>{'Username:'+e.uname + ' Password: '+e.pass }
                    <button onClick={()=>del(ind)}>delete</button></div>
                })
            }
        </div>
    </div>
  )
}

export default GopalTorture