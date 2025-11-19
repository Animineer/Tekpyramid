import React from 'react'
export const revalidate = false; // 👈 disables revalidation → pure SSG


async function SSGExample() {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();
  return (
    <div>
      <h1>SSGExample</h1>
      {data.products.map((p: any) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}

export default SSGExample




