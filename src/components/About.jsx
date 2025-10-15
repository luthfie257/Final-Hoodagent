import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const About = () => {
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "50+", label: "Events Organized" },
    { value: "1000+", label: "Community Members" },
    { value: "20+", label: "Team Members" },
  ];

  return (
    <section
      id="story"
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
          Our <span className="text-[#CB3B0F]">Story</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover who we are and what drives us forward
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
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
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gray-800">
              Building Communities, Creating Opportunities
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hood Agent Official, merupakan brand lokal yang menyediakan desain
              tentang Kepolisian Republik Indonesia. Berdiri dari tahun 2015
              dengan nama Garage D'blooh, kemudian pada bulan Mei 2023 resmi
              rebranding menjadi Hood Agent yang terbagi 3 segmen, yaitu :
              <br />
              -Hood Agent id Menyediakan pakaian tentang kriminal yang dapat
              digunakan oleh sipil.
              <br />- Hood Agent Bhapri Menyediakan pakaian untuk letting
              Kepolisian sehingga kami sebut Bhapri (Bhayangkara Pride).
              <br />- Hood Agent Industries Melayani pembuatan pakaian instansi
              dengan desain yang diinginkan
            </p>
            <p className="text-gray-600 leading-relaxed">
              Dengan tim yang berdedikasi dan berpengalaman, kami terus
              berinovasi untuk memberikan layanan terbaik bagi komunitas kami.
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
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-4xl font-bold text-[#CB3B0F] mb-2">
                  {stat.value}
                </h4>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              to="/about"
              className="inline-block bg-[#CB3B0F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Lihat Selengkapnya →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
