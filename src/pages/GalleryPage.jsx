import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Array semua foto dari public/GaleryHA
  const galleryPhotos = [
    "/GaleryHA/1 (2).jpg",
    "/GaleryHA/2 (2).jpg",
    "/GaleryHA/3 (2).jpg",
    "/GaleryHA/4.jpg",
    "/GaleryHA/5.jpg",
    "/GaleryHA/6.jpg",
    "/GaleryHA/7.jpg",
    "/GaleryHA/8.jpg",
    "/GaleryHA/9.jpg",
    "/GaleryHA/10.jpg",
    "/GaleryHA/11.jpg",
    "/GaleryHA/12.jpg",
    "/GaleryHA/13.jpg",
    "/GaleryHA/14.jpg",
    "/GaleryHA/15.jpg",
    "/GaleryHA/16.jpg",
    "/GaleryHA/17.jpg",
    "/GaleryHA/18.jpg",
    "/GaleryHA/19.jpg",
    "/GaleryHA/20.jpg",
    "/GaleryHA/21.jpg",
    "/GaleryHA/22.jpg",
    "/GaleryHA/23.jpg",
    "/GaleryHA/24.jpg",
    "/GaleryHA/25.jpg",
    "/GaleryHA/26.jpg",
    "/GaleryHA/27.jpg",
    "/GaleryHA/28.jpg",
    "/GaleryHA/29.jpg",
    "/GaleryHA/30.jpg",
    "/GaleryHA/31.jpg",
    "/GaleryHA/32.jpg",
    "/GaleryHA/33.jpg",
    "/GaleryHA/34.jpg",
    "/GaleryHA/35.jpg",
    "/GaleryHA/36.jpg",
    "/GaleryHA/37.jpg",
    "/GaleryHA/38.jpg",
    "/GaleryHA/39.jpg",
    "/GaleryHA/40.jpg",
    "/GaleryHA/41.jpg",
    "/GaleryHA/42.jpg",
    "/GaleryHA/43.jpg",
    "/GaleryHA/44.jpg",
    "/GaleryHA/45.jpg",
    "/GaleryHA/46.jpg",
    "/GaleryHA/47.jpg",
    "/GaleryHA/48.jpg",
    "/GaleryHA/49.jpg",
    "/GaleryHA/50.jpg",
    "/GaleryHA/51.jpg",
    "/GaleryHA/52.jpg",
    "/GaleryHA/53.jpg",
    "/GaleryHA/54.jpg",
    "/GaleryHA/55.jpg",
    "/GaleryHA/56.jpg",
  ];

  // Pattern height - bervariasi untuk efek masonry
  const getHeightClass = (index) => {
    const patterns = [
      "h-80",  // tall
      "h-64",  // medium
      "h-72",  // medium-tall
      "h-96",  // extra tall
      "h-64",  // medium
      "h-80",  // tall
      "h-72",  // medium-tall
      "h-64",  // medium
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="w-full overflow-hidden bg-gray-50">
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
            Hood Agent Gallery
          </motion.h1>
          <motion.p
            className="text-xl text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our latest collection and lookbook
          </motion.p>
        </div>
      </div>

      {/* Pinterest-Style Masonry Grid */}
      <section className="container mx-auto py-20 px-6 md:px-12 lg:px-20">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryPhotos.slice(0, -4).map((photo, index) => (
            <motion.div
              key={index}
              className={`${getHeightClass(index)} break-inside-avoid mb-4`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.02 }}
            >
              <div
                className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
                onClick={() => setSelectedImage(photo)}
              >
                <img
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm font-semibold">Hood Agent Collection</p>
                    <p className="text-xs text-white/80">Click to view</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last 4 Photos - Symmetrical Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {galleryPhotos.slice(-4).map((photo, index) => (
            <motion.div
              key={`last-${index}`}
              className="h-80"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
                onClick={() => setSelectedImage(photo)}
              >
                <img
                  src={photo}
                  alt={`Gallery ${galleryPhotos.length - 4 + index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm font-semibold">Hood Agent Collection</p>
                    <p className="text-xs text-white/80">Click to view</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-[#FFAE00] transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <i className="bx bx-x"></i>
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-7xl max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Gallery fullscreen"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Instructions */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              Click outside or press ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="container mx-auto px-6 md:px-20 lg:px-32 pb-20">
        <motion.div
          className="text-center bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] rounded-2xl p-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Love What You See?
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Check out our products and get your own Hood Agent merchandise today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/products"
              className="inline-block bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Shop Now
            </a>
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

export default GalleryPage;
