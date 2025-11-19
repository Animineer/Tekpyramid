import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface productParams{
    params :{
        productid : string
    }
}

 async function Product({params} : productParams) {

    const {productid} =  params
    console.log(productid)

    const productresp = await fetch(`https://dummyjson.com/products/${productid}`);
    const productData = await productresp.json()
    console.log(productData.images[0])
  return (
    <div>
        <h1>Product details</h1>
        <p>{productData.title}</p>
        <p>{productData.brand}</p>
        <Image src={productData.images[0]} width={400} height={200} alt='product image'/>
        <Link href={"/products"} className='bg-amber-300 p-4 rounded-3xl'>Back to Products</Link>
        
    </div>
  )
}

export default Product