// change into production url
const API_BASE_URL = 'http://localhost:3030/api/v1';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async request(endpoint, method = 'GET', data = null, requiresAuth = true) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      method,
      headers,
      credentials: 'include', // usage of cookies 
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      

      const contentType = response.headers.get('content-type');
      let responseData;
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || `HTTP ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }


  async adminLogin(email, password) {
    return this.request('/admin/login', 'POST', { email, password }, false);
  }

  async teacherLogin(email, password) {
    return this.request('/teacher/login', 'POST', { email, password }, false);
  }

  async studentLogin(email, password) {
    return this.request('/student/login', 'POST', { email, password }, false);
  }

  async logout() {
    // Call logout endpoint 
    // return this.request('/logout', 'POST');
    this.clearToken();
  }

  // Verify token
  async verifyToken() {
    if (!this.token) return false;
    
    try {
      const response = await this.request('/verify', 'GET');
      return response.valid || false;
    } catch (error) {
      return false;
    }
  }
}

export default new ApiService();