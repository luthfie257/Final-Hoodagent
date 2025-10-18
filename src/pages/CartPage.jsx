import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();

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
    <div className="min-h-screen bg-gray-50">
      <div
        className="min-h-[40vh] bg-cover bg-center flex items-center w-full overflow-hidden relative"
        style={{ backgroundImage: "url('/header_img.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#CB3B0F]/70 via-[#FFAE00]/40 to-black/80"></div>
        <Navbar />

        <div className="container mx-auto py-20 px-6 md:px-20 lg:px-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Shopping <span className="text-[#FFAE00]">Cart</span>
            </h1>
            <p className="text-white/90 text-lg">
              Review your items before checkout
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-6 md:px-20 lg:px-32">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <i className="bx bx-cart text-9xl text-gray-300 mb-6"></i>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart!
            </p>
            <Link
              to="/products"
              className="inline-block bg-[#CB3B0F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all duration-300"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Cart Items ({cartItems.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                >
                  Clear All
                </button>
              </div>

              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <i className="bx bx-trash text-2xl"></i>
                        </button>
                      </div>

                      <p className="text-xl font-bold text-[#CB3B0F] mb-3">
                        {item.price}
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <i className="bx bx-minus"></i>
                        </button>
                        <span className="font-semibold text-lg w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <i className="bx bx-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => {
                    const itemPrice = item.rawPrice || 0;
                    const itemTotal = itemPrice * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
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

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#CB3B0F]">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleOrderWhatsApp}
                  className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center gap-2 mb-3 shadow-lg hover:shadow-xl"
                >
                  <i className="bx bxl-whatsapp text-2xl"></i>
                  Order via WhatsApp
                </button>

                <Link
                  to="/products"
                  className="block text-center text-[#CB3B0F] font-semibold hover:text-[#FFAE00] transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
