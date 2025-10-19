import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Fetch testimonials from API
  useEffect(() => {
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

    fetchTestimonials();
  }, []);

  // Responsive cards
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(3);
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

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-orange-50 py-16 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our <span className="text-[#CB3B0F]">Community Says</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our valued community members about their experiences
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#CB3B0F] mb-4"></div>
            <p className="text-gray-600 font-medium">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-800 font-semibold text-lg mb-2">
              No testimonials yet
            </p>
            <p className="text-gray-500">
              Check back soon for customer reviews!
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#CB3B0F] hover:scale-110 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <img
                src={assets.left_arrow}
                alt="Previous"
                className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all"
              />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#CB3B0F] hover:scale-110 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <img
                src={assets.right_arrow}
                alt="Next"
                className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all"
              />
            </button>

            {/* Testimonials Carousel */}
            <div className="overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (currentIndex * 100) / cardsToShow
                  }%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col group">
                      {/* Quote Icon */}
                      <div className="text-[#CB3B0F] mb-4">
                        <i className="bx bxs-quote-alt-left text-4xl opacity-20"></i>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bx bxs-star text-lg ${
                              i < testimonial.rating
                                ? "text-[#FFAE00]"
                                : "text-gray-300"
                            }`}
                          ></i>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-600 mb-6 leading-relaxed italic flex-grow line-clamp-4">
                        "{testimonial.text}"
                      </p>

                      {/* Profile */}
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        {testimonial.image && (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#CB3B0F] group-hover:ring-4 transition-all duration-300"
                          />
                        )}
                        <div>
                          <h4 className="font-bold text-gray-800 group-hover:text-[#CB3B0F] transition-colors duration-300">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-[#CB3B0F]"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Map Location Section */}
        <motion.div
          className="mt-16 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Those who already <span className="text-[#CB3B0F]">Trust us</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A growing network of happy customers nationwide
            </p>
          </div>
          <img
            src={assets.map_location}
            alt="Map Location"
            className="w-full h-auto rounded-2xl hover:scale-[1.02] transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
