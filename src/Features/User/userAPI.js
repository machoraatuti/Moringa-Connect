// userService.js
class UserService {
  constructor() {
    this.baseURL = '/api/users';
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Received non-JSON response from server');
    }

    try {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Server error occurred');
      }
      return data;
    } catch (error) {
      throw new Error('Failed to parse server response: ' + error.message);
    }
  }

  async fetchUsers() {
    try {
      const response = await fetch(this.baseURL, {
        headers: this.defaultHeaders,
        credentials: 'include'
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error('Failed to fetch users: ' + error.message);
    }
  }

  async updateUserStatus(userId, isOnline) {
    try {
      const response = await fetch(`${this.baseURL}/${userId}/status`, {
        method: 'PUT',
        headers: this.defaultHeaders,
        credentials: 'include',
        body: JSON.stringify({ isOnline })
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error('Failed to update user status: ' + error.message);
    }
  }

  async addNewUser(userData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.defaultHeaders,
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error('Failed to add new user: ' + error.message);
    }
  }

  async deleteUser(userId) {
    try {
      const response = await fetch(`${this.baseURL}/${userId}`, {
        method: 'DELETE',
        headers: this.defaultHeaders,
        credentials: 'include'
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error('Failed to delete user: ' + error.message);
    }
  }

  async updateUserProfile(userId, profileData) {
    try {
      const response = await fetch(`${this.baseURL}/${userId}`, {
        method: 'PUT',
        headers: this.defaultHeaders,
        credentials: 'include',
        body: JSON.stringify(profileData)
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error('Failed to update user profile: ' + error.message);
    }
  }
}

// Create and export a single instance of the service
export const userService = new UserService();