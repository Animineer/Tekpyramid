import React from "react";
import logo from "../assets/swiggy-transparent-icon-free-png.webp";
import style from "./Header.module.css";

import { IoIosArrowDown } from "react-icons/io";
import { TbBriefcase2 } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import { RiDiscountPercentLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoIosHelpBuoy } from "react-icons/io";

const Header = () => {
  return (
    <>
      <div className={style.nav}>
        <div className={style.logoSection}>
          <img src={logo} alt="" className={style.logoImg}/>
          <div className={style.others}>
            <span>Other</span>
            <IoIosArrowDown className={style.IoIosArrowDown}/>
          </div>  
        </div>

        <div className={style.links}>
          <div>
            <TbBriefcase2 className={style.linkLogo}/>
            Swiggy Corporate
          </div>
          <div>
            <IoMdSearch className={style.linkLogo}/>
            Search
          </div>
          <div>
            <RiDiscountPercentLine className={style.linkLogo}/>
            Offers
            <sup>NEW</sup>
          </div>
          <div>
            <IoIosHelpBuoy className={style.linkLogo}/>
            Help
          </div>
          <div>
            <FaRegUserCircle className={style.linkLogo}/>
            Sign in
          </div>
          <div>
            <LuShoppingCart className={style.linkLogo}/>
            Cart
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
