import React, { useEffect } from 'react'

export const Fetch = () => {
  
   useEffect(()=>{
        async function fetchapi() {

            const resp=await fetch("https://dummyjson.com/products") //fetch-console->promise
            const actualData =await resp.json()   //resp-console=> raw data -give response
            console.log()                       // actualdata-console=>data 
            setdata(actualData)
        }
        fetchapi()
   })


    return (
    <div>                               //? optional chaining -skip the undefine data

    data.products?.map((ele)=>
    {
        <h1>{ele}</h1>
    })                  //data is an object we cant apply map method - array so we will target array
    </div>
  )
}
