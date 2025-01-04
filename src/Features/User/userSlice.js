import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../User/userService'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.fetchUsers();
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.statusCode
      });
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async ({ userId, isOnline }, { rejectWithValue }) => {
    try {
      const data = await userService.updateUserStatus(userId, isOnline);
      return { userId, isOnline, ...data };
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.statusCode
      });
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      return await userService.addNewUser(userData);
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.statusCode
      });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await userService.deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        statusCode: error.statusCode
      });
    }
  }
);

const initialState = {
  users: [],
  onlineUsers: {},
  loading: false,
  error: null,
  lastUpdated: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLocalUserStatus: (state, action) => {
      const { userId, isOnline } = action.payload;
      if (state.onlineUsers[userId] !== isOnline) {
        state.onlineUsers[userId] = isOnline;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch users';
      })
      // Update User Status
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const { userId, isOnline } = action.payload;
        state.onlineUsers[userId] = isOnline;
        const userIndex = state.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            lastSeen: new Date().toISOString()
          };
        }
      })
      // Add New User
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        delete state.onlineUsers[action.payload];
        state.lastUpdated = new Date().toISOString();
      });
  }
});

export const { clearError, setLocalUserStatus } = userSlice.actions;

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectOnlineUsers = (state) => state.users.onlineUsers;
export const selectUserById = (state, userId) => 
  state.users.users.find(user => user.id === userId);
export const selectIsUserOnline = (state, userId) => 
  state.users.onlineUsers[userId] || false;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

export default userSlice.reducer;