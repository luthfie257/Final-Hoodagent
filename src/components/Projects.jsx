import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Projects = () => {
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

  React.useEffect(() => {
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
    <section
      id="catalog"
      className="container mx-auto py-20 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our <span className="text-[#CB3B0F]">Catalog</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our featured projects and discover amazing opportunities
        </p>
      </div>

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
          <img src={assets.left_arrow} alt="Previous" className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all" />
        </button>

        <button
          onClick={nextProject}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-[#CB3B0F] hover:scale-110 transition-all duration-300 group"
          aria-label="Next project"
        >
          <img src={assets.right_arrow} alt="Next" className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all" />
        </button>

        {/* Projects Grid */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
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
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <span className="inline-block mr-2">📍</span>
                      {project.location}
                    </p>
                    <p className="text-2xl font-bold text-[#CB3B0F] mb-4">
                      {project.price}
                    </p>
                    <button className="w-full bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] transition-colors duration-300">
                      View Details
                    </button>
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
    </section>
  );
};

export default Projects;
