import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Divisi = () => {
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
    <section
      id="divisi"
      className="container mx-auto py-20 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our <span className="text-[#CB3B0F]">Divisions</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet the talented teams that make Hood Agent possible
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading divisions...</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {divisiData.map((divisi, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border-2 border-transparent hover:border-[#CB3B0F]"
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
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6">
          Want to be part of our amazing team?
        </p>
        <button className="bg-[#CB3B0F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#FFAE00] transition-all duration-300 hover:scale-105 shadow-lg">
          Apply Now
        </button>
      </div>
        </>
      )}
    </section>
  );
};

export default Divisi;
