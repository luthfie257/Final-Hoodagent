import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section
      id="event"
      className="bg-gray-50 py-20 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Upcoming <span className="text-[#CB3B0F]">Events</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our exciting events and networking opportunities
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8">
          {eventsData.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#CB3B0F] transition-all duration-300 hover:scale-105 shadow-md">
            View All Events
          </button>
        </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Events;
