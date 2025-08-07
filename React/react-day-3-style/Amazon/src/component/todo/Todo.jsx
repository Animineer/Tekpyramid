import { useState } from "react"

function Todo()
{
  const[item, setItem]=useState("")
  const[list, setList]=useState([])

  const  handleChange=(event)=>{
   setItem(event.target.value)
  }
  const handleClick=(e)=>{
    e.preventDefault()
    setList((list)=>[...list,item])
    

  }
    return(
        <div>

            <h1>Todo list</h1>
            <form action="">
                <input type="text"  vlaue={item} onChange={handleChange}/>
                <button onClick={handleClick}>Add</button>
            </form>
            <p> list is {list}</p>
           
           {list.map((ele,ind)=>  //takes  index and element 
           <h1>{ele}</h1>           
        //    <h1 key={ind}>{ele}</h1> // since each child should have unique key     
           )}


        </div>
    )
}
export default Todo