import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const AboutPage = () => {
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "50+", label: "Events Organized" },
    { value: "1000+", label: "Community Members" },
    { value: "20+", label: "Team Members" }
  ];

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
            Our Story
          </motion.h1>
          <motion.p
            className="text-xl text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover who we are and what drives us forward
          </motion.p>
        </div>
      </div>

      {/* About Content Section */}
      <section className="container mx-auto py-20 px-6 md:px-20 lg:px-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={assets.brand_img}
              alt="Hood Agent Brand"
              className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            className="order-1 md:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-800">
                Building Communities, Creating Opportunities
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Hood Agent adalah platform yang menghubungkan komunitas dengan
                peluang-peluang terbaik. Kami percaya bahwa setiap orang berhak
                mendapatkan akses ke informasi, event, dan kesempatan yang dapat
                mengembangkan potensi mereka.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan tim yang berdedikasi dan berpengalaman, kami terus berinovasi
                untuk memberikan layanan terbaik bagi komunitas kami.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-orange-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-4xl font-bold text-[#CB3B0F] mb-2">{stat.value}</h4>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            Join Our Community
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of something bigger. Connect with like-minded individuals and grow together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-[#CB3B0F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Get Started
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

export default AboutPage;
