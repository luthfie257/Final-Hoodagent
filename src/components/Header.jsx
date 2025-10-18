import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import header2 from "../assets/8.png";
import header3 from "../assets/9.png";

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of header images from assets folder
  const headerImages = ["/header_img.png", header2, header3];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % headerImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden relative"
      id="Header"
    >
      {/* Background Images Layering for Crossfade */}
      {headerImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url('${image}')`,
            opacity: currentImageIndex === index ? 1 : 0,
          }}
        />
      ))}

      <Navbar />

      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-[#FFAE00] relative z-10"></div>
    </div>
  );
};

export default Header;
