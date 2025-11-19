import React from 'react'
import style from "./Header.module.css"
import user from "../../assets/user.png"
import heart from "../../assets/heart.png"
import bag from "../../assets/shopping-bag.png"
import search from "../../assets/search.png"
import logo from "../../assets/logo.png"

export const Header = () => {
  return (
    <div className={style.container}>
        <img src={logo} alt="" />
        
        <ul type="none">
        <li>MEN</li>
        <li>WOMEN</li>
        <li>KIDS</li>
        <li>HOME</li>
        <li>BEAUTY</li>
        <li>GENZ</li>
        <li>STUDIO</li>
        </ul>
        
        <div className={style.right}>
            <div className={style.search}>
            <img src={search} alt="" />
            <input type="text" placeholder='Search for products, brands and more' />
        </div>

        <div >
            <img  src={user} alt="" />
            <img  src={heart} alt="" />
            <img src={bag} alt="" />
        </div>
         </div>

    </div>
  )
}
