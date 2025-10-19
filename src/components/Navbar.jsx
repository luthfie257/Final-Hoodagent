import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "./../assets/assets";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { getTotalItems } = useCart();
  const searchRef = useRef(null);
  const location = useLocation();

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

  // Search functionality
  useEffect(() => {
    const searchAllData = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      setShowResults(true);

      try {
        const [productsRes, eventProductsRes, eventsRes] = await Promise.all([
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/event-products`),
          axios.get(`${API_URL}/events`),
        ]);

        const query = searchQuery.toLowerCase();
        const results = [];

        // Search Products
        productsRes.data.forEach((item) => {
          if (
            item.name?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
          ) {
            results.push({ ...item, type: "product", category: "Product" });
          }
        });

        // Search Event Products
        eventProductsRes.data.forEach((item) => {
          if (
            item.name?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
          ) {
            results.push({ ...item, type: "event-product", category: "Event Product" });
          }
        });

        // Search Events
        eventsRes.data.forEach((item) => {
          if (
            item.title?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.location?.toLowerCase().includes(query)
          ) {
            results.push({ ...item, type: "event", category: "Event" });
          }
        });

        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchAllData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchClick = (item) => {
    setSearchQuery("");
    setShowResults(false);
    // Navigate based on type
    if (item.type === "product" || item.type === "event-product") {
      window.location.href = "/products";
    } else if (item.type === "event") {
      window.location.href = "/events";
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-lg bg-black/40 shadow-2xl"
          : "backdrop-blur-md bg-black/20 shadow-lg"
      }`}
    >
      <div className="container mx-auto px-6 md:px-20 lg:px-32">
        <div className="flex items-center py-3 relative">
          {/* Logo */}
          <Link to="/">
            <img
              src={assets.logo}
              alt="Hood Agent Logo"
              className="h-14 md:h-16 w-auto object-contain cursor-pointer"
            />
          </Link>

        {/* Desktop Menu - Centered (Absolute) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex gap-7 text-white font-medium">
            <Link
              to="/"
              className={`cursor-pointer hover:text-[#FFAE00] transition-colors duration-300 pb-1 border-b-2 ${
                location.pathname === "/"
                  ? "border-[#FFAE00] text-[#FFAE00]"
                  : "border-transparent"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`cursor-pointer hover:text-[#FFAE00] transition-colors duration-300 pb-1 border-b-2 ${
                location.pathname === "/about"
                  ? "border-[#FFAE00] text-[#FFAE00]"
                  : "border-transparent"
              }`}
            >
              Our Story
            </Link>
            {/* <Link
              to="/projects"
              className={`cursor-pointer hover:text-[#FFAE00] transition-colors duration-300 pb-1 border-b-2 ${
                location.pathname === "/projects"
                  ? "border-[#FFAE00] text-[#FFAE00]"
                  : "border-transparent"
              }`}
            >
              Catalog
            </Link> */}
            <Link
              to="/events"
              className={`cursor-pointer hover:text-[#FFAE00] transition-colors duration-300 pb-1 border-b-2 ${
                location.pathname === "/events"
                  ? "border-[#FFAE00] text-[#FFAE00]"
                  : "border-transparent"
              }`}
            >
              Event
            </Link>
            <Link
              to="/gallery"
              className={`cursor-pointer hover:text-[#FFAE00] transition-colors duration-300 pb-1 border-b-2 ${
                location.pathname === "/gallery"
                  ? "border-[#FFAE00] text-[#FFAE00]"
                  : "border-transparent"
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/products"
              className={`cursor-pointer hover:text-[#FFAE00] transition-colors duration-300 pb-1 border-b-2 ${
                location.pathname === "/products"
                  ? "border-[#FFAE00] text-[#FFAE00]"
                  : "border-transparent"
              }`}
            >
              Products
            </Link>
          </ul>
        </div>

        {/* Right Side: Search + Cart */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {/* Search Bar */}
          <div className="relative" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-44 px-3 py-2 pr-9 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FFAE00] focus:border-transparent transition-all text-sm"
              />
              <i className="bx bx-search absolute right-3 top-1/2 -translate-y-1/2 text-white/60 text-lg"></i>
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full mt-2 right-0 w-96 bg-white rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50 border border-gray-200">
                {isSearching ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CB3B0F] mx-auto"></div>
                    <p className="text-gray-500 mt-3 text-sm">Searching...</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <i className="bx bx-search-alt text-5xl text-gray-300 mb-3"></i>
                    <p className="text-gray-600 font-medium">No results found</p>
                    <p className="text-gray-400 text-sm mt-1">Try different keywords</p>
                  </div>
                ) : (
                  <div className="p-2">
                    <p className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase">
                      {searchResults.length} Result{searchResults.length > 1 ? "s" : ""} Found
                    </p>
                    {searchResults.map((item, index) => (
                      <button
                        key={`${item.type}-${item.id}-${index}`}
                        onClick={() => handleSearchClick(item)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                      >
                        {/* Image */}
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || item.logo || assets.logo_dark}
                            alt={item.name || item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-[#CB3B0F]/10 text-[#CB3B0F] text-xs font-semibold rounded">
                              {item.category}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-800 text-sm truncate group-hover:text-[#CB3B0F] transition-colors">
                            {item.name || item.title}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {item.type === "event" ? item.location : item.description}
                          </p>
                        </div>

                        {/* Arrow */}
                        <i className="bx bx-chevron-right text-xl text-gray-400 group-hover:text-[#CB3B0F] transition-colors"></i>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartModalOpen(true)}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full hover:bg-[#CB3B0F] text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 relative"
            title="Shopping Cart"
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABPElEQVR4AexSwXHCMBA8UgmpJKGSmG8oIpMiyJt0ApUAlZhdz+7NGNtIZuCH5tYrne6055Pe4snjJVBscLaofew4WjkF7HgQL31OCiw0sPEL0HZyVROS1gBtxw+RAlwI3vzUeg59KfggjoEAyj1hcw8scS1zRRzPfBwRQ4HOG/Ev/hEXCcU0CmJrWWS3HPxB541wBXlZUR4fCjmLOxoVuGoTiisbTmsAmu+Q88kWcdOvifMasC1rFZfxo3+gXSZoGiskluwdAb3qmTwpgGAKOMHPjzmzMCmgU9gmCjXlW2hb5fTopoD+YoUMvypM59lNAR5FEaDmDhaMv0ZRgAlozxagbbk24Bj1e59cJYDAb4Bm5pzw2kxfD7UCf8oyaxlem+1PrhLAHWwA2iYzMYFj1I+ttCqBjL5j8nSBCwAAAP//65B3FgAAAAZJREFUAwBU5NgxRNnEygAAAABJRU5ErkJggg==" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#CB3B0F] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                {getTotalItems()}
              </span>
            )}
          </button>
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
            className={`text-lg hover:text-[#FFAE00] transition-colors duration-300 ${
              location.pathname === "/" ? "text-[#FFAE00] font-bold" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-lg hover:text-[#FFAE00] transition-colors duration-300 ${
              location.pathname === "/about" ? "text-[#FFAE00] font-bold" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Our Story
          </Link>
          <Link
            to="/projects"
            className={`text-lg hover:text-[#FFAE00] transition-colors duration-300 ${
              location.pathname === "/projects" ? "text-[#FFAE00] font-bold" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Catalog
          </Link>
          <Link
            to="/events"
            className={`text-lg hover:text-[#FFAE00] transition-colors duration-300 ${
              location.pathname === "/events" ? "text-[#FFAE00] font-bold" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Event
          </Link>
          <Link
            to="/gallery"
            className={`text-lg hover:text-[#FFAE00] transition-colors duration-300 ${
              location.pathname === "/gallery" ? "text-[#FFAE00] font-bold" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            to="/products"
            className={`text-lg hover:text-[#FFAE00] transition-colors duration-300 ${
              location.pathname === "/products" ? "text-[#FFAE00] font-bold" : "text-white"
            }`}
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
