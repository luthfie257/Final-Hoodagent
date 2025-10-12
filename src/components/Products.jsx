import React, { useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const productsData = [
    {
      id: 1,
      name: "Hood Agent T-Shirt",
      category: "Apparel",
      price: 150000,
      image: "/api/placeholder/400/400",
      description: "Premium cotton t-shirt with Hood Agent logo",
      stock: 50,
    },
    {
      id: 2,
      name: "Hoodie Premium",
      category: "Apparel",
      price: 350000,
      image: "/api/placeholder/400/400",
      description: "Comfortable hoodie for all seasons",
      stock: 30,
    },
    {
      id: 3,
      name: "Tote Bag Canvas",
      category: "Accessories",
      price: 125000,
      image: "/api/placeholder/400/400",
      description: "Eco-friendly canvas tote bag",
      stock: 100,
    },
    {
      id: 4,
      name: "Sticker Pack",
      category: "Accessories",
      price: 25000,
      image: "/api/placeholder/400/400",
      description: "Set of 10 premium vinyl stickers",
      stock: 200,
    },
    {
      id: 5,
      name: "Cap Snapback",
      category: "Accessories",
      price: 175000,
      image: "/api/placeholder/400/400",
      description: "Adjustable snapback cap with embroidered logo",
      stock: 45,
    },
    {
      id: 6,
      name: "Notebook A5",
      category: "Stationery",
      price: 75000,
      image: "/api/placeholder/400/400",
      description: "Premium quality notebook with Hood Agent branding",
      stock: 80,
    },
    {
      id: 7,
      name: "Water Bottle",
      category: "Lifestyle",
      price: 95000,
      image: "/api/placeholder/400/400",
      description: "Stainless steel insulated water bottle",
      stock: 60,
    },
    {
      id: 8,
      name: "Enamel Pin Set",
      category: "Accessories",
      price: 50000,
      image: "/api/placeholder/400/400",
      description: "Set of 3 collectible enamel pins",
      stock: 150,
    },
  ];

  const categories = ["All", "Apparel", "Accessories", "Stationery", "Lifestyle"];

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

  return (
    <section
      id="products"
      className="container mx-auto py-20 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our <span className="text-[#CB3B0F]">Products</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our exclusive collection of Hood Agent merchandise
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#CB3B0F] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
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
          <p className="text-gray-500 text-lg">
            No products found in this category
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] rounded-2xl p-12 shadow-xl">
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
      </div>
    </section>
  );
};

export default Products;
