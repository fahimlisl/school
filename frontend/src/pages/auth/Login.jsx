import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { 
  Shield, 
  User, 
  GraduationCap, 
  Lock, 
  Eye, 
  EyeOff,
  LogIn,
  Mail,
  AlertCircle
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student" // default to studnet page 
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
    
    // update API endpoint preview when user changes
    if (name === "role") {
      switch(value) {
        case "admin":
          // setApiEndpoint("POST /api/v1/admin/login");
          break;
        case "teacher":
          // setApiEndpoint("POST /api/v1/teacher/login");
          break;
        case "student":
          // setApiEndpoint("POST /api/v1/student/login");
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);


    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }


    console.log(`Attempting ${formData.role} login with:`, {
      email: formData.email,
      password: "***" + formData.password.slice(-2),
      endpoint: apiEndpoint
    });

    //  calling login fucntion form auth context
    try {
      const result = await login(
        formData.email, 
        formData.password, 
        formData.role
      );

      console.log("Login result:", result);

      if (result.success) {
        setTimeout(() => {
          switch (formData.role) {
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "teacher":
              navigate("/teacher/dashboard");
              break;
            case "student":
              navigate("/student/dashboard");
              break;
            default:
              navigate("/");
          }
        }, 500);
      } else {
        setError(result.message || "Login failed. Please check your credentials.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { 
      value: "admin", 
      label: "Administrator", 
      icon: <Shield className="w-5 h-5" />,
      description: "Manage school operations",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      testCredentials: { email: "fopopff@gmail.com", password: "test" }
    },
    { 
      value: "teacher", 
      label: "Teacher", 
      icon: <User className="w-5 h-5" />,
      description: "Manage classes and students",
      color: "bg-green-500",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      testCredentials: { email: "teacher@school.edu", password: "teacher123" }
    },
    { 
      value: "student", 
      label: "Student", 
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Access learning materials",
      color: "bg-purple-500",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      testCredentials: { email: "student@school.edu", password: "09092009" }
    }
  ];

  const fillCredentials = (role = formData.role) => {
    const roleOption = roleOptions.find(r => r.value === role);
    if (roleOption && roleOption.testCredentials) {
      setFormData(prev => ({
        ...prev,
        email: roleOption.testCredentials.email,
        password: roleOption.testCredentials.password
      }));
      setError("");
    }
  };


  useState(() => {
    fillCredentials("student");
    // setApiEndpoint("POST /api/v1/student/login");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="md:flex">

            <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-800 p-8 md:p-12 text-white relative overflow-hidden">

              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: '80px'
                }}></div>
              </div>
              
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">SchoolSync Pro</h1>
                      <p className="text-blue-100 text-sm">Unified School Management System</p>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-6">
                    Welcome Back!
                  </h2>
                  <p className="text-blue-100 text-lg leading-relaxed mb-8">
                    Access your personalized dashboard. One login for administrators, teachers, and students.
                  </p>
                  <p className="text-blue-100 text-lg leading-relaxed mb-8">Initial login may take 30–40 seconds on this demo server.
The production version delivered to you will have zero downtime.</p>
                  

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
                    <div className="flex items-center">
                      {roleOptions.find(r => r.value === formData.role)?.icon}
                      <div className="ml-3">
                        <div className="font-semibold">Logging in as: {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</div>
                        <div className="text-sm text-blue-200 opacity-90">{apiEndpoint}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4 backdrop-blur-sm">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Secure & Encrypted</p>
                      <p className="text-sm text-blue-200">End-to-end protected login</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4 backdrop-blur-sm">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Role-Based Access</p>
                      <p className="text-sm text-blue-200">Tailored dashboards for each role</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="md:w-3/5 p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Sign In to SchoolSync</h3>
                <p className="text-gray-600">Select your role and enter your credentials</p>
              </div>


              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-red-700 font-medium block">{error}</span>
                      <span className="text-red-600 text-sm block mt-1">
                        Check your credentials or contact support if the issue persists.
                      </span>
                    </div>
                  </div>
                </div>
              )}


              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Select Your Role
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => {
                        handleChange({ target: { name: "role", value: role.value } });
                        fillCredentials(role.value);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.role === role.value
                          ? `${role.color} border-transparent text-white transform scale-[1.02] shadow-lg`
                          : `${role.borderColor} bg-gray-50 text-gray-700 hover:bg-gray-100 hover:border-gray-300`
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`mb-3 p-3 rounded-lg ${
                          formData.role === role.value 
                            ? "bg-white/20" 
                            : `${role.textColor} bg-white`
                        }`}>
                          {role.icon}
                        </div>
                        <span className="font-semibold text-sm">{role.label}</span>
                        <span className="text-xs mt-2 opacity-75 leading-tight">{role.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>


              <form onSubmit={handleSubmit} className="space-y-6">
                

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition text-lg"
                      placeholder="you@school.edu"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    For students: Use registered school email. For teachers/admin: Use assigned institutional email.
                  </p>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition text-lg"
                      placeholder="Enter your password"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>


                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => fillCredentials()}
                      className="px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium text-sm"
                    >
                      Fill Test Credentials for {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                    </button>
                    
                    <a 
                      href="#" 
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium text-center sm:text-right"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || authLoading}
                    className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                      formData.role === "admin" ? "bg-blue-600 hover:bg-blue-700" :
                      formData.role === "teacher" ? "bg-green-600 hover:bg-green-700" :
                      "bg-purple-600 hover:bg-purple-700"
                    } text-white`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-6 h-6" />
                        Sign In as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                      </>
                    )}
                  </button>
                </div>
              </form>


              <div className="mt-10 pt-8 border-t border-gray-200">
                {/* System Status */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                    <span>Backend: Connected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>API: Ready</span>
                  </div>
                </div>


                <div className={`p-4 rounded-xl mb-4 ${
                  formData.role === "admin" ? "bg-blue-50 border border-blue-200" :
                  formData.role === "teacher" ? "bg-green-50 border border-green-200" :
                  "bg-purple-50 border border-purple-200"
                }`}>
                  <p className="text-sm font-medium">
                    <span className="font-bold">
                      {formData.role === "admin" ? "Administrator" :
                       formData.role === "teacher" ? "Teacher" :
                       "Student"} Access:
                    </span>
                    <span className="ml-2 text-gray-700">
                      {formData.role === "admin" ? "Full system control, user management, and analytics" :
                       formData.role === "teacher" ? "Class management, grading, and student progress tracking" :
                       "Course materials, grades, assignments, and personal dashboard"}
                    </span>
                  </p>
                </div>


                <div className="flex items-center justify-between">
                  <a 
                    href="/" 
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Homepage
                  </a>
                  
                  <div className="text-xs text-gray-500">
                    Need help? <a href="/contact" className="text-blue-600 hover:text-blue-800">Contact Support</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}