import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000";

const EventProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    images: [],
    description: "",
  });

  const categories = [
    "Hoodies",
    "T-shirts",
    "Polo Shirts",
    "Jackets",
    "Accessories",
    "Jersey",
    "Work Shirts",
  ];

  // Fetch event products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/event-products`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching event products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle multiple images upload
  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Check total images count (max 5)
    if (formData.images.length + files.length > 5) {
      alert("Maximum 5 images allowed per product!");
      return;
    }

    setUploadingImages(true);

    try {
      const formDataToUpload = new FormData();
      files.forEach(file => {
        formDataToUpload.append('images', file);
      });

      const response = await axios.post(`${API_URL}/api/upload-images`, formDataToUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setFormData({
          ...formData,
          images: [...formData.images, ...response.data.paths]
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
    }
  };

  // Remove image from array
  const removeImage = async (index, imagePath) => {
    // Delete from server if it's a server path
    if (imagePath && imagePath.startsWith('/uploads/')) {
      try {
        await axios.delete(`${API_URL}/api/delete-image`, {
          data: { imagePath }
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    // Remove from form data
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Reorder images (drag and drop)
  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...formData.images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setFormData({ ...formData, images: newImages });
  };

  // Open modal for add/edit
  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        images: product.images || (product.image ? [product.image] : [])
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        images: [],
        description: "",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      images: [],
      description: "",
    });
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate at least one image
    if (!formData.images || formData.images.length === 0) {
      alert("Please upload at least one product image!");
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      if (editingProduct) {
        await axios.put(
          `${API_URL}/event-products/${editingProduct.id}`,
          productData
        );
      } else {
        await axios.post(`${API_URL}/event-products`, productData);
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Error saving event product:", error);
      alert("Failed to save event product. Please try again.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus event product ini?")) {
      try {
        await axios.delete(`${API_URL}/event-products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting event product:", error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FFAE00] mb-4"></div>
        <p className="text-gray-600 font-medium">Loading event products...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>🎉</span>
            Event Products Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage limited edition products for Loyalitas Anniversary Event
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-[#FFAE00] to-[#CB3B0F] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <i className="bx bx-party text-xl"></i>
          <span>Add Event Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#FFAE00] to-[#CB3B0F]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                // Get first image
                const mainImage = product.images && product.images.length > 0
                  ? product.images[0]
                  : product.image;

                return (
                <tr
                  key={product.id}
                  className={`transition-colors duration-150 hover:bg-orange-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4">
                    {mainImage ? (
                      <div className="relative">
                        <img
                          src={mainImage}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        {/* LIMITED Badge */}
                        <span className="absolute -top-2 -left-2 bg-[#FFAE00] text-[#CB3B0F] text-xs font-bold px-2 py-1 rounded">
                          LIMITED
                        </span>
                        {product.images && product.images.length > 1 && (
                          <span className="absolute -top-2 -right-2 bg-[#CB3B0F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {product.images.length}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <i className="bx bx-image text-2xl text-gray-400"></i>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      {product.name}
                      <span className="text-lg">🎉</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-orange-100 text-[#CB3B0F] rounded-full text-sm font-semibold">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(product)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 hover:shadow-md"
                      >
                        <i className="bx bx-edit-alt"></i>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center gap-2 hover:shadow-md"
                      >
                        <i className="bx bx-trash"></i>
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16 px-6">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-gray-800 font-semibold text-lg mb-2">
              No event products yet
            </p>
            <p className="text-gray-500 mb-6">
              Create your first limited edition product for the anniversary event
            </p>
            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-[#FFAE00] to-[#CB3B0F] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              <i className="bx bx-party text-xl"></i>
              <span>Add Event Product</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#FFAE00] to-[#CB3B0F]">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <i className="bx bx-party text-3xl"></i>
                  {editingProduct ? "Edit Event Product" : "Add New Event Product"}
                </h2>
                <p className="text-white/90 text-sm mt-1">
                  Limited Edition - Loyalitas Anniversary
                </p>
              </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Anniversary Hoodie 2025"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (IDR)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="350000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  placeholder="Describe this limited edition product..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Images ({formData.images.length}/5)
                </label>

                {/* Upload Area */}
                {formData.images.length < 5 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#CB3B0F] transition-colors mb-4">
                    <input
                      type="file"
                      id="images-input"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImagesUpload}
                      className="hidden"
                      disabled={uploadingImages}
                    />
                    <label
                      htmlFor="images-input"
                      className="cursor-pointer"
                    >
                      {uploadingImages ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mb-3"></div>
                          <p className="text-sm text-gray-600">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <div className="text-gray-400 mb-2">
                            <i className="bx bx-cloud-upload text-6xl"></i>
                          </div>
                          <p className="text-sm text-gray-600 font-medium mb-1">
                            Click to upload images
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG or WebP (max 5MB each, max 5 images)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                )}

                {/* Images Preview Grid */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-5 gap-3">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                          moveImage(fromIndex, index);
                        }}
                      >
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border-2 border-gray-200 group-hover:border-[#CB3B0F] transition-all cursor-move"
                        />

                        {/* Main Image Badge */}
                        {index === 0 && (
                          <span className="absolute top-1 left-1 bg-[#CB3B0F] text-white text-xs px-2 py-1 rounded">
                            Main
                          </span>
                        )}

                        {/* Image Number */}
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </span>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeImage(index, image)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <i className="bx bx-x text-lg"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  {formData.images.length === 0 && "Upload at least 1 image (required)"}
                  {formData.images.length > 0 && "First image will be the main product image. Drag to reorder."}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploadingImages}
                  className="flex-1 bg-gradient-to-r from-[#FFAE00] to-[#CB3B0F] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <i className={`bx ${editingProduct ? 'bx-save' : 'bx-party'} text-xl`}></i>
                  <span>{editingProduct ? "Update Product" : "Add Product"}</span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <i className="bx bx-x text-xl"></i>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventProductsManagement;
