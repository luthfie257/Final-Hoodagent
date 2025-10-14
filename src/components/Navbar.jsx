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
    <div
      className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-lg bg-black/40 shadow-2xl"
          : "backdrop-blur-md bg-black/20 shadow-lg"
      }`}
    >
      <div className="flex justify-between items-center py-3 px-6 md:px-20 lg:px-32">
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
            to="/about"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Our Story
          </Link>
          <Link
            to="/projects"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Catalog
          </Link>
          <Link
            to="/events"
            className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
          >
            Event
          </Link>
          <Link
            to="/divisi"
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

        {/* Desktop Auth Icon */}
        <Link
          to="/admin/login"
          className="hidden md:flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white hover:text-[#CB3B0F] text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110"
          title="Login / Register"
        >
          <i className='bx bxs-user-circle text-3xl'></i>
        </Link>

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
            to="/about"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Story
          </Link>
          <Link
            to="/projects"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Catalog
          </Link>
          <Link
            to="/events"
            className="text-white text-lg hover:text-[#FFAE00] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Event
          </Link>
          <Link
            to="/divisi"
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

          {/* Mobile Auth Icon */}
          <Link
            to="/admin/login"
            className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#CB3B0F] transition-all duration-300 mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className='bx bxs-user-circle text-2xl'></i>
            <span>Login / Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
