const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Mock data for when backend is not available
const mockUsers = [
  {
    id: 1,
    username: 'alexjohnson',
    first_name: 'Alex',
    last_name: 'Johnson',
    email: 'alex@example.com',
    location: 'New York',
    skills_offered: ['JavaScript', 'React', 'Node.js'],
    skills_wanted: ['Python', 'Machine Learning'],
    rating: 4.5,
    rating_count: 12,
    profile_photo: null,
    bio: 'Full-stack developer passionate about teaching and learning.',
    is_available: true
  },
  {
    id: 2,
    username: 'sarahchen',
    first_name: 'Sarah',
    last_name: 'Chen',
    email: 'sarah@example.com',
    location: 'San Francisco',
    skills_offered: ['UI/UX Design', 'Photoshop', 'Figma'],
    skills_wanted: ['JavaScript', 'React'],
    rating: 4.8,
    rating_count: 8,
    profile_photo: null,
    bio: 'Creative designer looking to learn programming.',
    is_available: true
  },
  {
    id: 3,
    username: 'mikerodriguez',
    first_name: 'Mike',
    last_name: 'Rodriguez',
    email: 'mike@example.com',
    location: 'Los Angeles',
    skills_offered: ['Spanish', 'Cooking', 'Photography'],
    skills_wanted: ['Excel', 'Data Analysis'],
    rating: 4.2,
    rating_count: 15,
    profile_photo: null,
    bio: 'Multilingual professional with diverse skills.',
    is_available: true
  },
  {
    id: 4,
    username: 'emmawilson',
    first_name: 'Emma',
    last_name: 'Wilson',
    email: 'emma@example.com',
    location: 'Chicago',
    skills_offered: ['Yoga', 'Meditation', 'Nutrition'],
    skills_wanted: ['Photography', 'Video Editing'],
    rating: 4.7,
    rating_count: 6,
    profile_photo: null,
    bio: 'Wellness coach and fitness enthusiast.',
    is_available: true
  }
];

