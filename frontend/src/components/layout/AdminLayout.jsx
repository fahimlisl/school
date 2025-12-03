import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Home, Users, UserCheck, CreditCard, Calendar, Settings } from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // logoout through bakend api
      await fetch('http://localhost:3030/api/v1/admin/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      logout();
      

      navigate("/login");
      
    } catch (error) {
      console.error("Logout error:", error);
      // Still logout from frontend even if backend call fails
      logout();
      navigate("/login");
    }
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Users size={20} />, label: "Students", path: "/admin/students" },
    { icon: <UserCheck size={20} />, label: "Teachers", path: "/admin/teachers" },
    { icon: <CreditCard size={20} />, label: "Fees", path: "#" },
    { icon: <Calendar size={20} />, label: "Attendance", path: "#" },
    { icon: <Settings size={20} />, label: "Settings", path: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* responsive  */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <nav className="bg-white shadow-md border-b fixed top-0 left-0 right-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center">

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>


              <div className="flex items-center ml-2 lg:ml-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg sm:text-xl">🏫</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800">School Admin</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Dashboard</p>
                </div>
              </div>
            </div>


            <div className="flex items-center space-x-2 sm:space-x-4">
                {/* hides userifno in small devices  */}
              <div className="hidden md:block text-right">
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px]">
                  {user?.email}
                </p>
              </div>


              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm sm:text-base">
                      {user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                </button>

                {/* dropdown menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border z-20">
                    <div className="p-3 sm:p-4 border-b">
                      <p className="font-medium text-sm sm:text-base">Admin Account</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100 rounded flex items-center">
                        <UserCheck size={16} className="mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 rounded flex items-center mt-1"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* sidebar - responsive  */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col pt-16">
          {/* sidebar  */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
              Main Menu
            </h2>
            
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === "/admin/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-3 rounded-lg text-sm sm:text-base transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-gray-500">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* logout in sidebar */}
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg text-sm sm:text-base"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>


      <main className="pt-16 lg:pt-0 lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>


      {userDropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setUserDropdownOpen(false)}
        />
      )}
    </div>
  );
}