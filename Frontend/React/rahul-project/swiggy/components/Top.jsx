import React from "react";
import style from "./Top.module.css";

const Top = (props) => {
  console.log(props);
  return (
    <>
      <div className={style.top}>
        {props.send?.map((e) => {
          return (
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${e.imageId}`}
                key={e.id}
              />
          );
        })}
      </div>
    </>
  );
};

export default Top;
