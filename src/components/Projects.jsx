import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch projects from json-server
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
        setProjectsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    setIsAutoPlaying(true); // Resume auto-play after manual control
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length
    );
    setIsAutoPlaying(true); // Resume auto-play after manual control
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(true); // Resume auto-play after manual control
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || projectsData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, projectsData.length]);

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

  if (loading) {
    return (
      <section className="container mx-auto py-20 px-6 md:px-20 lg:px-32">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="catalog"
      className="container mx-auto py-20 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our <span className="text-[#CB3B0F]">Catalog</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our featured projects and discover amazing opportunities
        </p>
      </motion.div>

      {projectsData.length > 0 ? (
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#CB3B0F] hover:scale-110 transition-all duration-300 group"
            aria-label="Previous project"
          >
            <img
              src={assets.left_arrow}
              alt="Previous"
              className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all"
            />
          </button>

          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#CB3B0F] hover:scale-110 transition-all duration-300 group"
            aria-label="Next project"
          >
            <img
              src={assets.right_arrow}
              alt="Next"
              className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all"
            />
          </button>

          {/* Pure Photo Grid Slider */}
          <div className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
              }}
            >
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Pure Image Card - No Text */}
                  <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Optional: Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#CB3B0F]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] rounded-2xl p-12 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to See More Projects?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Browse our complete catalog of projects and exclusive collections
            </p>
            <Link
              to="/projects"
              className="inline-block bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No projects available</p>
        </div>
      )}
    </section>
  );
};

export default Projects;
