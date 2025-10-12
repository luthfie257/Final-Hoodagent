import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import About from "../components/About";
import Projects from "../components/Projects";
import Products from "../components/Products";
import Events from "../components/Events";
import Divisi from "../components/Divisi";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to section based on hash
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="w-full overflow-hidden">
      <Header />
      <About />
      <Projects />
      <Products />
      <Events />
      <Divisi />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
