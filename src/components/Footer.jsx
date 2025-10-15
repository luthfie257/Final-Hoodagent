import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6 md:px-20 lg:px-32">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Hood Agent Logo"
                className="h-16 md:h-20 w-auto object-contain mb-6 cursor-pointer"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Hood Agent is a platform connecting communities with
              opportunities. We believe everyone deserves access to information,
              events, and opportunities that help them grow.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <span className="text-xl">📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <span className="text-xl">🐦</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <span className="text-xl">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <span className="text-xl">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#story"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/#catalog"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Catalog
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/#event"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/#divisi"
                  className="text-gray-400 hover:text-[#FFAE00] transition-colors duration-300"
                >
                  Divisions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Garut, Jawa Barat Indonesia</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📧</span>
                <a
                  href="mailto:hello@hoodagent.com"
                  className="hover:text-[#FFAE00] transition-colors duration-300"
                >
                  hello@hoodagent.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span>
                <a
                  href="tel:+62123456789"
                  className="hover:text-[#FFAE00] transition-colors duration-300"
                >
                  +62 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#CB3B0F] transition-colors duration-300"
              />
              <button className="bg-[#CB3B0F] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFAE00] transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>&copy; 2025 Hood Agent. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-[#FFAE00] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-[#FFAE00] transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-[#FFAE00] transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
