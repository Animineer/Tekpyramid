import React from 'react'
import style from "./Section.module.css";

function Section(props) {
    console.log(props)
  return (
    <>
    <div className={style.section}>
        <h2>{props.send.card?.card?.title}</h2>
        <div>
            {props.send.card?.card?.brands.map((e)=>{
            return(
                <div className={style.demos}>
                  <span>{e.text}</span>
                </div>
            )
        })}
        </div>
    </div>
    </>
  )
}

export default Section