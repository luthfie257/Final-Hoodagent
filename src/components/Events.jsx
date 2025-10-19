import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Events = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
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

  const nextEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventsData.length);
  };

  const prevEvent = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + eventsData.length) % eventsData.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Responsive cards
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(4);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const getStatusBadge = (status) => {
    if (status === "upcoming" || status === "ongoing") {
      return (
        <div className="flex items-center gap-1.5 text-green-600 font-semibold text-xs">
          <span className="text-lg">🔥</span>
          <span>Coming Soon</span>
        </div>
      );
    } else if (status === "completed" || status === "ended") {
      return (
        <div className="flex items-center gap-1.5 text-gray-400 font-semibold text-xs">
          <span className="text-lg">⏸️</span>
          <span>Ended</span>
        </div>
      );
    }
    return null;
  };

  return (
    <section
      id="event"
      className="bg-gray-50 py-12 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Upcoming <span className="text-[#CB3B0F]">Events</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our exciting events and networking opportunities
          </p>
        </motion.div>

        <div className="relative">
          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#CB3B0F] mb-4"></div>
              <p className="text-gray-600 font-medium">Loading events...</p>
            </div>
          ) : eventsData.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-800 font-semibold text-lg mb-2">
                No events available yet
              </p>
              <p className="text-gray-500">
                Check back soon for upcoming events and opportunities!
              </p>
            </div>
          ) : (
            <>
          {/* Navigation Buttons */}
          <button
            onClick={prevEvent}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#CB3B0F] hover:scale-110 transition-all duration-300 group"
            aria-label="Previous event"
          >
            <img
              src={assets.left_arrow}
              alt="Previous"
              className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all"
            />
          </button>

          <button
            onClick={nextEvent}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#CB3B0F] hover:scale-110 transition-all duration-300 group"
            aria-label="Next event"
          >
            <img
              src={assets.right_arrow}
              alt="Next"
              className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all"
            />
          </button>

          {/* Events Slider */}
          <div className="overflow-hidden">
            <div
              className="flex gap-3 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / cardsToShow
                }%)`,
              }}
            >
              {eventsData.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {/* Event Card */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col group cursor-pointer">
                    {/* Logo Section - Compact Square (1:1) */}
                    <div className="relative overflow-hidden bg-gray-100 h-40 flex items-center justify-center">
                      <img
                        src={event.logo || assets.logo_dark}
                        alt={event.title}
                        className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Title - Fixed 2 lines */}
                      <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#CB3B0F] transition-colors duration-300">
                        {event.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-start gap-2 text-gray-600 mb-3">
                        <i className="bx bx-map text-lg text-[#CB3B0F] shrink-0"></i>
                        <span className="text-xs font-medium line-clamp-2">{event.location}</span>
                      </div>

                      {/* Status Badge - Always at bottom */}
                      <div className="mt-auto">
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {eventsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#CB3B0F]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/events"
              className="inline-block bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              View All Events →
            </Link>
          </motion.div>
          </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
