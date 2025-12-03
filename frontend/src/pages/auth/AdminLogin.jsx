// src/pages/auth/AdminLogin.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Smartphone, Monitor } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email === "admin@school.com" && password === "admin123") {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      login({
        email,
        name: "School Admin",
        role: "admin",
        id: "admin-001"
      });

      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Use: admin@school.com / admin123");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-5 sm:p-6 md:p-8">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Admin Portal
          </h1>
          <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
            Restricted access • Administrators only
          </p>
        </div>

        {/* Device Compatibility */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="flex items-center">
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">Mobile</span>
          </div>
          <div className="flex items-center">
            <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">Desktop</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 text-xs sm:text-sm">
            {error}
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 sm:mb-6">
          <div className="flex items-start">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-800 text-xs sm:text-sm mb-1">Secure Admin Access</p>
              <p className="text-blue-700 text-xs">This portal is protected with encryption</p>
            </div>
          </div>
        </div>

        {/* Demo Info - Responsive */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 sm:mb-6">
          <p className="font-medium text-yellow-800 text-xs sm:text-sm mb-1">Demo Credentials:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs sm:text-sm">
            <p className="text-yellow-700">Email: admin@school.com</p>
            <p className="text-yellow-700">Password: admin123</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleAdminLogin} className="space-y-4 sm:space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Admin Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@school.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Login as Admin"
            )}
          </button>
        </form>

        {/* Back links - Responsive */}
        <div className="mt-4 sm:mt-6 space-y-2 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">
            <a href="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
              ← Back to Regular Login
            </a>
          </p>
          <p className="text-gray-600 text-xs sm:text-sm">
            <a href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
              ← Back to Homepage
            </a>
          </p>
          <p className="text-gray-400 text-xs pt-2">
            Secure connection • Responsive design
          </p>
        </div>
      </div>

      {/* Mobile Indicator */}
      <div className="fixed bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full sm:hidden">
        Admin Portal
      </div>
    </div>
  );
}