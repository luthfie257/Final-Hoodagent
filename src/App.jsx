import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProductsPage from "./pages/ProductsPage";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import EventProductsManagement from "./pages/admin/EventProductsManagement";
import ProjectsManagement from "./pages/admin/ProjectsManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import TestimonialsManagement from "./pages/admin/TestimonialsManagement";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="products" element={<ProductsManagement />} />
              <Route path="event-products" element={<EventProductsManagement />} />
              <Route path="projects" element={<ProjectsManagement />} />
              <Route path="events" element={<EventsManagement />} />
              <Route path="testimonials" element={<TestimonialsManagement />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AdminAuthProvider>
  );
};

export default App;
