//navbar 
import React, { useState, useContext, useEffect, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Shopping cart icon
import { MdDeleteForever } from "react-icons/md"; // Delete icon

import ShopContext from "../context/ShopContext"; // Import global context

const Header = () => {
  // Destructure values from ShopContext
  const { cdata, setCdata, show, setShow } = useContext(ShopContext);

  // Function to remove item from cart by index
  function removeList(ind) {
    setCdata(cdata.filter((_, i) => i !== ind)); // Filter out item at index `ind`
  }

  let totalPrice = 0;
  // Function to calculate total price of cart items
  function findAmount() {
    cdata.forEach((item) => (totalPrice += item.price));
  }
  findAmount();

  // Function to close cart when user clicks outside
  const closeCart = () => {
    setShow(false);
  };

  return (
    <div className="header">
      {/* Navbar with shop name and cart */}
      <nav>
        <div>
          <h3>SHOPPING</h3>
        </div>

        {/* Cart button */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              setShow((prev) => !prev); // Toggle cart visibility
            }}
          >
            <FaShoppingCart className="menu" /> {/* Cart icon */}
            <p className="counting">{cdata.length}</p> {/* Show count of items */}
          </button>
        </div>
      </nav>

      {/* Cart overlay (shown only if `show` is true) */}
      <div
        className="mainCartContainer"
        onClick={closeCart}
        style={{ display: show ? "block" : "none" }}
      >
        {/* Inner cart → clicking inside won't close */}
        <div
          className="cartContainer"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>YOUR CART</h2>

          {/* List of cart items */}
          <ol id="ul">
            {cdata.map((ele, ind) => {
              return (
                <div key={ind} className="cartInside">
                  <div>
                    <li>{ele.title}</li> {/* Item name */}
                    <p>₹ {ele.price}</p> {/* Item price */}
                  </div>

                  {/* Remove button for each item */}
                  <div>
                    <button
                      className="removeButton"
                      onClick={() => removeList(ind)}
                    >
                      <MdDeleteForever className="remove" /> {/* Delete icon */}
                    </button>
                  </div>
                </div>
              );
            })}
          </ol>

          {/* Total amount section */}
          <div className="totalAmount">
            Total Amount : ₹ {Math.round(totalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
