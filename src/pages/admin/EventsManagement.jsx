import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000";

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    status: "upcoming",
    logo: "",
  });

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle logo upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingLogo(true);

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
          logo: response.data.paths[0]
        });
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo. Please try again.");
    } finally {
      setUploadingLogo(false);
    }
  };

  // Remove logo
  const removeLogo = async () => {
    if (formData.logo && formData.logo.startsWith('/uploads/')) {
      try {
        await axios.delete(`${API_URL}/api/delete-image`, {
          data: { imagePath: formData.logo }
        });
      } catch (error) {
        console.error("Error deleting logo:", error);
      }
    }
    setFormData({ ...formData, logo: "" });
  };

  // Open modal for add/edit
  const openModal = (event = null) => {
    console.log("=== OPENING MODAL ===");
    console.log("Event:", event);

    if (event) {
      setEditingEvent(event);
      const newFormData = {
        ...event,
        logo: event.logo || ""
      };
      console.log("Setting form data:", newFormData);
      setFormData(newFormData);
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        location: "",
        description: "",
        status: "upcoming",
        logo: "",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      location: "",
      description: "",
      status: "upcoming",
      logo: "",
    });
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate logo only for new events
    if (!editingEvent && !formData.logo) {
      alert("Please upload event logo!");
      return;
    }

    console.log("=== SUBMITTING EVENT ===");
    console.log("Editing Event:", editingEvent);
    console.log("Form Data:", formData);

    try {
      if (editingEvent) {
        console.log(`PUT ${API_URL}/events/${editingEvent.id}`);
        const response = await axios.put(`${API_URL}/events/${editingEvent.id}`, formData);
        console.log("Response:", response.data);
      } else {
        console.log(`POST ${API_URL}/events`);
        const response = await axios.post(`${API_URL}/events`, formData);
        console.log("Response:", response.data);
      }
      fetchEvents();
      closeModal();
    } catch (error) {
      console.error("=== ERROR DETAIL ===");
      console.error("Error:", error);
      console.error("Error Response:", error.response);
      console.error("Error Message:", error.message);
      alert(`Failed to save event. Error: ${error.message || 'Unknown error'}`);
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus event ini?")) {
      try {
        await axios.delete(`${API_URL}/events/${id}`);
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#CB3B0F] mb-4"></div>
        <p className="text-gray-600 font-medium">Loading events...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Events Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-[#CB3B0F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all duration-300"
        >
          + Add Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Logo & Header */}
            <div className="flex items-start gap-4 mb-4">
              {/* Event Logo */}
              {event.logo && (
                <div className="flex-shrink-0">
                  <img
                    src={event.logo}
                    alt={event.title}
                    className="w-20 h-20 object-contain rounded-lg border-2 border-gray-200"
                  />
                </div>
              )}

              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <span className="px-3 py-1 bg-orange-100 text-[#CB3B0F] rounded-full text-xs font-semibold uppercase">
                  {event.status}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {event.description}
            </p>

            <div className="mb-6">
              <div className="flex items-center text-gray-600">
                <i className="bx bx-map text-xl text-[#CB3B0F] mr-3"></i>
                <span className="font-medium">{event.location}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal(event)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingEvent ? "Edit Event" : "Add New Event"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Hood Agent Tech Meetup 2025"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Jakarta Convention Center"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  placeholder="Describe the event..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                ></textarea>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Logo {editingEvent ? "(Optional)" : "(Required)"}
                </label>

                {/* Upload Area */}
                {!formData.logo && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#CB3B0F] transition-colors">
                    <input
                      type="file"
                      id="logo-input"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={uploadingLogo}
                    />
                    <label
                      htmlFor="logo-input"
                      className="cursor-pointer"
                    >
                      {uploadingLogo ? (
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
                            Click to upload event logo
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG or WebP (max 5MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                )}

                {/* Logo Preview */}
                {formData.logo && (
                  <div className="relative inline-block">
                    <img
                      src={formData.logo}
                      alt="Event Logo"
                      className="w-32 h-32 object-contain rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <i className="bx bx-x text-lg"></i>
                    </button>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  {!formData.logo && "Upload event logo (required)"}
                  {formData.logo && "Logo uploaded successfully"}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploadingLogo}
                  className="flex-1 bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingEvent ? "Update Event" : "Add Event"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
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

export default EventsManagement;
