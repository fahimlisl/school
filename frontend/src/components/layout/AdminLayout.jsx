import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Menu, X, LogOut, Home, Users, UserCheck, 
  CreditCard, Calendar, Settings, Bell, 
  Search, ChevronDown, BookOpen, BarChart3,
  FileText, Award, HelpCircle, MessageSquare,
  Shield, Plus, School, DollarSign, Clipboard,
  Database, TrendingUp, Users as UsersIcon
} from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      navigate("/login");
    }
  };


  const isStudentsPage = location.pathname.includes('/admin/students');


  const navItems = [
    { 
      icon: <Home size={22} />, 
      label: "Dashboard", 
      path: "/admin/dashboard",
      badge: "New"
    },
    { 
      icon: <Users size={22} />, 
      label: "Students", 
      path: "/admin/students",
      count: 1254,
      subItems: ["All Students", "Add New", "Attendance", "Reports"]
    },
    { 
      icon: <Users size={22} />, 
      label: "Online Registration", 
      path: "/admin/online-students",
      // count: 1254,
      subItems: ["All Students", "Add New", "Attendance", "Reports"]
    },
    { 
      icon: <UserCheck size={22} />, 
      label: "Teachers", 
      path: "/admin/teachers",
      count: 48
    },
    // { 
    //   icon: <BookOpen size={22} />, 
    //   label: "Courses", 
    //   path: "#",
    //   badge: "Updated"
    // },
    // { 
    //   icon: <CreditCard size={22} />, 
    //   label: "Finance", 
    //   path: "#",
    //   subItems: ["Fees", "Payments", "Reports", "Invoices"]
    // },
    // { 
    //   icon: <Calendar size={22} />, 
    //   label: "Attendance", 
    //   path: "#" 
    // },
    // { 
    //   icon: <BarChart3 size={22} />, 
    //   label: "Analytics", 
    //   path: "#" 
    // },
    // { 
    //   icon: <FileText size={22} />, 
    //   label: "Reports", 
    //   path: "#" 
    // },
    { 
      icon: <Award size={22} />, 
      label: "Exams", 
      path: "#" 
    },
    // { 
    //   icon: <Settings size={22} />, 
    //   label: "Settings", 
    //   path: "#" 
    // },
  ];


  const quickActions = [
    { icon: <Plus className="w-5 h-5" />, label: "Add Student", color: "bg-blue-500", path: "/admin/add-student" },
    { icon: "👨‍🏫", label: "Add Teacher", color: "bg-green-500" , path:"/admin/teachers" },
    // { icon: "📊", label: "Generate Report", color: "bg-purple-500" },
    { icon: "📅", label: "Schedule Event", color: "bg-orange-500" },
  ];


  const notifications = [
    { id: 1, title: "New Student Registration", time: "5 min ago", unread: true },
    { id: 2, title: "Fee Payment Due", time: "1 hour ago", unread: true },
    { id: 3, title: "Staff Meeting", time: "2 hours ago", unread: false },
    { id: 4, title: "System Update", time: "1 day ago", unread: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm z-50">
        <div className="px-4 h-full">
          <div className="flex items-center justify-between h-full">
            

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>


              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <School className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">SchoolSync Pro</h1>
                  <p className="text-xs text-gray-500">Administration Portal</p>
                </div>
              </div>
            </div>


            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students, teachers, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>


            <div className="flex items-center space-x-3">
              {/* Add Student Button (Visible when on Students page) */}
              {isStudentsPage && (
                <NavLink
                  to="/admin/add-student"
                  className="hidden md:flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add Student</span>
                </NavLink>
              )}


              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Search size={22} />
              </button>


              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-gray-100"
                >
                  <Bell size={22} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                

                {notificationsOpen && (
                  <>
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-gray-800">Notifications</h3>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {notifications.filter(n => n.unread).length} New
                          </span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border-b hover:bg-gray-50 ${notification.unread ? 'bg-blue-50/50' : ''}`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 mt-2 rounded-full ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{notification.title}</p>
                                <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t">
                        <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium">
                          View All Notifications
                        </button>
                      </div>
                    </div>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setNotificationsOpen(false)}
                    />
                  </>
                )}
              </div>


              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">
                        {user?.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="font-semibold text-gray-800">{user?.name || 'Administrator'}</p>
                    <p className="text-xs text-gray-500">{user?.role?.toUpperCase() || 'ADMIN'}</p>
                  </div>
                  <ChevronDown size={18} className="hidden lg:block text-gray-400" />
                </button>


                {userDropdownOpen && (
                  <>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                      {/* User Info */}
                      <div className="p-6 border-b">
                        <div className="flex items-center space-x-3">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                              {user?.name?.charAt(0) || 'A'}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{user?.name || 'Administrator'}</h3>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                            <div className="flex items-center mt-1">
                              <Shield size={14} className="text-blue-500 mr-1" />
                              <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                {user?.role?.toUpperCase() || 'ADMIN'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="p-2">
                        <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                          <UserCheck size={18} className="mr-3" />
                          My Profile
                        </button>
                        <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                          <Settings size={18} className="mr-3" />
                          Account Settings
                        </button>
                        <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                          <HelpCircle size={18} className="mr-3" />
                          Help & Support
                        </button>
                      </div>


                      <div className="p-3 border-t">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                          <LogOut size={18} className="mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserDropdownOpen(false)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>


      {searchOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <button onClick={() => setSearchOpen(false)}>
                <X size={24} />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}


      <aside className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 
        transform transition-all duration-300 ease-in-out z-40 shadow-xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:top-0 lg:shadow-none
      `}>
        <div className="h-full flex flex-col">

          <div className="p-6 border-b">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                action.path ? (
                  <NavLink
                    key={index}
                    to={action.path}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className={`${action.color} w-8 h-8 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      {typeof action.icon === 'string' ? (
                        <span className="text-white">{action.icon}</span>
                      ) : (
                        <div className="text-white">{action.icon}</div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {action.label}
                    </span>
                  </NavLink>
                ) : (
                  <button
                    key={index}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className={`${action.color} w-8 h-8 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      {typeof action.icon === 'string' ? (
                        <span className="text-white">{action.icon}</span>
                      ) : (
                        <div className="text-white">{action.icon}</div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {action.label}
                    </span>
                  </button>
                )
              ))}
            </div>
          </div>


          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  <NavLink
                    to={item.path}
                    end={item.path === "/admin/dashboard"}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${item.path.includes('#') ? 'opacity-60' : ''}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    

                    {item.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.path === "/admin/dashboard" 
                          ? 'bg-white/20 text-white' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        item.path === "/admin/dashboard" 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.count.toLocaleString()}
                      </span>
                    )}
                    

                    {item.path === "/admin/dashboard" && (
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-full"></div>
                    )}
                  </NavLink>
                  

                  {item.label === "Students" && (
                    <div className="ml-4 mt-1 pl-8">
                      <NavLink
                        to="/admin/add-student"
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add New Student</span>
                      </NavLink>
                    </div>
                  )}
                </div>
              ))}
            </nav>


            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">System Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Last updated: Today 10:30 AM
              </div>
            </div>
          </div>


          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Need Help?</p>
                <p className="text-xs text-gray-500">developerfahim134@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>


      <main className={`
        pt-16 transition-all duration-300
        ${sidebarOpen ? "lg:pl-64" : "lg:pl-0"}
      `}>
        <div className="p-4 sm:p-6 lg:p-8">

          {isStudentsPage && (
            <div className="mb-6 md:hidden">
              <NavLink
                to="/admin/add-student"
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition w-full"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add New Student</span>
              </NavLink>
            </div>
          )}
          
          <Outlet />
        </div>
      </main>
    </div>
  );
}