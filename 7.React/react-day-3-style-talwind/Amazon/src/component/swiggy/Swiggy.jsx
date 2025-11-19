import React from 'react'

function Swiggy() {

  async function fetchSwiggy()
  {
  let res=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0528421&lng=80.21352089999999") //return promise
  let data=await res.json()
  
  console.log(data?.data?.cards[0]?.card?.card?.imageGridCards?.info)
  console.log(data?.data?.cards[0]?.card?.card?.imageGridCards?.info?.action?.text)
  console.log(data?.data?.cards[0]?.card?.card?.imageGridCards?.info?.imageId)
  console.log(data?.data?.cards[0]?.card?.card?.header?.title)
 


  }
fetchSwiggy()



  return (
    <div>Swiggy</div>
  )
}

export default Swiggy