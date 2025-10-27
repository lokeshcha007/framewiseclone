import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunks
export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/profile`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/auth/profile`, profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/auth/change-password`, passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

export const uploadResume = createAsyncThunk(
  'user/uploadResume',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload resume');
    }
  }
);

export const getInterviews = createAsyncThunk(
  'user/getInterviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/interviews`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get interviews');
    }
  }
);

export const getAnalytics = createAsyncThunk(
  'user/getAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/analytics`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get analytics');
    }
  }
);

// Initial state
const initialState = {
  profile: null,
  interviews: [],
  analytics: null,
  resume: null,
  loading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserData: (state) => {
      state.profile = null;
      state.interviews = [];
      state.analytics = null;
      state.resume = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Upload Resume
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resume = action.payload.resume;
        state.error = null;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Interviews
      .addCase(getInterviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInterviews.fulfilled, (state, action) => {
        state.loading = false;
        state.interviews = action.payload.interviews;
        state.error = null;
      })
      .addCase(getInterviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Analytics
      .addCase(getAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload.analytics;
        state.error = null;
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError, clearUserData } = userSlice.actions;
export default userSlice.reducer;
