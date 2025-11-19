// WallpaperCarousel.jsx
import React from "react";
import Slider from "react-slick";
import w1 from "../../assets/cro1.jpeg";
import w2 from  "../../assets/cro2.png";
import w3 from"../../assets/cro3.jpeg";
import w4 from"../../assets/cro4.jpeg";

// Array of wallpaper images
const wallpapers = [
//   "../../assets/cro1.jpeg",
//   "../../assets/cro2.png",
//   "../../assets/cro3.jpeg",
// "../../assets/cro4.jpeg"
w1,w2,w3,w4];

const Crausel = () => {
  // Slider settings
  const settings = {
    dots: true,          // Show navigation dots
    infinite: true,      // Loop infinitely
    speed: 500,          // Animation speed
    slidesToShow: 1,     // Show 1 slide at a time
    slidesToScroll: 1,   // Scroll 1 slide
    autoplay: true,      // Auto slide
    autoplaySpeed: 3000, // 3 seconds
    arrows: true         // Show next/prev arrows
  };

  return (
    <div style={{ width: "100%", height:"350px", overflow: "hidden" }}>
      <Slider {...settings}>
        {wallpapers.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Wallpaper ${index}`}
              style={{
                width: "100%",
                height: "100vh",
                objectFit: "cover"
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Crausel;
