import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "./../assets/assets";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { getTotalItems } = useCart();

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

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-7 text-white font-medium">
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
            {/* <Link
              to="/projects"
              className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
            >
              Catalog
            </Link> */}
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
              Gallery
            </Link>
            <Link
              to="/products"
              className="cursor-pointer hover:text-[#FFAE00] transition-colors duration-300"
            >
              Products
            </Link>
          </ul>
        </div>

        {/* Cart Icon - Desktop */}
        <button
          onClick={() => setIsCartModalOpen(true)}
          className="hidden md:flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white hover:text-[#CB3B0F] text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 relative"
          title="Shopping Cart"
        >
          <i className="bx bx-cart text-3xl"></i>
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#CB3B0F] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
              {getTotalItems()}
            </span>
          )}
        </button>

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

          {/* Cart Link - Mobile */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsCartModalOpen(true);
            }}
            className="flex items-center justify-between bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#CB3B0F] transition-all duration-300 mt-4 w-full"
          >
            <div className="flex items-center gap-3">
              <i className="bx bx-cart text-2xl"></i>
              <span>Shopping Cart</span>
            </div>
            {getTotalItems() > 0 && (
              <span className="bg-[#CB3B0F] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </div>
  );
};

export default Navbar;
