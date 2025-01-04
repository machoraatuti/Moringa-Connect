import { mockUsers } from '../User/mockData';

class UserService {
  constructor() {
    this.users = [...mockUsers];
    this.onlineUsers = {};
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchUsers() {
    // Simulate network delay
    await this.delay(500);
    return [...this.users];
  }

  async updateUserStatus(userId, isOnline) {
    await this.delay(300);
    this.onlineUsers[userId] = isOnline;
    return {
      userId,
      isOnline,
      lastUpdated: new Date().toISOString()
    };
  }

  async addNewUser(userData) {
    await this.delay(500);
    const newUser = {
      id: this.users.length + 1,
      ...userData,
      contributions: {
        mentoring: 0,
        talks: 0,
        blogPosts: 0
      },
      status: 'New',
      avatar: 'https://via.placeholder.com/150'
    };
    this.users.push(newUser);
    return newUser;
  }

  async deleteUser(userId) {
    await this.delay(300);
    this.users = this.users.filter(user => user.id !== userId);
    delete this.onlineUsers[userId];
    return { success: true };
  }

  async updateUserProfile(userId, profileData) {
    await this.delay(400);
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...profileData,
      id: userId // Ensure ID doesn't change
    };
    return this.users[userIndex];
  }
}

export const userService = new UserService();