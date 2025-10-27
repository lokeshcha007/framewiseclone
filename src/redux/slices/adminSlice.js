import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunks
export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get users');
    }
  }
);

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

export const getAllManagers = createAsyncThunk(
  'admin/getAllManagers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/managers`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get managers');
    }
  }
);

export const createManager = createAsyncThunk(
  'admin/createManager',
  async (managerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/managers`, managerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create manager');
    }
  }
);

export const updateManager = createAsyncThunk(
  'admin/updateManager',
  async ({ managerId, managerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/admin/managers/${managerId}`, managerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update manager');
    }
  }
);

export const deleteManager = createAsyncThunk(
  'admin/deleteManager',
  async (managerId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/admin/managers/${managerId}`);
      return managerId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete manager');
    }
  }
);

export const getDashboardStats = createAsyncThunk(
  'admin/getDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/stats/dashboard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get dashboard stats');
    }
  }
);

export const getSystemAnalytics = createAsyncThunk(
  'admin/getSystemAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/analytics`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get system analytics');
    }
  }
);

// Initial state
const initialState = {
  users: [],
  managers: [],
  dashboardStats: null,
  systemAnalytics: null,
  loading: false,
  error: null,
  pagination: {
    current: 1,
    pages: 1,
    total: 0,
    limit: 10,
  },
};

// Admin slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
    clearAdminData: (state) => {
      state.users = [];
      state.managers = [];
      state.dashboardStats = null;
      state.systemAnalytics = null;
      state.error = null;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users;
        state.pagination = action.payload.data.pagination;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload.user);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.id === action.payload.user.id);
        if (index !== -1) {
          state.users[index] = action.payload.user;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get All Managers
      .addCase(getAllManagers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.managers = action.payload.managers;
        state.error = null;
      })
      .addCase(getAllManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Manager
      .addCase(createManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createManager.fulfilled, (state, action) => {
        state.loading = false;
        state.managers.unshift(action.payload.manager);
        state.error = null;
      })
      .addCase(createManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Manager
      .addCase(updateManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateManager.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.managers.findIndex(manager => manager.id === action.payload.manager.id);
        if (index !== -1) {
          state.managers[index] = action.payload.manager;
        }
        state.error = null;
      })
      .addCase(updateManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Manager
      .addCase(deleteManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        state.loading = false;
        state.managers = state.managers.filter(manager => manager.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Dashboard Stats
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload.stats;
        state.error = null;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get System Analytics
      .addCase(getSystemAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSystemAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.systemAnalytics = action.payload.analytics;
        state.error = null;
      })
      .addCase(getSystemAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminError, clearAdminData, setPagination } = adminSlice.actions;
export default adminSlice.reducer;
