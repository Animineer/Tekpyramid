import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Lazy() {
  let [data1, setData1] = useState([]);
  async function abc() {
    let res = await axios("https://dummyjson.com/carts");
    setData1(res?.data?.carts);
    // console.log(res?.data?.carts);
  }
  useEffect(() => {
    abc();
  }, []);
//   console.log(data1);
  return (
    <>
      {data1?.map((ele) => (
        <div key={ele.id}>
          <p>{ele.total}</p>
        </div>
      ))}
    </>
  );
}
