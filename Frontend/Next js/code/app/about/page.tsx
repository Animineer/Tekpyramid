
import React from 'react'

import NewsEvents from '../components/NewsEvents'

async function page() {
  
  const resp = await fetch("https://dummyjson.com/products");
  const data = await resp.json()
  console.log(data)
  return (
    <div>
      <h1>About page</h1>
      <NewsEvents/>
    </div>
  )
}

export default page