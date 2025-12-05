// Build a todo app (add, delete tasks) using useState and useReducer.

import { Button } from 'bootstrap';
import React, { useReducer } from 'react'

function Task5() {
    const [val,dispatch]=useReducer(red,{list:[],valu:''});

    function red (val,act) {
        switch(act.type){
            case 'enter': {if(val.valu!='') {
                return {...val,list:[...val.list,{id:Date.now(),text:val.valu}],valu:''}}
                else return{...val}
            }
            case 'chng' : return {...val,valu:act.pl}
            case 'del'  : return {...val,list:val.list.filter((e)=>e.id!==act.pl)}
            
        }
    }
  return (
    <div>
        <input type="text" value={val.valu} onChange={(e)=>dispatch({type:'chng',pl:e.target.value})}  onKeyDown={(e)=>e.key=='Enter'&&   dispatch({type:'enter'})} />
        <button onClick={()=>dispatch({type:'enter'})} >click</button><br /> <br />
        <div className='d-flex flex-column gap-5'>
            {val.list.map((e)=>(
                <div key={e.id} className='d-flex gap-2'>
                    <p>{e.text}</p>
                    <button onClick={()=>dispatch({type:'del',pl:e.id})}>delete</button>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default Task5


