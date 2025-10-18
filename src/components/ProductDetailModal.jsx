import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import ImageLightbox from "./ImageLightbox";

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get product images (support both old single image and new images array)
  const productImages = product?.images && product.images.length > 0
    ? product.images
    : product?.image
    ? [product.image]
    : [];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuantity(1); // Reset quantity when modal opens
      setShowAddedNotification(false);
      setSelectedImageIndex(0); // Reset to first image
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const productForCart = {
      ...product,
      rawPrice: product.price,
      price: formatPrice(product.price),
    };

    // Add multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(productForCart);
    }

    setShowAddedNotification(true);
    setTimeout(() => {
      setShowAddedNotification(false);
      onClose();
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Product Details
                  </h2>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <i className="bx bx-x text-3xl text-gray-600"></i>
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Image Gallery */}
                    <div className="relative">
                      {/* Main Image */}
                      <div
                        onClick={() => setIsLightboxOpen(true)}
                        className="relative bg-gray-100 rounded-2xl overflow-hidden cursor-zoom-in group aspect-square mb-4"
                      >
                        <img
                          src={productImages[selectedImageIndex]}
                          alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                            <i className="bx bx-search-alt text-3xl text-gray-800"></i>
                          </div>
                        </div>

                        {/* Image Counter */}
                        {productImages.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                            {selectedImageIndex + 1} / {productImages.length}
                          </div>
                        )}
                      </div>

                      {/* Thumbnails - Only show if more than 1 image */}
                      {productImages.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {productImages.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImageIndex === index
                                  ? "border-[#CB3B0F] scale-105"
                                  : "border-gray-200 hover:border-gray-400"
                              }`}
                            >
                              <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      <p className="text-center text-sm text-gray-500 mt-3">
                        Click image to zoom {productImages.length > 1 && "• Swipe to see more"}
                      </p>
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col">
                      {/* Category Badge */}
                      <span className="inline-block px-3 py-1 bg-orange-50 text-[#CB3B0F] text-sm font-semibold rounded-full w-fit mb-3">
                        {product.category}
                      </span>

                      {/* Product Name */}
                      <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {product.name}
                      </h1>

                      {/* Price */}
                      <div className="mb-6">
                        <p className="text-4xl font-bold text-[#CB3B0F]">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {product.description ||
                            "High quality merchandise from Hood Agent. Perfect for showing your support!"}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-200 my-6"></div>

                      {/* Quantity Selector */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Quantity
                        </h3>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleQuantityChange(-1)}
                            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                            disabled={quantity <= 1}
                          >
                            <i className="bx bx-minus text-xl"></i>
                          </button>
                          <span className="text-2xl font-bold text-gray-800 w-16 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(1)}
                            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            <i className="bx bx-plus text-xl"></i>
                          </button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-2xl font-bold text-[#CB3B0F]">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={handleAddToCart}
                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                          showAddedNotification
                            ? "bg-green-500 text-white"
                            : "bg-[#CB3B0F] text-white hover:bg-[#FFAE00] hover:text-gray-900 shadow-lg hover:shadow-xl"
                        }`}
                        disabled={showAddedNotification}
                      >
                        {showAddedNotification ? (
                          <>
                            <i className="bx bx-check-circle text-2xl"></i>
                            Added to Cart!
                          </>
                        ) : (
                          <>
                            <i className="bx bx-cart-add text-2xl"></i>
                            Add {quantity} to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={productImages}
        initialIndex={selectedImageIndex}
        productName={product.name}
      />
    </>
  );
};

export default ProductDetailModal;
