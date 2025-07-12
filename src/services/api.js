const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Mock data for when backend is not available
const mockUsers = [
  {
    _id: '1',
    name: 'Alex Johnson',
    location: 'New York',
    skillsOffered: ['JavaScript', 'React', 'Node.js'],
    skillsWanted: ['Python', 'Machine Learning'],
    rating: { average: 4.5, count: 12 },
    profilePhoto: null
  },
  {
    _id: '2',
    name: 'Sarah Chen',
    location: 'San Francisco',
    skillsOffered: ['UI/UX Design', 'Photoshop', 'Figma'],
    skillsWanted: ['JavaScript', 'React'],
    rating: { average: 4.8, count: 8 },
    profilePhoto: null
  },
  {
    _id: '3',
    name: 'Mike Rodriguez',
    location: 'Los Angeles',
    skillsOffered: ['Spanish', 'Cooking', 'Photography'],
    skillsWanted: ['Excel', 'Data Analysis'],
    rating: { average: 4.2, count: 15 },
    profilePhoto: null
  },
  {
    _id: '4',
    name: 'Emma Wilson',
    location: 'Chicago',
    skillsOffered: ['Yoga', 'Meditation', 'Nutrition'],
    skillsWanted: ['Photography', 'Video Editing'],
    rating: { average: 4.7, count: 6 },
    profilePhoto: null
  }
];

