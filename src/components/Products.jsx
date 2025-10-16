import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProductsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    "Apparel",
    "Accessories",
    "T-shirts",
    "Polo Shirts",
    "jersey",
    "Hoodies",
    "Work Shirts",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((product) => product.category === selectedCategory);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = (product) => {
    const phoneNumber = "6281321899509"; // WhatsApp number without + and spaces
    const message = `Halo, saya tertarik dengan produk:\n\n*${
      product.name
    }*\nHarga: ${formatPrice(product.price)}\nKategori: ${
      product.category
    }\n\nApakah produk ini masih tersedia?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
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
          Browse our exclusive collection of Hood Agent merchandise
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#CB3B0F] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="relative overflow-hidden bg-gray-100 h-64">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.stock < 20 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Limited Stock
                </span>
              )}
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
                <p className="text-sm text-gray-500">
                  Stock: <span className="font-semibold">{product.stock}</span>
                </p>
              </div>

              <button
                onClick={() => handleWhatsAppOrder(product)}
                className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition-all duration-300 group-hover:shadow-lg flex items-center justify-center gap-2"
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB/UlEQVR4AeSU0XXCMAxF0y5SmKRlksIkwCTQSaCTAJPQe0VsbCcpHz18NceKFflJT5LtvHZPfv4BwfV6nSEb5IA4TrzUd8zLRx3+tUUE2BDghKyRGbJHjojD4JKI8XtURgkIbNYp8Pbl9syZVr0siDZHtsgavFVJyGc9RgmA7BDHgoCjGWI/I65JJFYiq1TPMiAgG50+QJjtke+BE2t5QHLmw4rE2Uo+76Mi6IMJ2uOYem35tuvu1WhgJVlhXhLD5FBvoyLAlBbtbQc49dU9SWvARkdKqMK1BO+69hmpmpnzQ+l9JIkYyaElkN2jmNYzAQF0Tvap+ZsF94LpNloCrRlAUAnsre1KJ0vMlLyxkP3Ru5bAgNqzQGJF7okbGCTsjXvibfbEZSxK24EBQZRoAMDlKEk8UYrBPPtB2oPN/tLrMbUVGEiQRzUAvqiivFRllepfYkgqVVPtVUVgIMA6mR1qPVxHvFTeXm+5vw8vo3iTKu9POFcEYek6K6iy6JoHEisKDJmLt03a4kCU8IoAcLpYF3R/0UkMUvp5qtxo2+J+uDYIrrEiwJAuieUqn9icPTFK/J4hP2A3sGu2JVqFbTBaAjO1dI9l9BgP+x0biW6vJXWfxBh4NHOwMSoCemtQZYMuUcdsb/3WbkDFP602iSLQ1KsimAL9xf50gh8AAAD//wTlNwUAAAAGSURBVAMADOfhMUai0GQAAAAASUVORK5CYII=" />
                Pesan via WhatsApp
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 text-lg">
            No products found in this category
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
    </section>
  );
};

export default Products;
