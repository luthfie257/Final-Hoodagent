import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const AboutPage = () => {
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
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16">
          {/* <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover who we are and what drives us forward
          </motion.p> */}
        </div>
      </div>

      {/* About Content Section */}
      <section className="container mx-auto py-20 px-6 md:px-20 lg:px-32">
        {/* Logo Philosophy Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mt-16 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Hood Agent Logo Philosophy
        </motion.h1>

        {/* 1. Huruf H */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={assets.gambarHA}
              alt="Huruf H dan A"
              className="w-full max-w-[300px] h-auto rounded-lg border border-gray-300 shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              1. Huruf H (Hood)
            </h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              Huruf H melambangkan kekuatan, kebersamaan, dan fondasi komunitas.
              Bentuknya yang kokoh menggambarkan keteguhan prinsip serta
              semangat solidaritas yang selalu dijaga oleh Hood Agent sejak awal
              berdiri. Elemen ini merepresentasikan "Hood" — simbol
              persaudaraan, komunitas, dan lingkungan yang saling mendukung,
              baik bagi pelanggan sipil maupun anggota kepolisian.
            </p>

            <h4 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
              2. Huruf A (Agent)
            </h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              Huruf A menjadi simbol agen perubahan, mencerminkan semangat
              aktif, progresif, dan kreatif dalam menghadirkan desain yang
              otentik. Bentuknya yang mengarah ke atas menggambarkan ambisi dan
              visi jangka panjang, sejalan dengan semangat Hood Agent untuk
              terus berkembang sebagai brand lokal yang inovatif. Huruf A juga
              mempertegas identitas "Agent" sebagai pelaku yang berperan nyata
              dalam dunia desain dan apparel bertema kepolisian.
            </p>
          </motion.div>
        </div>

        <hr className="border-gray-300 my-12" />

        {/* 2. Simbol Bintara Tinggi */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="space-y-6 order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              3. Simbol Bintara Tinggi
            </h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              Simbol Bintara Tinggi disematkan sebagai bentuk penghormatan
              terhadap struktur dan kehormatan dalam tubuh Kepolisian Republik
              Indonesia. Elemen ini melambangkan kepemimpinan, disiplin, dan
              tanggung jawab, yang menjadi nilai penting dalam setiap lini
              produk Hood Agent. Simbol ini menjadi pengingat bahwa setiap karya
              yang dihasilkan membawa nilai loyalitas dan semangat Bhayangkara.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={assets.gambarBintara}
              alt="Simbol Bintara"
              className="w-full max-w-[500px] h-auto rounded-lg border border-gray-300 shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        <hr className="border-gray-300 my-12" />

        {/* 3. Kubah Masjid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={assets.gambarKubah}
              alt="Kubah Masjid"
              className="w-full max-w-[300px] h-auto rounded-lg border border-gray-300 shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              4. Kubah Masjid
            </h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              Bentuk kubah masjid yang menyatu di bagian atas logo mengandung
              makna spiritual yang mendalam — selalu bertakwa kepada Tuhan Yang
              Maha Esa. Kubah ini menjadi representasi bahwa setiap langkah dan
              karya Hood Agent tidak lepas dari nilai keikhlasan, kejujuran, dan
              rasa syukur. Filosofi ini menjadi dasar moral dalam menjalankan
              bisnis yang beretika dan penuh makna.
            </p>
          </motion.div>
        </div>

        <hr className="border-gray-300 my-12" />

        {/* 4. Gaya Romawi/Klasik */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="space-y-6 order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              5. Gaya Romawi/Klasik
            </h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              Gaya Romawi klasik yang digunakan menambahkan nuansa elegan,
              abadi, dan berwibawa. Elemen serif pada huruf memberikan karakter
              kuat, menggambarkan keberlanjutan nilai dan komitmen Hood Agent
              dalam menjaga kualitas serta identitas brand sejak 2015. Nuansa
              klasik ini juga menandakan bahwa meski terus berkembang, Hood
              Agent tetap berpegang pada akar nilai dan prinsip yang sama.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={assets.gambarRomawi}
              alt="Gaya Romawi"
              className="w-full max-w-[500px] h-auto rounded-lg border border-gray-300 shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        <hr className="border-gray-300 my-12" />

        {/* 5. Keseluruhan Komposisi */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={assets.logo}
              alt="Logo Hood Agent"
              className="w-full max-w-[300px] h-auto"
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              6. Keseluruhan Komposisi
            </h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              Secara keseluruhan, logo Hood Agent merepresentasikan perpaduan
              antara kekuatan, spiritualitas, dan profesionalitas. Setiap elemen
              memiliki filosofi yang saling melengkapi — menggambarkan
              perjalanan brand dari komunitas kreatif sederhana menjadi entitas
              profesional. Logo ini bukan sekadar simbol visual, melainkan
              cerminan jati diri dan perjalanan panjang Hood Agent dalam
              menghadirkan karya yang menggabungkan estetika desain, semangat
              nasionalisme, dan nilai religius yang luhur.
            </p>
          </motion.div>
        </div>

        <hr className="border-gray-300 my-12" />

        {/* Timeline History */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
            Hood Agent Timeline History
          </h1>
          <img
            src={assets.gambarTimeline}
            alt="Timeline Hood Agent"
            className="w-full h-auto mt-8 rounded-2xl shadow-2xl"
          />
        </motion.div>

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
            Be part of something bigger. Connect with like-minded individuals
            and grow together.
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
