import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
    status: "upcoming",
  });

  const categories = ["Technology", "Networking", "Workshop", "Startup"];

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

  // Open modal for add/edit
  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData(event);
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        category: "",
        description: "",
        status: "upcoming",
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
      date: "",
      time: "",
      location: "",
      category: "",
      description: "",
      status: "upcoming",
    });
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEvent) {
        await axios.put(`${API_URL}/events/${editingEvent.id}`, formData);
      } else {
        await axios.post(`${API_URL}/events`, formData);
      }
      fetchEvents();
      closeModal();
    } catch (error) {
      console.error("Error saving event:", error);
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

  const getCategoryColor = (category) => {
    const colors = {
      Technology: "bg-blue-100 text-blue-600",
      Networking: "bg-green-100 text-green-600",
      Workshop: "bg-purple-100 text-purple-600",
      Startup: "bg-orange-100 text-orange-600",
    };
    return colors[category] || "bg-gray-100 text-gray-600";
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
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
            <div className="flex items-start justify-between mb-4">
              <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getCategoryColor(event.category)}`}>
                {event.category}
              </span>
              <span className="px-3 py-1 bg-orange-100 text-[#CB3B0F] rounded-full text-xs font-semibold uppercase">
                {event.status}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {event.title}
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {event.description}
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600">
                <span className="mr-3 text-xl">📅</span>
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-3 text-xl">🕐</span>
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-3 text-xl">📍</span>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="15 March 2025"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="09:00 - 17:00 WIB"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                  />
                </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManagement;
