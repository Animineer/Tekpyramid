import React from 'react'
import style from "./Footer.module.css";

import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import logo from '../assets/swiggy-transparent-icon-free-png.webp'
import logo1 from '../assets/app_store.avif'
import logo2 from '../assets/play_store.avif'





function Footer() {
  return (
    <>
    <footer>
      <div className={style.part1}>
        <p>For better experience,download the Swiggy app now</p>
        <img src={logo2} alt="" />
        <img src={logo1} alt="" />
      </div>

      <div className={style.part2}>
        <div className={style.links1}>
          <div className={style.logoSwiggy}>
            <img src={logo} alt="" />
            <span>Swiggy</span>
          </div>
          <p>© 2025 Swiggy Limited</p>
        </div>

        <div className={style.links2}>
          <h3>Company</h3>
          <a href="#">About us</a>
          <a href="#">Swiggy corparate</a>
          <a href="#">Careears</a>
          <a href="#">Team</a>
          <a href="#">swiggy one</a>
          <a href="#">Swiggy instant</a>
          <a href="#">Swiggy dineout</a>
          <a href="#">Swiggy gennie</a>
          <a href="#">Minis</a>
          <a href="#">Ping</a>
        </div>
        <div className={style.links3}>
          <h3>contact us</h3>
          <a href="#">Help & Support</a>
          <a href="#">Contact with us</a>
          <div className={style.inside}>
            <h3>Legal</h3>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Invester Relations </a>
          </div>
        </div>
        <div className={style.links4}>
          <h3>Available in</h3>
          <a href="#">Bengalore</a>
          <a href="#">Gurgan</a>
          <a href="#">Hyderabad</a>
          <a href="#">Delhi</a>
          <a href="#">Mumbai</a>
          <a href="#">Pune</a>
        </div>
        <div className={style.links5}>
          <h3>Life at swiggy</h3>
          <a href="#">About us</a>
          <a href="#">Swiggy Corparate</a>
          <a href="#">Careears</a>
          <div className={style.sLink}>
            <h3>Socila links</h3>
            <div className={style.icons}>
                <FaLinkedin/>
                <FaInstagram/>
                <FaFacebookF/>
                <FaPinterest/>
                <FaXTwitter/>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer