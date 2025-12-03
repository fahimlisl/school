import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app load
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

      const url = `http://localhost:3030/api/v1${endpoint}`;
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

      console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
      
      // Get response as text first to check if it's JSON
      const responseText = await response.text();
      console.log(`📦 Raw Response (first 200 chars):`, responseText.substring(0, 200));
      
      let data;
      try {
        // Try to parse as JSON
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("❌ Response is not JSON:", responseText);
        
        // Check if it's HTML error page
        if (responseText.includes("<!DOCTYPE") || responseText.includes("<html")) {
          throw new Error(`Backend returned HTML instead of JSON. Check if endpoint ${url} exists.`);
        } else if (responseText.includes("Cannot POST") || responseText.includes("404")) {
          throw new Error(`Endpoint not found: ${url}. Check your backend routes.`);
        } else {
          throw new Error(`Invalid response from server: ${responseText.substring(0, 100)}`);
        }
      }

      console.log("✅ Parsed JSON Response:", data);

      if (!response.ok || (data.success === false)) {
        throw new Error(data.message || data.error || `Login failed with status ${response.status}`);
      }

      // Extract data from your API response format
      const { accessToken, loginUser } = data.data || {};
      
      if (!accessToken || !loginUser) {
        console.error("❌ Missing token or user in response:", data);
        throw new Error("Invalid response format from server");
      }

      // Create user object
      const userData = {
        id: loginUser._id,
        email: loginUser.email,
        username: loginUser.username,
        name: loginUser.username,
        role: role,
        createdAt: loginUser.createdAt,
      };

      // store in localStorage
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
      

      if (errorMessage.includes("user doesn't exist")) {
        errorMessage = "User not found in database";
      } else if (errorMessage.includes("correct password")) {
        errorMessage = "Incorrect password";
      } else if (errorMessage.includes("Cannot POST") || errorMessage.includes("404")) {
        errorMessage = `API endpoint not found. Check if backend is running and endpoint exists.`;
      } else if (errorMessage.includes("HTML instead of JSON")) {
        errorMessage = "Backend returned an error page. Check server logs.";
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
    // localstorgage clearing
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