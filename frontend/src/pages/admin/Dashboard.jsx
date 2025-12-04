import { useAuth } from "../../context/AuthContext.jsx";
import { 
  Users, UserCheck, CreditCard, Calendar, 
  TrendingUp, TrendingDown, Server, BookOpen,
  BarChart3, DollarSign, CheckCircle, Clock,
  AlertCircle, ChevronRight, Download, Filter,
  Eye, MessageSquare, Award, Target
} from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setTimeout(() => {
        setStats({
          totalStudents: 1254,
          totalTeachers: 48,
          activeClasses: 32,
          pendingFees: 12540,
          attendanceRate: 94.5,
          pendingRequests: 23,
          upcomingEvents: 7,
          revenue: 45000
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      setLoading(false);
    }
  };

  // Sample chart data
  const revenueData = [
    { month: 'Jan', revenue: 40000, students: 1200 },
    { month: 'Feb', revenue: 45000, students: 1250 },
    { month: 'Mar', revenue: 48000, students: 1254 },
    { month: 'Apr', revenue: 42000, students: 1230 },
    { month: 'May', revenue: 47000, students: 1260 },
    { month: 'Jun', revenue: 45000, students: 1254 },
  ];

  const subjectDistribution = [
    { name: 'Science', value: 35, color: '#3B82F6' },
    { name: 'Math', value: 25, color: '#10B981' },
    { name: 'English', value: 20, color: '#8B5CF6' },
    { name: 'History', value: 15, color: '#F59E0B' },
    { name: 'Arts', value: 5, color: '#EF4444' },
  ];

  const recentActivity = [
    { id: 1, action: 'New student registered', user: 'John Doe', time: '10 min ago', type: 'student' },
    { id: 2, action: 'Fee payment received', user: 'Sarah Smith', time: '25 min ago', type: 'payment' },
    { id: 3, action: 'Exam results published', user: 'Math Dept.', time: '1 hour ago', type: 'exam' },
    { id: 4, action: 'Teacher attendance marked', user: 'Dr. Johnson', time: '2 hours ago', type: 'attendance' },
    { id: 5, action: 'New course added', user: 'Admin', time: '3 hours ago', type: 'course' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Annual Sports Day', date: 'Dec 15, 2024', type: 'sports' },
    { id: 2, title: 'Parent-Teacher Meeting', date: 'Dec 18, 2024', type: 'meeting' },
    { id: 3, title: 'Final Exams Begin', date: 'Dec 20, 2024', type: 'exam' },
    { id: 4, title: 'Winter Break Starts', date: 'Dec 22, 2024', type: 'holiday' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading Dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we gather your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user?.name || 'Administrator'}! 👋
            </h1>
            <p className="text-blue-100 mt-2 text-lg">
              Here's what's happening with your school today.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-green-300" />
                <span className="text-sm">System Status: <span className="font-bold">Optimal</span></span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="text-sm">
                Last login: Today at 09:42 AM
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg">
              Generate Monthly Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Students",
            value: stats.totalStudents,
            change: "+12%",
            icon: <Users className="w-8 h-8" />,
            color: "from-blue-500 to-cyan-500",
            trend: "up"
          },
          {
            title: "Active Teachers",
            value: stats.totalTeachers,
            change: "+5%",
            icon: <UserCheck className="w-8 h-8" />,
            color: "from-green-500 to-emerald-500",
            trend: "up"
          },
          {
            title: "Pending Fees",
            value: `$${stats.pendingFees.toLocaleString()}`,
            change: "-8%",
            icon: <CreditCard className="w-8 h-8" />,
            color: "from-amber-500 to-orange-500",
            trend: "down"
          },
          {
            title: "Attendance Rate",
            value: `${stats.attendanceRate}%`,
            change: "+2.3%",
            icon: <Calendar className="w-8 h-8" />,
            color: "from-purple-500 to-pink-500",
            trend: "up"
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600 mt-2">{stat.title}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Updated just now
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Revenue & Enrollment</h3>
              <p className="text-gray-600 text-sm">Last 6 months performance</p>
            </div>
            <div className="flex space-x-2">
              {['week', 'month', 'quarter'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    timeRange === range 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Subject Distribution</h3>
              <p className="text-gray-600 text-sm">Teachers by subject area</p>
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} teachers`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
            {subjectDistribution.map((subject, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                <span className="text-sm text-gray-700">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                  activity.type === 'student' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                  activity.type === 'exam' ? 'bg-purple-100 text-purple-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {activity.type === 'student' ? <Users size={18} /> :
                   activity.type === 'payment' ? <DollarSign size={18} /> :
                   activity.type === 'exam' ? <Award size={18} /> :
                   <Calendar size={18} />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Eye size={18} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Events</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{event.title}</p>
                    <div className="flex items-center mt-2">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{event.date}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    event.type === 'sports' ? 'bg-blue-100 text-blue-700' :
                    event.type === 'meeting' ? 'bg-green-100 text-green-700' :
                    event.type === 'exam' ? 'bg-purple-100 text-purple-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <button className="w-full mt-4 py-2 text-center text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Need to schedule an event?</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1">
                  Create New Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Classes', value: '32', icon: <BookOpen className="w-6 h-6" /> },
            { label: 'Pending Requests', value: '23', icon: <AlertCircle className="w-6 h-6" /> },
            { label: 'System Uptime', value: '99.8%', icon: <Server className="w-6 h-6" /> },
            { label: 'User Satisfaction', value: '4.8/5.0', icon: <Target className="w-6 h-6" /> },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3">
                {item.icon}
              </div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm text-gray-300">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}