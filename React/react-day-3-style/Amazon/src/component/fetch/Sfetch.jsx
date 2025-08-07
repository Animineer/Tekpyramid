import React, { useEffect, useState } from 'react'
 
function FetchComponent() {
 
    const [data,setData] = useState([])
    useEffect(()=>{
     async function fetchApi (){
        const resp = await fetch("https://dummyjson.com/products");
        const actualData = await resp.json()
        setData(actualData)
       }
       fetchApi()
 
    },[])
    // console.log(data)
  return (
    <div>
        <h1>Fetch an api</h1>
        {
            data.products?.map((ele)=>(
                <div>
                    <p>{ele.title}</p>
                </div>
            ))
        }
    </div>
  )
}
 
export default FetchComponent