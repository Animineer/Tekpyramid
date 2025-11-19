//Homepage
import React, { useEffect, useState } from "react";
import "../components/Card.css";

import Card from "../components/Card"; // Product card
import Header from "../components/Header"; // Header with cart

import ShopContext from "../context/ShopContext";
import { FaRegCheckSquare } from "react-icons/fa"; // Success icon
import { FiAlertCircle } from "react-icons/fi"; // Alert icon

const Shop = () => {
  // Local state for products fetched from API
  const [data, setData] = useState([]);

  // Shared data state (could be used for filters/search)
  const [sharedData, setSharedData] = useState([]);

  // Cart data state
  const [cdata, setCdata] = useState([]);

  // Cart visibility toggle state
  const [show, setShow] = useState(false);

  // Popups for notifications
  const [popup, setPopup] = useState(false); // Item added popup
  const [remup, remPopup] = useState(false); // Item already exists popup

  // Fetch product data when component mounts
  useEffect(() => {
    fetchApi();
  }, []);

  // API call to get product data
  async function fetchApi() {
    const api = await fetch("https://dummyjson.com/products");
    const jsonData = await api.json();
    setData(jsonData.products); // Store products in state
  }

  return (
    <div className="main">
      {/* Wrap all components with ShopContext provider */}
      <ShopContext.Provider
        value={{
          sharedData,
          setSharedData,
          cdata,
          setCdata,
          show,
          setShow,
          setPopup,
          remPopup
        }}
      >
        {/* Header with cart button */}
        <Header product={data} />

        {/* Popup when item is added */}
        {popup && (
          <div className="popup">
            <p>Item Added <FaRegCheckSquare className="tik"/></p>
          </div>
        )}

        {/* Popup when item already exists */}
        {remup && (
          <div className="remup">
            <p><FiAlertCircle className="tik"/> Item Already Added in Cart</p>
          </div>
        )}

        {/* Render product cards */}
        <div className="cardContainer">
          {data.length > 0 &&
            data.map((e, i) => (
              <div key={i}>
                <Card product={e} /> {/* Passing product to Card component */}
              </div>
            ))}
        </div>
      </ShopContext.Provider>

      <br />
    </div>
  );
};

export default Shop;
