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
  LogIn
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin" // default to admin
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // lgin function calling
    const result = await login(
      formData.email, 
      formData.password, 
      formData.role
    );

    if (result.success) {

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
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };


  const roleOptions = [
    { 
      value: "admin", 
      label: "Administrator", 
      icon: <Shield className="w-5 h-5" />,
      description: "Manage school operations",
      color: "bg-blue-500"
    },
    { 
      value: "teacher", 
      label: "Teacher", 
      icon: <User className="w-5 h-5" />,
      description: "Manage classes and students",
      color: "bg-green-500"
    },
    { 
      value: "student", 
      label: "Student", 
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Access learning materials",
      color: "bg-purple-500"
    }
  ];


  const fillCredentials = () => {
    const credentials = {
      admin: { email: "test@gmail.com", password: "test" },
      teacher: { email: "teacher@example.com", password: "teacher123" },
      student: { email: "student@example.com", password: "student123" }
    };

    const creds = credentials[formData.role] || { email: "", password: "" };
    setFormData(prev => ({
      ...prev,
      email: creds.email,
      password: creds.password
    }));
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* branding of left side  */}
            <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">SchoolSync</h1>
                      <p className="text-blue-100 text-sm">Management System</p>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">
                    Welcome Back
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Sign in to access your personalized dashboard and manage your school activities.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Secure Login</p>
                      <p className="text-sm text-blue-200">End-to-end encrypted</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Role-Based Access</p>
                      <p className="text-sm text-blue-200">Different dashboards for each role</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="md:w-3/5 p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Sign In</h3>
                <p className="text-gray-600">Choose your role and enter credentials</p>
              </div>

              {/* error message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-5 h-5 text-red-500 mr-2">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* differnte types */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Your Role
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleChange({ target: { name: "role", value: role.value } })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.role === role.value
                          ? `${role.color} border-transparent text-white transform scale-[1.02] shadow-lg`
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`mb-2 p-2 rounded-lg ${
                          formData.role === role.value 
                            ? "bg-white/20" 
                            : "bg-white"
                        }`}>
                          {role.icon}
                        </div>
                        <span className="font-semibold text-sm">{role.label}</span>
                        <span className="text-xs mt-1 opacity-75">{role.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* total login form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* email inpution */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                      placeholder="you@example.com"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* inpution of password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                      placeholder="Enter your password"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* buttons */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={fillCredentials}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Fill Test Credentials
                    </button>
                    
                    <a 
                      href="#" 
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || authLoading}
                    className="w-full bg-blue-600 text-white py-3.5 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Sign In as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Backend Connected</span>
                  </div>
                  <a 
                    href="/" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ← Back to Home
                  </a>
                </div>
                

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    <strong>Tip:</strong> As {formData.role}, you'll have access to {
                      formData.role === "admin" ? "full administrative controls" :
                      formData.role === "teacher" ? "class management and grading" :
                      "your learning materials and progress"
                    }.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}