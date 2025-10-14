import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const API_URL = "http://localhost:5000";

const EventsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch events from json-server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        setEventsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      Technology: "bg-blue-100 text-blue-600",
      Networking: "bg-green-100 text-green-600",
      Workshop: "bg-purple-100 text-purple-600",
      Startup: "bg-orange-100 text-orange-600",
    };
    return colors[category] || "bg-gray-100 text-gray-600";
  };

  const categories = ["All", "Technology", "Networking", "Workshop", "Startup"];

  const filteredEvents = eventsData.filter((event) => {
    if (selectedCategory === "All") return true;
    return event.category === selectedCategory;
  });

  return (
    <div className="w-full overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="min-h-[50vh] bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] flex items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto pt-32 pb-16">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Upcoming Events
          </motion.h1>
          <motion.p
            className="text-xl text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Don't miss out on our exciting events and networking opportunities
          </motion.p>
        </div>
      </div>

      {/* Events Section */}
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

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">
                Showing <span className="font-bold text-[#CB3B0F]">{filteredEvents.length}</span> event
                {filteredEvents.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                          event.category
                        )}`}
                      >
                        {event.category}
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-[#CB3B0F] rounded-full text-xs font-semibold uppercase">
                        {event.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#CB3B0F] transition-colors duration-300">
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

                    <button className="w-full bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] transition-colors duration-300 group-hover:shadow-lg">
                      Register Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-2xl mb-4">😕</p>
                <p className="text-gray-600 text-lg mb-2">No events found</p>
                <p className="text-gray-500">
                  Try selecting a different category
                </p>
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
                Want to Host an Event?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Partner with us to organize amazing events for the community.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Contact Us
                </button>
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

      <Footer />
    </div>
  );
};

export default EventsPage;
