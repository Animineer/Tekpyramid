import React from "react";
import Useapi from "./custom hooks/Useapi";

const Fetchapi = () => {
  const finalData = Useapi("https://dummyjson.com/users");
  console.log(finalData);
  return (
    <div>
      {finalData.map((e) => {
        return(
        <div key={e.key}>
          <h1>Name : {e.firstName} {e.lastName}</h1>
          <h1>Age : {e.age}</h1>
          <h1>Email : {e.email}</h1>
          <h1>Phone : {e.phone}</h1>
          <h1>Birth Date : {e.birthDate}</h1>
          <img src={e.image} alt="" />
          <hr />
        </div>
      )
      })}
    </div>
  );
};

export default Fetchapi;