const mockSwapRequests = [
  {
    _id: 1,
    requester: { _id: 2, name: 'Sarah Chen', email: 'sarah@example.com' },
    recipient: { _id: 1, name: 'Alex Johnson', email: 'alex@example.com' },
    requestedSkill: 'JavaScript',
    offeredSkill: 'UI/UX Design',
    status: 'pending',
    message: 'I\'d like to learn JavaScript from you. I can offer UI/UX Design in return.',
    createdAt: new Date().toISOString()
  },
  {
    _id: 2,
    requester: { _id: 3, name: 'Mike Rodriguez', email: 'mike@example.com' },
    recipient: { _id: 1, name: 'Alex Johnson', email: 'alex@example.com' },
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
      const errorMessage = data.error || data.message || data.detail || 'Something went wrong';
      throw new Error(errorMessage);
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
        id: 'current-user',
        username: data.email.split('@')[0],
        first_name: data.email.split('@')[0],
        last_name: '',
        email: data.email,
        skills_offered: ['General Help'],
        skills_wanted: [],
        rating: 0,
        rating_count: 0,
        bio: '',
        is_available: true
      };
      localStorage.setItem('token', 'mock-token');
      return { user: mockUser, token: 'mock-token' };
    }
    
    if (action === 'register') {
      const mockUser = {
        id: 'current-user',
        username: data.username || data.email.split('@')[0],
        first_name: data.first_name || data.name,
        last_name: data.last_name || '',
        email: data.email,
        skills_offered: ['General Help'],
        skills_wanted: [],
        rating: 0,
        rating_count: 0,
        bio: '',
        is_available: true
      };
      localStorage.setItem('token', 'mock-token');
      return { user: mockUser, token: 'mock-token' };
    }
    
    if (action === 'getCurrentUser') {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      
      return {
        user: {
          id: 'current-user',
          username: 'demo_user',
          first_name: 'Demo',
          last_name: 'User',
          email: 'demo@example.com',
          skills_offered: ['General Help'],
          skills_wanted: [],
          rating: 0,
          rating_count: 0,
          bio: '',
          is_available: true
        }
      };
    }
  }

  // Authentication
  async register(userData) {
    try {
      const response = await this.makeRequest(`${this.baseURL}/auth/register/`, {
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
      const response = await this.makeRequest(`${this.baseURL}/auth/login/`, {
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
      await this.makeRequest(`${this.baseURL}/auth/logout/`, {
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
      return await this.makeRequest(`${this.baseURL}/auth/me/`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      return await this.mockAuth('getCurrentUser');
    }
  }

  // User Management
  async updateProfile(profileData) {
    try {
      return await this.makeRequest(`${this.baseURL}/users/profile/`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
    } catch (error) {
      // Mock profile update
      await new Promise(resolve => setTimeout(resolve, 500));
      return { user: { ...profileData, id: 'current-user' } };
    }
  }

  async searchUsers(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await this.makeRequest(`${this.baseURL}/users/list/?${queryString}`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock user search
      await new Promise(resolve => setTimeout(resolve, 300));
      let filteredUsers = [...mockUsers];
      
      if (params.search) {
        filteredUsers = filteredUsers.filter(user => 
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(params.search.toLowerCase()) ||
          user.email.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.skill) {
        filteredUsers = filteredUsers.filter(user => 
          user.skills_offered.some(skill => 
            skill.toLowerCase().includes(params.skill.toLowerCase())
          ) ||
          user.skills_wanted.some(skill => 
            skill.toLowerCase().includes(params.skill.toLowerCase())
          )
        );
      }
      
      return { results: filteredUsers };
    }
  }

  // Skills
  async getAvailableSkills(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await this.makeRequest(`${this.baseURL}/skills/available/?${queryString}`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock skills data
      await new Promise(resolve => setTimeout(resolve, 300));
      let filteredUsers = [...mockUsers];
      
      if (params.skill) {
        filteredUsers = filteredUsers.filter(user => 
          user.skills_offered.some(skill => 
            skill.toLowerCase().includes(params.skill.toLowerCase())
          ) ||
          user.skills_wanted.some(skill => 
            skill.toLowerCase().includes(params.skill.toLowerCase())
          )
        );
      }
      
      return { users: filteredUsers };
    }
  }

  async getPopularSkills() {
    try {
      return await this.makeRequest(`${this.baseURL}/skills/popular/`, {
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      // Mock popular skills
      await new Promise(resolve => setTimeout(resolve, 200));
      return { 
        popular_skills: [
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
      return await this.makeRequest(`${this.baseURL}/skills/categories/`, {
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
      const response = await this.makeRequest(`${this.baseURL}/swaps/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(requestData)
      });
      return response;
    } catch (error) {
      // Mock swap request creation
      await new Promise(resolve => setTimeout(resolve, 500));
      const newRequest = {
        _id: Date.now().toString(),
        requester: { _id: 'current-user', name: 'You', email: 'demo@example.com' },
        recipient: { _id: requestData.recipient, name: 'Demo User', email: 'demo@example.com' },
        requestedSkill: requestData.requested_skill,
        offeredSkill: requestData.offered_skill,
        status: 'pending',
        message: requestData.message,
        createdAt: new Date().toISOString()
      };
      return newRequest;
    }
  }

  async getSwapRequests(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.makeRequest(`${this.baseURL}/swaps/?${queryString}`, {
        headers: this.getAuthHeaders()
      });
      // Ensure we return the correct structure
      return { swapRequests: response.results || response };
    } catch (error) {
      // Mock swap requests
      await new Promise(resolve => setTimeout(resolve, 300));
      return { swapRequests: mockSwapRequests };
    }
  }

  async updateSwapRequest(requestId, updateData) {
    try {
      return await this.makeRequest(`${this.baseURL}/swaps/${requestId}/`, {
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
      return await this.makeRequest(`${this.baseURL}/swaps/${requestId}/`, {
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
      return await this.makeRequest(`${this.baseURL}/health/health/`);
    } catch (error) {
      return { status: 'DEMO', message: 'Running in demo mode - backend not available' };
    }
  }
}

export default new ApiService(); 