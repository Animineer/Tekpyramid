import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import style from "./Home.module.css";

import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import Top from "../../components/Top";
import Card from "../../components/Card";
import Cards from "../../components/Cards";
import Section from "../../components/Section";
import Footer from "../../components/Footer";

const Home = () => {
  const [done, setDone] = useState([]);
  const [done2, setDone2] = useState([]);
  const [done3, setDone3] = useState([]);
  const [done4, setDone4] = useState([]);
  const [done5, setDone5] = useState([]);
  const [done6, setDone6] = useState([]);
  const [done7, setDone7] = useState([]);
  useEffect(() => {
    async function fetchApi() {
      try {
        const response = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9480472&lng=80.1309948"
        );
        const data = await response.json();
        setDone(data?.data?.cards[0]?.card?.card?.header);
        setDone2(data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        setDone3(data?.data?.cards[1]?.card?.card?.header);
        setDone4(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setDone5(data?.data?.cards[2]?.card?.card?.title);
        setDone6(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setDone7(data?.data?.cards[7]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      <Header />
      
      <main>
        <div className={style.main}>
          <div className={style.title}>
            <h3>{done?.title}</h3>
            <div className={style.arrows}>
              <div>
                <FaArrowLeftLong className={style.arrow} />
              </div>
              <div>
                <FaArrowRight className={style.arrow} />
              </div>
            </div>
          </div>

          <Top send={done2} />

          <hr className={style.hr} />

          <div className={style.title}>
            <h3>{done3.title}</h3>
            <div className={style.arrows}>
              <div>
                <FaArrowLeftLong className={style.arrow} />
              </div>
              <div>
                <FaArrowRight className={style.arrow} />
              </div>
            </div>
          </div>

          <Card send={done4} />

          <hr className={style.hr} />
          <h3>{done5}</h3>
          <br />
          <div className={style.buttons}>
            <span>Filter</span>
            <span>Sort by</span>
            <span>Fast Delivery</span>
            <span>New on Swiggy</span>
            <span>Ratings 4.0+</span>
            <span>Pure veg</span>
            <span>Offers</span>
            <span>Rs 300-Rs 600</span>
            <span>Less tha Rs 300</span>
          </div>

          <Cards send={done6}/>


          <Section send={done7}/>

        </div>
      </main>

      <Footer/>
    </>
  );
};

export default Home;
