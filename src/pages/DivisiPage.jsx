import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const API_URL = "http://localhost:5000";

const DivisiPage = () => {
  const [divisiData, setDivisiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch divisi from json-server
  useEffect(() => {
    const fetchDivisi = async () => {
      try {
        const response = await axios.get(`${API_URL}/divisi`);
        setDivisiData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching divisi:", error);
        setLoading(false);
      }
    };

    fetchDivisi();
  }, []);

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
            Our Divisions
          </motion.h1>
          <motion.p
            className="text-xl text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet the talented teams that make Hood Agent possible
          </motion.p>
        </div>
      </div>

      {/* Divisi Section */}
      <section className="container mx-auto py-20 px-6 md:px-20 lg:px-32">
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading divisions...</p>
          </div>
        ) : (
          <>
            {/* Divisi Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {divisiData.map((divisi, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[#CB3B0F]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {divisi.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#CB3B0F] transition-colors duration-300">
                    {divisi.name}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {divisi.description}
                  </p>

                  <div className="flex gap-6 mb-6 text-sm">
                    <div>
                      <p className="text-gray-500 font-medium">Members</p>
                      <p className="text-2xl font-bold text-[#CB3B0F]">
                        {divisi.members}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Projects</p>
                      <p className="text-2xl font-bold text-[#CB3B0F]">
                        {divisi.projects}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-gray-700">Key Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {divisi.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-50 text-[#CB3B0F] rounded-full text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-[#CB3B0F] hover:text-white transition-all duration-300">
                    Join Division
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {divisiData.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600">No divisions available</p>
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
                Want to be part of our amazing team?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Join one of our divisions and work on exciting projects with talented individuals.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Apply Now
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

export default DivisiPage;
