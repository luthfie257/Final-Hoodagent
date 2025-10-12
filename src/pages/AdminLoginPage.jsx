import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, admin } = useAdminAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CB3B0F] to-[#FFAE00] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-white/90">
            Login untuk mengatur konten Hood Agent
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                placeholder="admin@hoodagent.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                placeholder="Masukkan password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/admin/register"
                className="text-[#CB3B0F] font-semibold hover:underline"
              >
                Daftar Admin
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-[#CB3B0F] transition-colors duration-200"
            >
              ← Kembali ke Homepage
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white text-sm">
          <p className="font-semibold mb-1">Default Admin:</p>
          <p>Email: admin@hoodagent.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
