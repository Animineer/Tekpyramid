import React, { useEffect, useState } from 'react'

const Useapi = (url) => {
    const[add,setAdd]=useState([])

   useEffect(()=>{
     async function fApi(){
        const api = await fetch(url)
        let jsonData = await api.json()
        setAdd(jsonData.users)
    }
    fApi()
   },[])

  return add
}

export default Useapi