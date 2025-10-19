import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:5000";

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    eventProducts: 0,
    projects: 0,
    loading: true,
  });

  // Fetch stats data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, eventProductsRes, projectsRes] = await Promise.all([
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/event-products`),
          axios.get(`${API_URL}/projects`),
        ]);

        setStats({
          totalProducts: productsRes.data.length,
          eventProducts: eventProductsRes.data.length,
          projects: projectsRes.data.length,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    {
      path: "/admin/dashboard/products",
      icon: "🛍️",
      label: "Products",
    },
    {
      path: "/admin/dashboard/event-products",
      icon: "🎉",
      label: "Event Products",
    },
    {
      path: "/admin/dashboard/projects",
      icon: "📁",
      label: "Catalog (Projects)",
    },
    {
      path: "/admin/dashboard/events",
      icon: "📅",
      label: "Events",
    },
    {
      path: "/admin/dashboard/testimonials",
      icon: "💬",
      label: "Testimonials",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#FFAE00] to-[#CB3B0F] bg-clip-text text-transparent">
                Admin Panel
              </h1>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-400 hover:text-[#FFAE00] transition-colors rounded-lg hover:bg-gray-800"
            >
              <i className={`bx ${isSidebarOpen ? 'bx-chevron-left' : 'bx-chevron-right'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#CB3B0F] to-[#FFAE00] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-[#FFAE00]/50">
                {admin?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            {isSidebarOpen && (
              <div>
                <p className="font-semibold text-sm text-white">{admin?.name}</p>
                <p className="text-xs text-gray-400">{admin?.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative overflow-hidden group ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-[#CB3B0F] to-[#FFAE00] text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {!isActive(item.path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#CB3B0F]/20 to-[#FFAE00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  )}
                  <span className="text-xl relative z-10">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="font-medium relative z-10">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout & Home */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 group"
          >
            <i className="bx bx-home-alt text-xl"></i>
            {isSidebarOpen && <span className="font-medium">Homepage</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <i className="bx bx-log-out text-xl"></i>
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-5 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Dashboard Management
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage your Hood Agent store
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Welcome back,</p>
                <p className="text-sm font-semibold text-gray-800">{admin?.name}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#CB3B0F] to-[#FFAE00] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {admin?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Total Products Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">
                    Total Products
                  </p>
                  {stats.loading ? (
                    <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
                  ) : (
                    <h3 className="text-3xl font-bold text-gray-800">
                      {stats.totalProducts}
                    </h3>
                  )}
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-[#CB3B0F] to-[#FFAE00] rounded-xl flex items-center justify-center shadow-lg">
                  <i className="bx bx-shopping-bag text-3xl text-white"></i>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-semibold">
                  <i className="bx bx-trending-up"></i> Active
                </span>
                <span className="text-gray-400 ml-2">Regular inventory</span>
              </div>
            </motion.div>

            {/* Event Products Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">
                    Event Products
                  </p>
                  {stats.loading ? (
                    <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
                  ) : (
                    <h3 className="text-3xl font-bold text-gray-800">
                      {stats.eventProducts}
                    </h3>
                  )}
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-[#FFAE00] to-[#CB3B0F] rounded-xl flex items-center justify-center shadow-lg">
                  <i className="bx bx-party text-3xl text-white"></i>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="bg-[#FFAE00] text-[#CB3B0F] text-xs font-bold px-2 py-1 rounded">
                  LIMITED
                </span>
                <span className="text-gray-400 ml-2">Anniversary items</span>
              </div>
            </motion.div>

            {/* Projects Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">
                    Catalog Items
                  </p>
                  {stats.loading ? (
                    <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
                  ) : (
                    <h3 className="text-3xl font-bold text-gray-800">
                      {stats.projects}
                    </h3>
                  )}
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="bx bx-folder-open text-3xl text-white"></i>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-blue-600 font-semibold">
                  <i className="bx bx-collection"></i> Portfolio
                </span>
                <span className="text-gray-400 ml-2">Project gallery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Area */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
