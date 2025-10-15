import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import axios from "axios";

const API_URL = "http://localhost:5000";

const ProjectsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length
    );
  };

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

  return (
    <div className="w-full overflow-hidden">
      <Navbar />

      {/* Hero Section with Background Image */}
      <div className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${assets.gambarOurStory})` }}
        >
          {/* Overlay untuk membuat text lebih terbaca */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16"></div>
      </div>

      {/* Projects Section */}
      <section className="container mx-auto py-20 px-6 md:px-20 lg:px-32">
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        ) : projectsData.length > 0 ? (
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

            {/* Projects Grid */}
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (currentIndex * 100) / cardsToShow
                  }%)`,
                }}
              >
                {projectsData.map((project, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                      <div className="overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-[#CB3B0F]"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">No projects available</p>
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
            Have a Project in Mind?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life. We're here to help
            you succeed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Start a Project
            </button>
            <a
              href="/"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#CB3B0F] transition-all duration-300 hover:scale-105"
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
