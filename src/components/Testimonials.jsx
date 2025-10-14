import React from "react";
import { motion } from "framer-motion";
import { testimonialsData, assets } from "../assets/assets";

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-20 lg:px-32 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our <span className="text-[#CB3B0F]">Community Says</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our valued community members about their experiences with Hood Agent
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Stars Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <img
                    key={i}
                    src={assets.star_icon}
                    alt="star"
                    className="w-5 h-5"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.alt}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#CB3B0F] group-hover:ring-4 transition-all duration-300"
                />
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-[#CB3B0F] transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Location Section */}
        <motion.div
          className="mt-16 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Temukan Lokasi Kami
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kunjungi kantor kami atau hubungi tim kami untuk informasi lebih lanjut
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
