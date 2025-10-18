import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import axios from "axios";

const API_URL = "http://localhost:5000";

const CartModal = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();

  const [productsData, setProductsData] = useState([]);

  // Fetch products data for images
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  // Get product image by ID (support both old single image and new images array)
  const getProductImage = (productId) => {
    const product = productsData.find(p => String(p.id) === String(productId));
    if (!product) return '/placeholder-image.png';

    // Support multiple images format (use first image)
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }

    // Fallback to old single image format
    return product.image || '/placeholder-image.png';
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  const handleOrderWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Generate WhatsApp message
    let message = "Halo Admin Hood Agent, saya ingin order:\n\n";
    message += "📦 *Detail Pesanan:*\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Qty: ${item.quantity} - ${
        item.price
      }\n`;
    });

    const total = getTotalPrice();
    const formattedTotal = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(total);

    message += `\n💰 *Total: ${formattedTotal}*\n\n`;
    message += "👤 *Data Pembeli:*\n";
    message += "Nama: [isi nama]\n";
    message += "Alamat: [isi alamat]\n";
    message += "No. HP: [isi nomor]\n\n";
    message += "Catatan: [jika ada]";

    const whatsappUrl = `http://wa.me/message/IONCXXUB3M4DF1?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full md:w-[500px] bg-white shadow-2xl z-[101] overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <i className="bx bx-cart text-3xl text-[#CB3B0F]"></i>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-gray-500">
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <i className="bx bx-x text-3xl text-gray-600"></i>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <i className="bx bx-cart text-9xl text-gray-300 mb-6"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Start shopping to add items!
                  </p>
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="inline-block bg-[#CB3B0F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all duration-300"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <>
                  {/* Clear All Button */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-3">
                          <img
                            src={getProductImage(item.id)}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-gray-800">
                                  {item.name}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {item.category}
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <i className="bx bx-trash text-xl"></i>
                              </button>
                            </div>

                            <p className="text-lg font-bold text-[#CB3B0F] mb-2">
                              {item.price}
                            </p>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="w-7 h-7 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors border border-gray-300"
                              >
                                <i className="bx bx-minus text-sm"></i>
                              </button>
                              <span className="font-semibold w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-7 h-7 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors border border-gray-300"
                              >
                                <i className="bx bx-plus text-sm"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-[#CB3B0F] to-[#FFAE00] rounded-xl p-6 text-white mb-4">
                    <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                    <div className="space-y-2 mb-4">
                      {cartItems.map((item) => {
                        const itemPrice = item.rawPrice || 0;
                        const itemTotal = itemPrice * item.quantity;

                        return (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm text-white/90"
                          >
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-semibold">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              }).format(itemTotal)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-white/30 pt-4 flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(getTotalPrice())}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={handleOrderWhatsApp}
                    className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center gap-2 mb-3 shadow-lg hover:shadow-xl"
                  >
                    <i className="bx bxl-whatsapp text-2xl"></i>
                    Order via WhatsApp
                  </button>

                  <Link
                    to="/products"
                    onClick={onClose}
                    className="block text-center text-[#CB3B0F] font-semibold hover:text-[#FFAE00] transition-colors py-2"
                  >
                    Continue Shopping
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
