// src/api/auth.api.js
import axiosInstance from './axiosInstance';

export const authAPI = {
  // Admin Login - Based on your backend: POST /api/v1/admin/login
  adminLogin: async (email, password) => {
    const response = await axiosInstance.post('/admin/login', {
      email,
      password
    });
    return response.data;
  },

  // Teacher Login - Based on your backend
  teacherLogin: async (email, password) => {
    const response = await axiosInstance.post('/teacher/login', {
      email,
      password
    });
    return response.data;
  },

  // Student Login - Based on your backend
  studentLogin: async (email, password) => {
    const response = await axiosInstance.post('/student/login', {
      email,
      password
    });
    return response.data;
  },

  // Logout - Clear token
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  // Verify token/Get current user
  verifyToken: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // You might have a /verify or /me endpoint
      const response = await axiosInstance.get('/verify');
      return response.data;
    } catch (error) {
      return null;
    }
  }
};