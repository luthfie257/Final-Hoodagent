import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import ProjectsManagement from "./pages/admin/ProjectsManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import DivisiManagement from "./pages/admin/DivisiManagement";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />

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
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="events" element={<EventsManagement />} />
            <Route path="divisi" element={<DivisiManagement />} />
          </Route>
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
};

export default App;
