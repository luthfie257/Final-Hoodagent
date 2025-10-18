import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductDetailModal from "./ProductDetailModal";

const API_URL = "http://localhost:5000";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        // Get only 4 latest products for home page preview
        const latestProducts = response.data.slice(-4).reverse(); // Last 4, newest first
        setProductsData(latestProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
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
      rawPrice: product.price, // Save original price number
      price: formatPrice(product.price), // Formatted string for display
    };
    addToCart(productForCart);
    setAddedToCart(String(product.id)); // Convert to string for consistent comparison

    // Reset notification after 2 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  if (loading) {
    return (
      <section className="container mx-auto py-20 px-6 md:px-20 lg:px-32">
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="container mx-auto py-20 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our <span className="text-[#CB3B0F]">Products</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Check out our latest exclusive merchandise
        </p>
      </motion.div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {productsData.map((product, index) => {
          // Get main image (support both old 'image' and new 'images' format)
          const mainImage = product.images && product.images.length > 0
            ? product.images[0]
            : product.image;

          return (
            <motion.div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
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
                {/* View Details Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3">
                    <i className="bx bx-show text-2xl text-[#CB3B0F]"></i>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#CB3B0F] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <span className="px-2 py-1 bg-orange-50 text-[#CB3B0F] text-xs font-semibold rounded">
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
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
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

      {/* Empty State - only if no products at all */}
      {!loading && productsData.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 text-lg">
            No products available yet
          </p>
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.div
        className="mt-16 text-center bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] rounded-2xl p-12 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Want to See More Products?
        </h3>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Browse our complete collection of merchandise and exclusive items
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View All Products
        </Link>
      </motion.div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
};

export default Products;
