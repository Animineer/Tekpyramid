import Link from 'next/link';
import React from 'react'

async function Product() {

   const resp = await fetch("https://dummyjson.com/products");
   const data = await resp.json();
    console.log(data)
  return (
    <div>
        <h1>fetch and dispaly products data</h1>
        <div className='flex justify-center items-center flex-wrap gap-5'>
          {
            data.products.map((ele)=>(
              <div key={ele.id} className='bg-gray-300 text-white w-75 h-75 gap-3 flex flex-col'>
                  <p className='m-5 p-5'>{ele.title}</p>
                  <Link href={`/products/${ele.id}`} className='bg-indigo-600 m-5 p-4 rounded-3xl'> View Product Details</Link>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Product