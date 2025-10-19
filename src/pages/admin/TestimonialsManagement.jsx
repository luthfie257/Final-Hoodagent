import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000";

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    text: "",
    rating: 5,
    image: "",
  });

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API_URL}/testimonials`);
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append('images', file);

      const response = await axios.post(`${API_URL}/api/upload-images`, formDataToUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success && response.data.paths.length > 0) {
        setFormData({
          ...formData,
          image: response.data.paths[0]
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image
  const removeImage = async () => {
    if (formData.image && formData.image.startsWith('/uploads/')) {
      try {
        await axios.delete(`${API_URL}/api/delete-image`, {
          data: { imagePath: formData.image }
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    setFormData({ ...formData, image: "" });
  };

  // Open modal for add/edit
  const openModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        ...testimonial,
        image: testimonial.image || ""
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: "",
        title: "",
        text: "",
        rating: 5,
        image: "",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({
      name: "",
      title: "",
      text: "",
      rating: 5,
      image: "",
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image only for new testimonials
    if (!editingTestimonial && !formData.image) {
      alert("Please upload customer photo!");
      return;
    }

    try {
      if (editingTestimonial) {
        await axios.put(`${API_URL}/testimonials/${editingTestimonial.id}`, formData);
      } else {
        await axios.post(`${API_URL}/testimonials`, formData);
      }
      fetchTestimonials();
      closeModal();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Failed to save testimonial. Please try again.");
    }
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus testimonial ini?")) {
      try {
        await axios.delete(`${API_URL}/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#CB3B0F] mb-4"></div>
        <p className="text-gray-600 font-medium">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>💬</span>
            Testimonials Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage customer testimonials and reviews
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <i className="bx bx-plus-circle text-xl"></i>
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
          >
            {/* Header with Image & Rating */}
            <div className="flex items-start gap-4 mb-4">
              {testimonial.image && (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#CB3B0F]"
                />
              )}
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{testimonial.title}</p>
                {/* Rating Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bx bxs-star text-lg ${
                        i < testimonial.rating ? 'text-[#FFAE00]' : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-600 text-sm italic mb-4 line-clamp-3">
              "{testimonial.text}"
            </p>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => openModal(testimonial)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <i className="bx bx-edit-alt"></i>
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <i className="bx bx-trash"></i>
                <span>Delete</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {testimonials.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-800 font-semibold text-lg mb-2">
            No testimonials yet
          </p>
          <p className="text-gray-500 mb-6">
            Add your first customer testimonial to build trust
          </p>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            <i className="bx bx-plus-circle text-xl"></i>
            <span>Add Testimonial</span>
          </button>
        </div>
      )}

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
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00]">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <i className="bx bx-message-square-dots text-3xl"></i>
                  {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title / Position
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., CEO at Company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none"
                      >
                        <i
                          className={`bx bxs-star text-3xl ${
                            star <= formData.rating ? 'text-[#FFAE00]' : 'text-gray-300'
                          } hover:scale-110 transition-transform`}
                        ></i>
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600 font-semibold self-center">
                      {formData.rating}/5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Testimonial Text
                  </label>
                  <textarea
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows="4"
                    placeholder="Share your experience..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Customer Photo {editingTestimonial ? "(Optional)" : "(Required)"}
                  </label>

                  {/* Upload Area */}
                  {!formData.image && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#CB3B0F] transition-colors">
                      <input
                        type="file"
                        id="image-input"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <label htmlFor="image-input" className="cursor-pointer">
                        {uploadingImage ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mb-3"></div>
                            <p className="text-sm text-gray-600">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <div className="text-gray-400 mb-2">
                              <i className="bx bx-image-add text-6xl"></i>
                            </div>
                            <p className="text-sm text-gray-600 font-medium mb-1">
                              Click to upload photo
                            </p>
                            <p className="text-xs text-gray-500">
                              JPG, PNG or WebP (max 5MB)
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  )}

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="relative inline-block">
                      <img
                        src={formData.image}
                        alt="Customer"
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-[#CB3B0F]"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <i className="bx bx-x text-xl"></i>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="flex-1 bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <i className={`bx ${editingTestimonial ? 'bx-save' : 'bx-plus-circle'} text-xl`}></i>
                    <span>{editingTestimonial ? "Update Testimonial" : "Add Testimonial"}</span>
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

export default TestimonialsManagement;
