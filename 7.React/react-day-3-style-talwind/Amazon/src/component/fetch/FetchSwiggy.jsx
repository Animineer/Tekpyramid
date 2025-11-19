import React, { useEffect, useState } from 'react'

function FetchSwiggy() {

  
  const [fetchedData, setFetchedData] = useState([])

  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/`
  console.log(fetchedData)

  useEffect(() => {


    async function fetchApi() {



      let resp = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0895&lng=80.2739&collection=83639")
      // console.log(resp)
      let data = await resp.json()
      console.log(data)

      
      
      console.log(data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle.info) //if something undefined =?
      setFetchedData(data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle.info)
    }

    fetchApi()
  
  
  }, []) //limit the rendering 


  return (
    <div>
      <h1>Fetch and display</h1>

      {   //if we want to target with object we cant use object.keys or values
        fetchedData.map((ele) => ( // we cant map method to an object so, we will target an array
          <div key={ele.id}>
            {/* <h1>{ele.action.text}</h1> */}
            <img src={`${imageUrl}${ele.imageId}`} alt="" />  {/*use two carlibraces and backticks*/}

          </div>
        ))
      }
    </div>
  )
}

export default FetchSwiggy