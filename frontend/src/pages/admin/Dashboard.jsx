// src/pages/admin/Dashboard.jsx
import { useAuth } from "../../context/AuthContext";
import { Users, UserCheck, CreditCard, Calendar, TrendingUp, TrendingDown, Server } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchign dashboard data thoguh api endpoint
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      
      // const response = await axios.get('http://localhost:3030/api/v1/admin/dashboard/stats', {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      
      // test - fake data hardcoded
      setTimeout(() => {
        setStats({
          totalStudents: 1254,
          totalTeachers: 48,
          pendingFees: 12540,
          attendanceRate: 94
        });
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with User Info */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome back, {user?.name || 'Admin'}! 👋
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Email: {user?.email} • Role: {user?.role}
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Server className="w-4 h-4 mr-1" />
            <span>Connected to API</span>
          </div>
        </div>
      </div>

    </div>
  );
}