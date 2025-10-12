import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      path: "/admin/dashboard/divisi",
      icon: "👥",
      label: "Divisi",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold text-[#FFAE00]">
                Admin Panel
              </h1>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isSidebarOpen ? "←" : "→"}
            </button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#CB3B0F] rounded-full flex items-center justify-center text-white font-bold">
              {admin?.name?.charAt(0).toUpperCase()}
            </div>
            {isSidebarOpen && (
              <div>
                <p className="font-semibold text-sm">{admin?.name}</p>
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-[#CB3B0F] text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="font-medium">{item.label}</span>
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
          >
            <span className="text-xl">🏠</span>
            {isSidebarOpen && <span className="font-medium">Homepage</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard Management
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-semibold">{admin?.name}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
