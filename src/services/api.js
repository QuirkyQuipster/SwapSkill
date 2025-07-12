const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  }

  // Authentication
  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await this.handleResponse(response);
    localStorage.setItem('token', data.token);
    return data;
  }

  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    const data = await this.handleResponse(response);
    localStorage.setItem('token', data.token);
    return data;
  }

  async logout() {
    try {
      await fetch(`${this.baseURL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
    }
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // User Management
  async updateProfile(profileData) {
    const response = await fetch(`${this.baseURL}/users/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    
    return this.handleResponse(response);
  }

  async searchUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/users/search?${queryString}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async getUserById(userId) {
    const response = await fetch(`${this.baseURL}/users/${userId}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // Skills
  async getAvailableSkills(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/skills/available?${queryString}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async getPopularSkills() {
    const response = await fetch(`${this.baseURL}/skills/popular`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async getSkillCategories() {
    const response = await fetch(`${this.baseURL}/skills/categories`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // Swap Requests
  async createSwapRequest(requestData) {
    const response = await fetch(`${this.baseURL}/swaps`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(requestData)
    });
    
    return this.handleResponse(response);
  }

  async getSwapRequests(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/swaps?${queryString}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async updateSwapRequest(requestId, updateData) {
    const response = await fetch(`${this.baseURL}/swaps/${requestId}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updateData)
    });
    
    return this.handleResponse(response);
  }

  async deleteSwapRequest(requestId) {
    const response = await fetch(`${this.baseURL}/swaps/${requestId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  async getSwapRequestById(requestId) {
    const response = await fetch(`${this.baseURL}/swaps/${requestId}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`);
    return this.handleResponse(response);
  }
}

export default new ApiService(); 