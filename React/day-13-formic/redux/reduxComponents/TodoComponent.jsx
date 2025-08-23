import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoAdd, todoDelete } from '../todoSlice'

function TodoComponent() {

    const [data,setData] = useState("")

    const allData = useSelector((state)=>state.todo)
    console.log(allData)
    const dispatch = useDispatch()
    
    const handleAdd = ()=>{
        dispatch(todoAdd(data))
    }
  return (
    <div>
        <h1>Todo list</h1>
        <input type="text" name='data' value={data} onChange={(e)=>setData(e.target.value)}/>
        <button onClick={handleAdd}>Add</button>
        <div>
            {
                allData.map((ele,ind)=>(
                    <div key={ind}>
                        <span>{ele}</span>
                        <button onClick={()=>dispatch(todoDelete(ind))}>Delete</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default TodoComponent