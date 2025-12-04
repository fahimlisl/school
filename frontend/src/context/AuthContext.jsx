import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      console.log(`🔄 Logging in as ${role} with email: ${email}`);
      
      // Determine endpoint based on role
      let endpoint;
      switch (role) {
        case "admin":
          endpoint = "/admin/login";
          break;
        case "teacher":
          endpoint = "/teacher/login";
          break;
        case "student":
          endpoint = "/student/login";
          break;
        default:
          throw new Error("Invalid role");
      }
      const url = `${import.meta.env.VITE_BASE_URL}${endpoint}`;
      console.log(`🌐 Calling API: ${url}`);

      // Make API call
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      
      // Get response as text first
      const responseText = await response.text();
      console.log(`📦 Raw Response:`, responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("❌ Response is not JSON:", responseText);
        throw new Error(`Invalid JSON response from server`);
      }

      console.log("✅ Parsed JSON Response:", data);

      if (!response.ok || (data.success === false)) {
        throw new Error(data.message || data.error || `Login failed with status ${response.status}`);
      }

      // ✅ FIX: Handle different response formats for different roles
      let loginUser, accessToken, refreshToken;

      if (role === "teacher") {
        // Teacher returns [user, accessToken, refreshToken] array
        if (Array.isArray(data.data)) {
          [loginUser, accessToken, refreshToken] = data.data;
        } else {
          // Fallback to new format if teacher controller was updated
          loginUser = data.data?.loginUser || data.data?.foundStudnet;
          accessToken = data.data?.accessToken;
          refreshToken = data.data?.refreshToken;
        }
      } else {
        // Student/Admin returns object with loginUser, accessToken, refreshToken
        loginUser = data.data?.loginUser || data.data?.foundStudnet;
        accessToken = data.data?.accessToken;
        refreshToken = data.data?.refreshToken;
      }

      if (!accessToken || !loginUser) {
        console.error("❌ Missing token or user in response:", data);
        throw new Error("Invalid response format from server");
      }

      // Create user object
      const userData = {
        id: loginUser._id,
        email: loginUser.email,
        username: loginUser.username || loginUser.fullName,
        name: loginUser.username || loginUser.fullName,
        role: role,
        createdAt: loginUser.createdAt,
        fullName: loginUser.fullName, // Add fullName for teacher
        phoneNumber: loginUser.phoneNumber,
        subject: loginUser.subject,
        classAssigned: loginUser.classAssigned
      };

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", accessToken);

      setUser(userData);
      setToken(accessToken);

      console.log("✅ Login successful! User:", userData);
      console.log("✅ Token stored:", accessToken.substring(0, 20) + "...");

      return { 
        success: true, 
        user: userData, 
        token: accessToken 
      };

    } catch (error) {
      console.error("❌ Login error:", error);
      
      let errorMessage = error.message;
      
      if (errorMessage.includes("user doesn't exist") || errorMessage.includes("invalid credentials")) {
        errorMessage = "Invalid email or password";
      } else if (errorMessage.includes("correct password") || errorMessage.includes("pasword is wrong")) {
        errorMessage = "Incorrect password";
      } else if (errorMessage.includes("Cannot POST") || errorMessage.includes("404")) {
        errorMessage = `Server error: API endpoint not found`;
      } else if (errorMessage.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to server. Check if backend is running.";
      }

      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    setUser(null);
    setToken(null);
    
    console.log("✅ Logged out successfully");
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      loading, 
      login, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);