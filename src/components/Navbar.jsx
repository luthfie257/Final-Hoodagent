import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "./../assets/assets";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-20 transition-all duration-300">
      <div
        className={`container mx-auto flex justify-between items-center py-3 px-6 md:px-20 lg:px-32 rounded-b-lg transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-lg bg-black/40 shadow-2xl"
            : "backdrop-blur-md bg-black/20 shadow-lg"
        }`}
      >
        <Link to="/">
          <img
            src={assets.logo}
            alt="Hood Agent Logo"
            className="h-14 md:h-16 w-auto object-contain cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7 text-white font-medium">
          <Link
            to="/"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/#story"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Our Story
          </Link>
          <Link
            to="/#catalog"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Catalog
          </Link>
          <Link
            to="/#event"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Event
          </Link>
          <Link
            to="/#divisi"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Divisi
          </Link>
          <Link
            to="/products"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Products
          </Link>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/admin/login"
            className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Login
          </Link>
          <Link
            to="/admin/register"
            className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src={isMenuOpen ? assets.cross_icon : assets.menu_icon}
            alt="menu"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 w-64 bg-black/95 backdrop-blur-lg transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 pt-20 gap-6">
          <Link
            to="/"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/#story"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Story
          </Link>
          <Link
            to="/#catalog"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Catalog
          </Link>
          <Link
            to="/#event"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Event
          </Link>
          <Link
            to="/#divisi"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Divisi
          </Link>
          <Link
            to="/products"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <Link
              to="/admin/login"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/admin/register"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