const mockSwapRequests = [
  {
    _id: '1',
    requester: { _id: '2', name: 'Sarah Chen' },
    recipient: { _id: '1', name: 'Alex Johnson' },
    requestedSkill: 'JavaScript',
    offeredSkill: 'UI/UX Design',
    status: 'pending',
    message: 'I\'d like to learn JavaScript from you. I can offer UI/UX Design in return.',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    requester: { _id: '3', name: 'Mike Rodriguez' },
    recipient: { _id: '1', name: 'Alex Johnson' },
    requestedSkill: 'React',
    offeredSkill: 'Spanish',
    status: 'accepted',
    message: 'I\'d like to learn React from you. I can offer Spanish lessons in return.',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.useMockData = false;
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

  // Helper method to handle network errors and fallback to mock data
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, options);
      return await this.handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.log('Backend not available, using mock data');
        this.useMockData = true;
        throw new Error('Backend not available, using demo mode');
      }
      throw error;
    }
  }

  // Mock authentication
  async mockAuth(action, data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (action === 'login') {
      const mockUser = {
        _id: 'current-user',
        name: data.email.split('@')[0],
        email: data.email,
        skillsOffered: ['General Help'],
        skillsWanted: [],
        rating: { average: 0, count: 0 }
      };
      localStorage.setItem('token', 'mock-token');
      return { user: mockUser, token: 'mock-token' };
    }
    
    if (action === 'register') {
      const mockUser = {
        _id: 'current-user',
        name: data.name,
        email: data.email,
        skillsOffered: ['General Help'],
        skillsWanted: [],
        rating: { average: 0, count: 0 }
      };
      localStorage.setItem('token', 'mock-token');
      return { user: mockUser, token: 'mock-token' };
    }
    
    if (action === 'getCurrentUser') {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      
      return {
        user: {
          _id: 'current-user',
          name: 'Demo User',
          email: 'demo@example.com',
          skillsOffered: ['General Help'],
          skillsWanted: [],
          rating: { average: 0, count: 0 }
        }
      };
    }
  }

  // Authentication
  async register(userData) {
    try {
      const response = await this.makeRequest(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      return await this.mockAuth('register', userData);
    }
  }

  async login(credentials) {
    try {
      const response = await this.makeRequest(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      return await this.mockAuth('login', credentials);
    }
  }

  async logout() {
    try {
      await this.makeRequest(`${this.baseURL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.log('Using mock logout');
    } finally {
      localStorage.removeItem('token');
    }
  }

  async getCurrentUser() {
    try {
      return await this.makeRequest(`${this.baseURL}/auth/me`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      return await this.mockAuth('getCurrentUser');
    }
  }

  // User Management
  async updateProfile(profileData) {
    try {
      return await this.makeRequest(`${this.baseURL}/users/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
    } catch (error) {
      // Mock profile update
      await new Promise(resolve => setTimeout(resolve, 500));
      return { user: { ...profileData, _id: 'current-user' } };
    }
  }

  async searchUsers(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await this.makeRequest(`${this.baseURL}/users/search?${queryString}`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock user search
      await new Promise(resolve => setTimeout(resolve, 300));
      let filteredUsers = [...mockUsers];
      
      if (params.skill) {
        filteredUsers = filteredUsers.filter(user => 
          user.skillsOffered.some(skill => 
            skill.toLowerCase().includes(params.skill.toLowerCase())
          ) ||
          user.skillsWanted.some(skill => 
            skill.toLowerCase().includes(params.skill.toLowerCase())
          )
        );
      }
      
      return { users: filteredUsers };
    }
  }

  // Skills
  async getAvailableSkills(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await this.makeRequest(`${this.baseURL}/skills/available?${queryString}`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock skills data
      await new Promise(resolve => setTimeout(resolve, 300));
      let filteredUsers = [...mockUsers];
      
      if (params.skill) {
        filteredUsers = filteredUsers.filter(user => 
          user.skillsOffered.some(skill => 
            skill.toLowerCase().includes(params.skill.toLowerCase())
          ) ||
          user.skillsWanted.some(skill => 
            skill.toLowerCase().includes(params.skill.toLowerCase())
          )
        );
      }
      
      return { users: filteredUsers };
    }
  }

  async getPopularSkills() {
    try {
      return await this.makeRequest(`${this.baseURL}/skills/popular`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock popular skills
      await new Promise(resolve => setTimeout(resolve, 200));
      return { 
        popularSkills: [
          { skill: 'JavaScript', count: 15 },
          { skill: 'React', count: 12 },
          { skill: 'Python', count: 10 },
          { skill: 'Design', count: 8 },
          { skill: 'Cooking', count: 6 }
        ] 
      };
    }
  }

  async getSkillCategories() {
    try {
      return await this.makeRequest(`${this.baseURL}/skills/categories`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock categories
      await new Promise(resolve => setTimeout(resolve, 200));
      return { categories: [
        { name: 'Technology', skills: ['JavaScript', 'Python', 'React', 'Node.js'] },
        { name: 'Design', skills: ['Photoshop', 'Figma', 'UI/UX Design'] },
        { name: 'Creative', skills: ['Photography', 'Cooking', 'Music'] },
        { name: 'Languages', skills: ['Spanish', 'French', 'English'] }
      ]};
    }
  }

  // Swap Requests
  async createSwapRequest(requestData) {
    try {
      return await this.makeRequest(`${this.baseURL}/swaps`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(requestData)
      });
    } catch (error) {
      // Mock swap request creation
      await new Promise(resolve => setTimeout(resolve, 500));
      const newRequest = {
        _id: Date.now().toString(),
        requester: { _id: 'current-user', name: 'You' },
        recipient: { _id: requestData.recipientId, name: 'Demo User' },
        requestedSkill: requestData.requestedSkill,
        offeredSkill: requestData.offeredSkill,
        status: 'pending',
        message: requestData.message,
        createdAt: new Date().toISOString()
      };
      return { swapRequest: newRequest };
    }
  }

  async getSwapRequests(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await this.makeRequest(`${this.baseURL}/swaps?${queryString}`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock swap requests
      await new Promise(resolve => setTimeout(resolve, 300));
      return { swapRequests: mockSwapRequests };
    }
  }

  async updateSwapRequest(requestId, updateData) {
    try {
      return await this.makeRequest(`${this.baseURL}/swaps/${requestId}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updateData)
      });
    } catch (error) {
      // Mock update
      await new Promise(resolve => setTimeout(resolve, 500));
      return { message: 'Request updated successfully' };
    }
  }

  async deleteSwapRequest(requestId) {
    try {
      return await this.makeRequest(`${this.baseURL}/swaps/${requestId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock delete
      await new Promise(resolve => setTimeout(resolve, 300));
      return { message: 'Request deleted successfully' };
    }
  }

  // Health check
  async healthCheck() {
    try {
      return await this.makeRequest(`${this.baseURL}/health`);
    } catch (error) {
      return { status: 'DEMO', message: 'Running in demo mode - backend not available' };
    }
  }
}

export default new ApiService(); 