import React from 'react'
export const revalidate = 60; //👇 ISR enabled → regenerate every 60 seconds


async function ISRExample() {
  const resp = await fetch("https://dummyjson.com/products");
  const data = await resp.json();
  return (
    <div>
      <h1>ISR Example</h1>
      {data.products.map((p: any) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}

export default ISRExample