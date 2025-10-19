import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductDetailModal from "../components/ProductDetailModal";

const API_URL = "http://localhost:5000";

const EventsPage = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch event products from json-server
  useEffect(() => {
    const fetchEventProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/event-products`);
        setProductsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event products:", error);
        setLoading(false);
      }
    };

    fetchEventProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent modal from opening
    const productForCart = {
      ...product,
      rawPrice: product.price,
      price: formatPrice(product.price),
    };
    addToCart(productForCart);
    setAddedToCart(String(product.id));

    // Reset notification after 2 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="w-full overflow-hidden">
      <Navbar />

      {/* Hero Section with Video Background */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/event-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 pt-32 pb-16 max-w-4xl mx-auto">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Loyalitas Anniversary
            </h1>
            <div className="flex items-center justify-center gap-3 text-white/90 text-xl mb-6">
              <span className="flex items-center gap-2">
                <i className="bx bx-calendar text-[#FFAE00]"></i>
                5th Anniversary - 2025
              </span>
            </div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Exclusive Limited Edition Merchandise
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          ></motion.div>
        </div>
      </div>

      {/* Products Section */}
      <section
        id="products"
        className="container mx-auto py-20 px-6 md:px-20 lg:px-32"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Anniversary <span className="text-[#CB3B0F]">Collection</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Celebrate 5 years of Loyalitas with our exclusive merchandise
            collection
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">
                Showing{" "}
                <span className="font-bold text-[#CB3B0F]">
                  {productsData.length}
                </span>{" "}
                exclusive product
                {productsData.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {productsData.map((product, index) => {
                // Get main image (support both old 'image' and new 'images' format)
                const mainImage =
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : product.image;

                return (
                  <motion.div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer flex flex-col h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative overflow-hidden bg-gray-100 h-64">
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Multiple Images Badge */}
                      {product.images && product.images.length > 1 && (
                        <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <i className="bx bx-image"></i>
                          {product.images.length}
                        </span>
                      )}
                      {/* Limited Edition Badge */}
                      <span className="absolute top-3 right-3 bg-[#FFAE00] text-[#CB3B0F] text-xs font-bold px-3 py-1 rounded-full">
                        LIMITED
                      </span>
                      {/* View Details Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3">
                          <i className="bx bx-show text-2xl text-[#CB3B0F]"></i>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#CB3B0F] transition-colors duration-300 line-clamp-2 flex-grow pr-2">
                          {product.name}
                        </h3>
                        <span className="px-2 py-1 bg-orange-50 text-[#CB3B0F] text-xs font-semibold rounded shrink-0">
                          {product.category}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <p className="text-2xl font-bold text-[#CB3B0F]">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${
                          addedToCart === String(product.id)
                            ? "bg-green-500 text-white"
                            : "bg-[#CB3B0F] text-white hover:bg-[#FFAE00] hover:text-gray-900"
                        }`}
                      >
                        {addedToCart === String(product.id) ? (
                          <>
                            <i className="bx bx-check-circle text-xl"></i>
                            Added to Cart!
                          </>
                        ) : (
                          <>
                            <i className="bx bx-cart-add text-xl"></i>
                            Quick Add
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Empty State */}
            {productsData.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-2xl mb-4">😕</p>
                <p className="text-gray-600 text-lg mb-2">
                  No event products available yet
                </p>
                <p className="text-gray-500">Check back soon for updates!</p>
              </div>
            )}

            {/* CTA Section */}
            <motion.div
              className="mt-16 text-center bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] rounded-2xl p-12 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Celebrate with Us! 🎉
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Limited Edition Anniversary Merchandise - Get yours before
                they're gone!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/products"
                  className="bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  View All Products
                </a>
                <a
                  href="/"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#CB3B0F] transition-all duration-300 hover:scale-105"
                >
                  Back to Home
                </a>
              </div>
            </motion.div>
          </>
        )}
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
      />

      <Footer />
    </div>
  );
};

export default EventsPage;
