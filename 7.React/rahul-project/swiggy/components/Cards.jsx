import React from 'react'
import style from "./Cards.module.css";

import { MdStars } from "react-icons/md";

function Cards(props) {
  return (
    <>
     <div className={style.cards}>
          {props.send?.map((e) => {
            return (
              <div className={style.card}>
                <div className={style.cardImage}>
                   <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${e.info?.cloudinaryImageId}`}
                  key={e?.id}
                />
                </div>
                <div className={style.cardContent}>
                  <h3>{e.info.name}</h3>
                  <h6><MdStars  color="green" size={18} className={style.star}/>{e.info.avgRating}.{e.info.sla.slaString}</h6>
                  <p>{e.info.cuisines.join(", ")}, {e.info.areaName}</p>
                </div>
              </div>
            );
          })}
        </div>
    </>
  )
}

export default Cards