import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const API_URL = "http://localhost:5000";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from json-server
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

  const categories = ["All", "Apparel", "Accessories", "Stationery", "Lifestyle"];

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="min-h-[50vh] bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] flex items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto pt-32 pb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Hood Agent Products
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Exclusive merchandise and collectibles for the Hood Agent community
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">
                🔍
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="container mx-auto py-20 px-6 md:px-20 lg:px-32">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#CB3B0F] text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">
                Showing <span className="font-bold text-[#CB3B0F]">{filteredProducts.length}</span> product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
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

                <button className="w-full bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all duration-300 group-hover:shadow-lg flex items-center justify-center gap-2">
                  <span>🛒</span>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-2xl mb-4">😕</p>
            <p className="text-gray-600 text-lg mb-2">No products found</p>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] rounded-2xl p-12 shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Bulk Orders?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us for special pricing on bulk orders and custom merchandise
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Contact Sales Team
            </button>
            <a
              href="/"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#CB3B0F] transition-all duration-300 hover:scale-105"
            >
              Back to Home
            </a>
          </div>
        </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
