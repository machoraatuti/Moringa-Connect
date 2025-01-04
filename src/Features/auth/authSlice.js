import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockLogin = async (credentials) => {
  if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
    return {
      user: {
        id: 1,
        email: credentials.email,
        role: 'admin',
        name: 'Admin User',
        isAdmin: true
      },
      token: 'mock-admin-token'
    };
  }
  
  if (credentials.email && credentials.password) {
    return {
      user: {
        id: 2,
        email: credentials.email,
        role: 'user',
        name: 'Regular User',
        isAdmin: false
      },
      token: 'mock-user-token'
    };
  }
  throw new Error('Invalid credentials');
};

const mockRegister = async (userData) => {
  if (userData.email && userData.password) {
    return {
      user: {
        id: Math.random(),
        email: userData.email,
        role: 'user',
        name: userData.fullName,
        isAdmin: false
      },
      token: 'mock-token'
    };
  }
  throw new Error('Invalid user data');
};

const mockLogout = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await mockLogin(credentials);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await mockRegister(userData);
    return response;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await mockLogout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isAdmin: localStorage.getItem('userRole') === 'admin',
  loading: false,
  error: null,
  logoutSuccess: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetLogoutStatus: (state) => {
      state.logoutSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role === 'admin';
        state.logoutSuccess = false;
        
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('userRole', action.payload.user.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = false;
        state.logoutSuccess = false;
        
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('userRole', action.payload.user.role);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Clear all auth-related data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        
        // Reset all auth state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.loading = false;
        state.error = null;
        state.logoutSuccess = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, resetLogoutStatus } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;