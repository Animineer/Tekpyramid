
import React, { useEffect, useState, useContext } from "react";
import { FaCartPlus } from "react-icons/fa"; // Add-to-cart icon
import { FaRegWindowClose } from "react-icons/fa"; // Close icon
import { FaStar } from "react-icons/fa6"; // Star icon for rating

import ShopContext from "../context/ShopContext"; // Import global context

const Card = ({ product }) => {
  // Extract values from ShopContext
  const { setCdata, cdata, setPopup, remPopup } = useContext(ShopContext);

  // Local state to store the currently selected product for popup preview
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle adding product to cart
  function handleCart() {
    // If product is not already in cart
    if (!cdata.includes(product)) {
      setCdata([...cdata, product]); // Add product to cart
      
      // Show "item added" popup
      setPopup(true);
      setTimeout(() => {
        setPopup(false); // Auto hide after 2 sec
      }, 2000);
    } 
    else {
      // If item is already in cart → show warning popup
      remPopup(true);
      setTimeout(() => {
        remPopup(false); // Auto hide after 2 sec
      }, 2000);
    }
  }

  return (
    <div>
      {/* Product card */}
      <div className="card" key={product.id}>
        {/* Product image → click to open large preview */}
        <img
          onClick={() => setSelectedProduct(product)}
          src={product.images[0]} // Show first image
          alt={product.title}
        />

        {/* Show product rating with star */}
        <span>
          <FaStar className="star" /> {product.rating}
        </span>

        {/* Product details */}
        <h1>{product.title}</h1>
        <h2>Brand : {product.brand ? product.brand : "Unknown"}</h2>
        <h3>Price : ₹ {product.price}</h3>

        {/* Add to cart button (icon) */}
        <FaCartPlus className="cart" onClick={handleCart} />
      </div>

      {/* Product preview modal (only if selectedProduct is set) */}
      {selectedProduct && (
        <div className="showCard">
          <div className="insideCard">
            {/* Close button to hide modal */}
            <button
              className="close-btn"
              onClick={() => setSelectedProduct(null)}
            >
              <FaRegWindowClose />
            </button>

            {/* Large product image */}
            <img src={product.images[0]} alt={product.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
