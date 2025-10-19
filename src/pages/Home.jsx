import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import Products from "../components/Products";
import Events from "../components/Events";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top first
    window.scrollTo(0, 0);

    // Then handle scroll to section based on hash if exists
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="w-full overflow-hidden">
      <Header />
      <Gallery />
      <Products />
      <Events />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
