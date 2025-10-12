import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div
      className="min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden relative"
      style={{ backgroundImage: "url('/header_img.png')" }}
      id="Header"
    >
      {/* Gradient Overlay untuk readability dengan nuansa orange-yellow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#CB3B0F]/70 via-[#FFAE00]/40 to-black/80"></div>

      <Navbar />
      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-[#FFAE00] relative z-10"></div>
    </div>
  );
};

export default Header;
