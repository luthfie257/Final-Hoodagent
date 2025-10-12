import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <section
      id="story"
      className="container mx-auto py-20 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our <span className="text-[#CB3B0F]">Story</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover who we are and what drives us forward
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <img
            src={assets.brand_img}
            alt="Hood Agent Brand"
            className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="order-1 md:order-2 space-y-6">
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
            <div className="text-center p-6 bg-orange-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-4xl font-bold text-[#CB3B0F] mb-2">500+</h4>
              <p className="text-gray-600 font-medium">Projects Completed</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-4xl font-bold text-[#CB3B0F] mb-2">50+</h4>
              <p className="text-gray-600 font-medium">Events Organized</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-4xl font-bold text-[#CB3B0F] mb-2">1000+</h4>
              <p className="text-gray-600 font-medium">Community Members</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-4xl font-bold text-[#CB3B0F] mb-2">20+</h4>
              <p className="text-gray-600 font-medium">Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
