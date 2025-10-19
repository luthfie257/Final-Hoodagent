import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import pertamaImg from "../assets/gallery/pertama.jpg";
import keduaImg from "../assets/gallery/kedua.jpg";
import ketigaImg from "../assets/gallery/ketiga.jpg";

const Gallery = () => {
  const galleryImages = [
    { id: 1, src: pertamaImg, alt: "Gallery Image 1" },
    { id: 2, src: keduaImg, alt: "Gallery Image 2" },
    { id: 3, src: ketigaImg, alt: "Gallery Image 3" },
  ];

  return (
    <section
      id="gallery"
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
          Our <span className="text-[#CB3B0F]">Gallery</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our featured gallery and discover amazing moments
        </p>
      </motion.div>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 text-center bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] rounded-2xl p-12 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Want to See More?
        </h3>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Browse our complete gallery and exclusive collections
        </p>
        <Link
          to="/gallery"
          className="inline-block bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View Full Gallery
        </Link>
      </motion.div>
    </section>
  );
};

export default Gallery;
